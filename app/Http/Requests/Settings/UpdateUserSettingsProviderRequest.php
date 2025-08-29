<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;

class UpdateUserSettingsProviderRequest extends FormRequest
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
        return [
            'phone_number' => [
                'nullable',
                'string',
                'regex:/^(?:\+32[\s\-\(\)\.]*([0-9][\s\-\(\)\.]*){8,9}|0[1-9][0-9]{7,8})$/'
            ],
            'password' => ['nullable', 'string'],
            'new_password' => [
                'nullable',
                Rule::requiredIf(fn () => filled($this->password)),
                'confirmed',
                Rules\Password::defaults(),
            ],
        ];
    }
}
