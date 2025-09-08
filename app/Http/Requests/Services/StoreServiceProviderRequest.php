<?php

namespace App\Http\Requests\Services;

use Illuminate\Foundation\Http\FormRequest;

class StoreServiceProviderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $billingValues = collect(config('billing_units'))
            ->pluck('value')
            ->toArray();

        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],

            'rates' => ['required', 'array'],
            'rates.*.amount' => ['required', 'numeric', 'min:0', 'max:1000000'],
            'rates.*.billing_unit' => ['required', 'in:' . implode(',', $billingValues)],
            'rates.*.custom_label' => ['required_if:rates.*.billing_unit,custom', 'max:255'],

            'options' => ['nullable', 'array'],
            'options.*.name' => ['required_with:options.*', 'string', 'max:255'],
            'options.*.description' => ['required_with:options.*', 'string', 'max:1000'],
            'options.*.rate.amount' => ['required_with:options.*', 'numeric', 'min:0', 'max:1000000'],
            'options.*.rate.billing_unit' => ['required_with:options.*', 'in:' . implode(',', $billingValues)],
            'options.*.rate.custom_label' => ['required_if:options.*.rate.billing_unit,custom', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Le nom du service est obligatoire.',
            'name.string' => 'Le nom du service doit être une chaîne de caractères.',
            'name.max' => 'Le nom du service ne peut pas dépasser 255 caractères.',
            'description.string' => 'La description doit être une chaîne de caractères.',
            'description.max' => 'La description ne peut pas dépasser 1000 caractères.',

            'rates.required' => 'Vous devez ajouter au moins un tarif pour le service.',
            'rates.array' => 'Les tarifs doivent être fournis sous forme de tableau.',
            'rates.*.amount.required' => 'Le montant du tarif est obligatoire.',
            'rates.*.amount.numeric' => 'Le montant doit être un nombre.',
            'rates.*.amount.min' => 'Le montant doit être supérieur ou égal à 0.',
            'rates.*.amount.max' => 'Le montant ne peut pas dépasser 1 000 000.',
            'rates.*.billing_unit.required' => 'L’unité de facturation est obligatoire.',
            'rates.*.billing_unit.in' => 'L’unité de facturation sélectionnée est invalide.',
            'rates.*.custom_label.required_if' => 'Le label personnalisé est obligatoire pour une unité personnalisée.',
            'rates.*.custom_label.max' => 'Le label personnalisé ne peut pas dépasser 255 caractères.',

            'options.array' => 'Les options doivent être fournies sous forme de tableau.',
            'options.*.name.required_with' => 'Le nom de l’option est obligatoire si des options sont ajoutées.',
            'options.*.name.string' => 'Le nom de l’option doit être une chaîne de caractères.',
            'options.*.name.max' => 'Le nom de l’option ne peut pas dépasser 255 caractères.',
            'options.*.description.required_with' => 'La description de l’option est obligatoire si des options sont ajoutées.',
            'options.*.description.string' => 'La description de l’option doit être une chaîne de caractères.',
            'options.*.description.max' => 'La description de l’option ne peut pas dépasser 1000 caractères.',
            'options.*.rate.amount.required_with' => 'Le montant de l’option est obligatoire.',
            'options.*.rate.amount.numeric' => 'Le montant de l’option doit être un nombre.',
            'options.*.rate.amount.min' => 'Le montant de l’option doit être supérieur ou égal à 0.',
            'options.*.rate.amount.max' => 'Le montant de l’option ne peut pas dépasser 1 000 000.',
            'options.*.rate.billing_unit.required_with' => 'L’unité de facturation de l’option est obligatoire.',
            'options.*.rate.billing_unit.in' => 'L’unité de facturation de l’option sélectionnée est invalide.',
            'options.*.rate.custom_label.required_if' => 'Le label personnalisé de l’option est obligatoire pour une unité personnalisée.',
            'options.*.rate.custom_label.max' => 'Le label personnalisé de l’option ne peut pas dépasser 255 caractères.',
        ];
    }
}
