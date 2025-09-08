<?php

namespace App\Http\Controllers\Provider\Services;

use App\Http\Controllers\Controller;
use App\Http\Requests\Services\DeleteServiceProviderRequest;
use App\Http\Requests\Services\StoreServiceProviderRequest;
use App\Http\Requests\Services\UpdateServiceProviderRequest;
use App\Models\Providers\Services\OptionRate;
use App\Models\Providers\Services\Service;
use App\Models\Providers\Services\ServiceOption;
use App\Models\Providers\Services\ServiceRate;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

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
