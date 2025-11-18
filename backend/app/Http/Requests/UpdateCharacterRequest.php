<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCharacterRequest extends FormRequest
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
            'name'=>['sometimes', 'min:3', 'max:50'],
            'image'=>['sometimes','file'],
            'acquired'=>['sometimes', 'integer', 'between:0,1'],
            'description'=>['sometimes', 'string'],
            'powers'=>['sometimes', 'string'],
            'character_class_id'=>['sometimes'],
        ];
    }
}