<?php

namespace App\Http\Requests\Auth;

use App\Services\RegisterWizardService;
use Illuminate\Foundation\Http\FormRequest;

class RegisterWizardCredentialsStepRequest extends FormRequest
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
        return (new RegisterWizardService())->getCredentialsRequestRules($this->role);
    }

    public function messages(): array
    {
        return (new RegisterWizardService())->getCredentialsMessages();
    }
}
