<?php

namespace App\Services;

class RegisterWizardService
{
    public function getCredentialsRequestRules(string $role): array
    {
        $allowedRoles = array_column(config('roles'), 'value');

        $rules = [
            'role' => ['required', 'string', 'in:' . implode(',', $allowedRoles)],
            'phone_number' => ['required', 'string', 'regex:/^(?:\+32[\s\-\(\)\.]*([0-9][\s\-\(\)\.]*){8,9}|0[1-9][0-9]{7,8})$/'],
        ];

        if ($role === 'couple') {
            $rules['name'] = ['required', 'string', 'max:65'];
        }

        if ($role === 'provider') {
            $rules['company_name'] = ['required', 'string', 'max:100'];
        }

        return $rules;
    }

    public function getCredentialsMessages(): array
    {
        return [
            'role.required' => 'Le rôle est obligatoire.',
            'role.string'   => 'Le rôle doit être une chaîne de caractères.',
            'role.in'       => 'Le rôle sélectionné est invalide.',

            'phone_number.required' => 'Le numéro de téléphone est obligatoire.',
            'phone_number.string'   => 'Le numéro de téléphone doit être une chaîne de caractères.',
            'phone_number.regex'    => 'Le numéro doit être un numéro belge valide (ex: +32 471 23 45 67 ou 0471 23 45 67).',

            'name.required' => 'Le nom du couple est obligatoire.',
            'name.string'   => 'Le nom du couple doit être une chaîne de caractères.',
            'name.max'      => 'Le nom du couple ne peut pas dépasser 65 caractères.',

            'company_name.required' => 'Le nom de l’entreprise est obligatoire.',
            'company_name.string'   => 'Le nom de l’entreprise doit être une chaîne de caractères.',
            'company_name.max'      => 'Le nom de l’entreprise ne peut pas dépasser 100 caractères.',
        ];
    }
}
