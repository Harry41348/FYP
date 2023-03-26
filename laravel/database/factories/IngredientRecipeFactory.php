<?php

namespace Database\Factories;

use App\Models\Ingredient;
use App\Models\Recipe;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\IngredientRecipe>
 */
class IngredientRecipeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'measurement' => 'oz',
            'amount' => fake()->numberBetween(1, 5),
            'ingredient_id' => Ingredient::all()->random()->id,
            'recipe_id' => Recipe::all()->random()->id,
        ];
    }
}
