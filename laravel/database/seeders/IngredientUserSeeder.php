<?php

namespace Database\Seeders;

use App\Models\IngredientUser;
use Illuminate\Database\Seeder;

class IngredientUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ingredientUsers = [
            ['user_id' => 1, 'ingredient_id' => 1],
            ['user_id' => 1, 'ingredient_id' => 4],
            ['user_id' => 1, 'ingredient_id' => 9],
            ['user_id' => 1, 'ingredient_id' => 14],
        ];

        foreach ($ingredientUsers as $ingredientUser) {
            IngredientUser::factory()->create([
                'ingredient_id' => $ingredientUser['ingredient_id'],
                'user_id' => $ingredientUser['user_id'],
            ]);
        }
    }
}
