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
            ['id' => 1, 'name' => 'Vodka', 'category' => 'Spirit'],
            ['id' => 2, 'name' => 'Light Rum', 'category' => 'Spirit'],
            ['id' => 3, 'name' => 'Dark Rum', 'category' => 'Spirit'],
            ['id' => 4, 'name' => 'Rum', 'category' => 'Spirit'],
            ['id' => 5, 'name' => 'Tequila', 'category' => 'Spirit'],
            ['id' => 6, 'name' => 'Whiskey', 'category' => 'Spirit'],
            ['id' => 7, 'name' => 'Gin', 'category' => 'Spirit'],
            ['id' => 8, 'name' => 'Syrup', 'category' => 'Mixer'],
            ['id' => 9, 'name' => 'Lime', 'category' => 'Mixer'],
            ['id' => 10, 'name' => 'Lemon', 'category' => 'Mixer'],
            ['id' => 11, 'name' => 'Orange Juice', 'category' => 'Mixer'],
            ['id' => 12, 'name' => 'Pineapple Juice', 'category' => 'Mixer'],
            ['id' => 13, 'name' => 'Lemonade', 'category' => 'Mixer'],
            ['id' => 14, 'name' => 'Ginger Beer', 'category' => 'Mixer'],
            ['id' => 15, 'name' => 'Coke', 'category' => 'Mixer'],
            ['id' => 16, 'name' => 'Soda Water', 'category' => 'Mixer'],
        ];

        foreach ($ingredients as $ingredient) {
            Ingredient::factory()->create([
                'name' => $ingredient['name'],
                'category' => $ingredient['category']
            ]);
        }
    }
}
