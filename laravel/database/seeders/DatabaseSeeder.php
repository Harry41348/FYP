<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\IngredientSeeder;
use Database\Seeders\IngredientUserSeeder;
use Database\Seeders\RecipeSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            IngredientSeeder::class,
            IngredientUserSeeder::class,
            RecipeSeeder::class,
            IngredientRecipeSeeder::class,
        ]);
    }
}
