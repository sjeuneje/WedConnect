<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;

class UpdateActivitySettingsProviderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->role === 'provider';
    }

    public function rules(): array
    {
        return [
            'company_name'    => ['nullable', 'string', 'max:255'],
            'logo'            => ['nullable', 'file', 'max:2048'],
            'city'            => ['nullable', 'string', 'max:255'],
            'zipcode'         => ['nullable', 'string', 'max:20'],
            'description'     => ['nullable', 'string', 'max:5000'],
            'facebook_url'    => ['nullable', 'url', 'max:255'],
            'instagram_url'   => ['nullable', 'url', 'max:255'],
            'website_url'     => ['nullable', 'url', 'max:255'],
        ];
    }
}
