<?php

namespace App\Http\Requests\Auth;

use App\Services\RegisterWizardService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class RegisterNewUserRequest extends FormRequest
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
        $rules = (new RegisterWizardService())->getCredentialsRequestRules($this->role);
        $rules['email'] = ['required', 'email', 'unique:users'];
        $rules['password'] = ['required', 'confirmed', Rules\Password::defaults()];

        return $rules;
    }

    public function messages(): array
    {
        $messages = (new RegisterWizardService())->getCredentialsMessages();
        $messages['email.required'] = 'L’adresse e-mail est obligatoire.';
        $messages['email.email']    = 'Veuillez fournir une adresse e-mail valide.';
        $messages['email.unique']   = 'Cette adresse e-mail est déjà utilisée.';
        $messages['password.required']  = 'Le mot de passe est obligatoire.';
        $messages['password.confirmed'] = 'Les mots de passe ne correspondent pas.';


        return $messages;
    }
}
