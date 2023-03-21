<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class Category implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $categories = ['Spirit', 'Liqueur', 'Alcohol', 'Mixer'];

        if (in_array($value, $categories, true)) {
            $fail('The :attribute must be uppercase.');
        }
    }
}
