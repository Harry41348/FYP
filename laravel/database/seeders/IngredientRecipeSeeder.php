<?php

namespace Database\Seeders;

use App\Models\IngredientRecipe;
use Illuminate\Database\Seeder;

class IngredientRecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ingredientRecipes = [
            ['recipe_id' => 1, 'ingredient_id' => 3, 'amount' => 2, 'measurement' => 'oz'],
            ['recipe_id' => 1, 'ingredient_id' => 57, 'amount' => 1.5, 'measurement' => 'oz'],
            ['recipe_id' => 1, 'ingredient_id' => 44, 'amount' => 1.5, 'measurement' => 'oz'],
            ['recipe_id' => 1, 'ingredient_id' => 40, 'amount' => 0.5, 'measurement' => 'oz'],
            ['recipe_id' => 2, 'ingredient_id' => 3, 'amount' => 1.5, 'measurement' => 'oz'],
            ['recipe_id' => 2, 'ingredient_id' => 38, 'amount' => 1, 'measurement' => 'oz'],
            ['recipe_id' => 2, 'ingredient_id' => 40, 'amount' => 0.75, 'measurement' => 'oz'],
            ['recipe_id' => 2, 'ingredient_id' => 58, 'amount' => 20, 'measurement' => 'g'],
            ['recipe_id' => 3, 'ingredient_id' => 59, 'amount' => 2, 'measurement' => 'oz'],
            ['recipe_id' => 3, 'ingredient_id' => 38, 'amount' => 1, 'measurement' => 'oz'],
            ['recipe_id' => 3, 'ingredient_id' => 40, 'amount' => 0.5, 'measurement' => 'oz'],
            ['recipe_id' => 3, 'ingredient_id' => 47, 'amount' => 1, 'measurement' => 'oz'],
        ];

        foreach ($ingredientRecipes as $ingredientRecipe) {
            IngredientRecipe::factory()->create([
                'recipe_id' => $ingredientRecipe['recipe_id'],
                'ingredient_id' => $ingredientRecipe['ingredient_id'],
                'amount' => $ingredientRecipe['amount'],
                'measurement' => $ingredientRecipe['measurement']
            ]);
        }
    }
}
