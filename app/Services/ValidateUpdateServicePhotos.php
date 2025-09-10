<?php

namespace App\Services;


use App\Http\Requests\Services\UpdateServiceProviderRequest;
use App\Models\Providers\Services\Service;

class ValidateUpdateServicePhotos
{
    /**
     * Validate photos sended during the service provider update process.
     *
     * @param Service $service
     * @param UpdateServiceProviderRequest $request
     * @return array Errors
     */
    public static function check(Service $service, UpdateServiceProviderRequest $request): array
    {
        $errors = [];

        $photos = $request->input('photos', []);
        $uploadedFiles = $request->files->get('photos', []);

        if (sizeof($photos) <= 10) {
            foreach ($photos as $index => $photo) {
                $position = isset($photo['position']) ? max(0, (int)$photo['position']) : $index;

                if (isset($photo['id'])) {
                    $servicePhoto = $service->photos()->find($photo['id']);
                    if (!$servicePhoto) {
                        $errors["photos.$index"] = "Photo inexistante ou non associée au service.";
                    }
                }  elseif (isset($uploadedFiles[$index]['file'])) {
                    $uploadedFile = $uploadedFiles[$index]['file'];

                    if (!$uploadedFile || !$uploadedFile->isValid()) {
                        $errors["photos.$index"] = "Fichier invalide ou manquant.";
                        continue;
                    }

                    $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
                    if (!in_array($uploadedFile->getMimeType(), $allowedMimeTypes)) {
                        $errors["photos.$index"] = "Type de fichier non autorisé ({$uploadedFile->getMimeType()}).";
                    }

                    $maxSize = 2 * 1024 * 1024;
                    if ($uploadedFile->getSize() > $maxSize) {
                        $errors["photos.$index"] = "Fichier trop volumineux. 2Mo autorisés.";
                    }
                } elseif (isset($photo['url']) && str_starts_with($photo['url'], 'blob:')) {
                    continue;
                } else {
                    $errors["photos.$index"] = "Données invalides (ni id, ni fichier, ni blob).";
                }

                if ($position < 0) {
                    $errors["photos.$index"] = "Position invalide.";
                }
            }
        } else {
            $errors["photos"] = "Vous ne pouvez envoyer uniquement 10 photos.";
        }

        return $errors;
    }
}
