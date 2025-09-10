<?php

namespace App\Http\Controllers\Provider\Services;

use App\Http\Controllers\Controller;
use App\Http\Requests\Services\DeleteServiceProviderRequest;
use App\Http\Requests\Services\StoreServiceProviderRequest;
use App\Http\Requests\Services\UpdateServiceProviderRequest;
use App\Models\Providers\Services\OptionRate;
use App\Models\Providers\Services\Service;
use App\Models\Providers\Services\ServiceOption;
use App\Models\Providers\Services\ServicePhoto;
use App\Models\Providers\Services\ServiceRate;
use App\Models\User;
use App\Services\ValidateUpdateServicePhotos;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ServicesProviderController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('dashboard/provider/services', [
            'services' => Service::getProviderServices($user->provider->id),
            'user' => User::with('provider')->findOrFail($user->id),
            'currentRoute' => request()->route()->getName(),
            'billingUnits' => config('billing_units')
        ]);
    }

    public function store(StoreServiceProviderRequest $request)
    {
        $provider = Auth::user()->provider;
        $data = $request->validated();

        $service = Service::query()
            ->create([
                'provider_id' => $provider->id,
                'uuid' => Str::uuid(),
                'name' => $data['name'],
                'description' => $data['description']
            ]);

        foreach ($data['rates'] as $rate) {
            ServiceRate::query()
                ->create([
                    'service_id' => $service->id,
                    'amount' => $rate['amount'],
                    'billing_unit' => $rate['billing_unit'],
                    'custom_label' => $rate['custom_label']
                ]);
        }

        if (!empty($data['options'])) {
            foreach ($data['options'] as $option) {
                $serviceOption = ServiceOption::query()
                    ->create([
                        'service_id' => $service->id,
                        'name' => $option['name'],
                        'description' => $option['description']
                    ]);

                $rate = $option['rate'];
                if (!empty($rate)) {
                    OptionRate::query()
                        ->create([
                            'option_id' => $serviceOption->id,
                            'amount' => $rate['amount'],
                            'billing_unit' => $rate['billing_unit'],
                            'custom_label' => $rate['custom_label']
                        ]);
                }
            }
        }

        if (!empty($data['photos'])) {
            foreach ($data['photos'] as $index => $photoFile) {
                try {
                    $path = $photoFile->store('service_photos', 'public');
                    if ($path) {
                        ServicePhoto::query()->create([
                            'service_id' => $service->id,
                            'path' => $path,
                            'order' => $index + 1,
                        ]);
                    }
                } catch (\Throwable $e) {
                    Log::error("Échec du stockage de la photo #$index pour le service {$service->id}: ".$e->getMessage());
                }
            }
        }

        return redirect()->route('dashboard.provider.services')
            ->with('success', 'Votre service a bien été crée.');
    }

    public function update(UpdateServiceProviderRequest $request, Service $service)
    {
        $provider = Auth::user()->provider;

        if ($service->provider_id !== $provider->id) {
            abort(403, 'Unauthorized action.');
        }

        $data = $request->validated();

        $errors = ValidateUpdateServicePhotos::check($service, $request);

        if (!empty($errors)) {
            return redirect()->back()->withInput()->withErrors($errors);
        }

        $data['photos'] = $request->photos;
        $existingPhotoIds = collect($data['photos'] ?? [])
            ->filter(fn($p) => isset($p['id']))
            ->pluck('id')
            ->toArray();

        $service->photos()
            ->whereNotIn('id', $existingPhotoIds)
            ->get()
            ->each(function ($photo) {
                Storage::disk('public')->delete($photo->path);
                $photo->delete();
            });

        foreach ($data['photos'] ?? [] as $index => $photo) {
            $position = isset($photo['position']) ? max(0, (int)$photo['position']) : $index;

            if (isset($photo['file'])) {
                $uploadedFile = $request->file("photos.$index.file");

                $path = $uploadedFile->store('service_photos', 'public');

                $service->photos()->create([
                    'path' => $path,
                    'position' => $position,
                ]);
            } elseif (isset($photo['id'])) {
                $servicePhoto = $service->photos()->find($photo['id']);
                $servicePhoto?->update(['position' => $position]);
            }
        }

        $service->update([
            'name' => $data['name'],
            'description' => $data['description'],
        ]);

        $service->rates()->delete();
        foreach ($data['rates'] as $rate) {
            $service->rates()->create([
                'amount' => $rate['amount'],
                'billing_unit' => $rate['billing_unit'],
                'custom_label' => $rate['custom_label'],
            ]);
        }

        $service->options()->each(function ($option) {
            $option->rate()->delete();
            $option->delete();
        });

        foreach ($data['options'] ?? [] as $optionData) {
            $serviceOption = $service->options()->create([
                'name' => $optionData['name'],
                'description' => $optionData['description'],
            ]);

            if (!empty($optionData['rate'])) {
                $serviceOption->rate()->create([
                    'amount' => $optionData['rate']['amount'],
                    'billing_unit' => $optionData['rate']['billing_unit'],
                    'custom_label' => $optionData['rate']['custom_label'],
                ]);
            }
        }

        return redirect()
            ->route('dashboard.provider.services')
            ->with('success', 'Votre service a bien été mis à jour.');
    }

    public function delete(DeleteServiceProviderRequest $request)
    {
        $provider = Auth::user()->provider;

        if ($provider->id === $request->provider_id) {
            try {
                Service::query()
                    ->firstWhere('id', $request->service_id)
                    ->deleteOrFail();

                return redirect()->route('dashboard.provider.services')
                    ->with('success', 'Votre service a bien été supprimé.');
            } catch (\Throwable $e) {
                abort($e->getCode(), $e->getMessage());
            }
        }

        return redirect()->route('dashboard.provider.services')
            ->with('errors', [
                'message' => 'Vous ne pouvez pas supprimer un service qui ne vous appartient pas.'
            ]);
    }
}
