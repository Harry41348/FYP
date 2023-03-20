<?php

namespace Database\Seeders;

use App\Models\Ingredient;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IngredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ingredients = [
            ['name' => 'Vodka', 'category' => 'Spirit'],
            ['name' => 'Light Rum', 'category' => 'Spirit'],
            ['name' => 'Dark Rum', 'category' => 'Spirit'],
            ['name' => 'Spiced Rum', 'category' => 'Spirit'],
            ['name' => 'Tequila', 'category' => 'Spirit'],
            ['name' => 'Whiskey', 'category' => 'Spirit'],
            ['name' => 'Gin', 'category' => 'Spirit'],
            ['name' => 'Syrup', 'category' => 'Mixer'],
            ['name' => 'Lime', 'category' => 'Mixer'],
            ['name' => 'Lemon', 'category' => 'Mixer'],
            ['name' => 'Orange Juice', 'category' => 'Mixer'],
            ['name' => 'Pineapple Juice', 'category' => 'Mixer'],
            ['name' => 'Lemonade', 'category' => 'Mixer'],
            ['name' => 'Ginger Beer', 'category' => 'Mixer'],
            ['name' => 'Coke', 'category' => 'Mixer'],
            ['name' => 'Soda Water', 'category' => 'Mixer'],
        ];

        foreach ($ingredients as $ingredient) {
            Ingredient::factory()->create([
                'name' => $ingredient['name'],
                'category' => $ingredient['category']
            ]);
        }
    }
}
