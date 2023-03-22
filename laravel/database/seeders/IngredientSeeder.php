<?php

namespace Database\Seeders;

use App\Models\Ingredient;
use Illuminate\Database\Seeder;

class IngredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ingredients = [
            ['name' => 'Vodka', 'category' => 'Spirit'], // Spirits
            ['name' => 'Vanilla vodka', 'category' => 'Spirit'],
            ['name' => 'Light rum', 'category' => 'Spirit'],
            ['name' => 'Dark rum', 'category' => 'Spirit'],
            ['name' => 'Spiced rum', 'category' => 'Spirit'],
            ['name' => 'Gold rum', 'category' => 'Spirit'],
            ['name' => 'Overproof rum', 'category' => 'Spirit'],
            ['name' => 'Tequila', 'category' => 'Spirit'],
            ['name' => 'Gold tequila', 'category' => 'Spirit'],
            ['name' => 'Mezcal', 'category' => 'Spirit'],
            ['name' => 'Bourbon whiskey', 'category' => 'Spirit'],
            ['name' => 'Scotch whiskey', 'category' => 'Spirit'],
            ['name' => 'Rye whiskey', 'category' => 'Spirit'],
            ['name' => 'Gin', 'category' => 'Spirit'],
            ['name' => 'Cognac', 'category' => 'Spirit'],
            ['name' => 'Absinthe', 'category' => 'Spirit'],
            ['name' => 'Aromatic bitters', 'category' => 'Liqueur'], // Liqueurs
            ['name' => 'Maraschino liqueur', 'category' => 'Liqueur'],
            ['name' => 'Orange bitters', 'category' => 'Liqueur'],
            ['name' => 'Triple Sec', 'category' => 'Liqueur'],
            ['name' => 'Coffee Liqueur', 'category' => 'Liqueur'],
            ['name' => 'Amaretto', 'category' => 'Liqueur'],
            ['name' => 'Cognac orange liqueur', 'category' => 'Liqueur'],
            ['name' => 'Campari', 'category' => 'Liqueur'],
            ['name' => 'Elderflower Liqueur', 'category' => 'Liqueur'],
            ['name' => 'Apricot liqueur', 'category' => 'Liqueur'],
            ['name' => 'Orange curuçao', 'category' => 'Liqueur'],
            ['name' => 'Blue curuçao', 'category' => 'Liqueur'],
            ['name' => 'Cherry liqueur', 'category' => 'Liqueur'],
            ['name' => 'Chambord', 'category' => 'Liqueur'],
            ['name' => 'Irish cream liqueur', 'category' => 'Liqueur'],
            ['name' => 'Peach schnapps', 'category' => 'Liqueur'],
            ['name' => 'Red Wine', 'category' => 'Alcohol'], // Other alcohols
            ['name' => 'Dry Vermouth', 'category' => 'Alcohol'],
            ['name' => 'Sweet Vermouth', 'category' => 'Alcohol'],
            ['name' => 'Champagne', 'category' => 'Alcohol'],
            ['name' => 'Grenadine Syrup', 'category' => 'Mixer'], // Mixers
            ['name' => 'Sugar Syrup', 'category' => 'Mixer'],
            ['name' => 'Agave Syrup', 'category' => 'Mixer'],
            ['name' => 'Lime', 'category' => 'Mixer'],
            ['name' => 'Lemon', 'category' => 'Mixer'],
            ['name' => 'Apple juice', 'category' => 'Mixer'],
            ['name' => 'Orange juice', 'category' => 'Mixer'],
            ['name' => 'Pineapple juice', 'category' => 'Mixer'],
            ['name' => 'Grapefruit juice', 'category' => 'Mixer'],
            ['name' => 'Cranberry juice', 'category' => 'Mixer'],
            ['name' => 'Lemonade', 'category' => 'Mixer'],
            ['name' => 'Ginger beer', 'category' => 'Mixer'],
            ['name' => 'Ginger ale', 'category' => 'Mixer'],
            ['name' => 'Coke', 'category' => 'Mixer'],
            ['name' => 'Soda Water', 'category' => 'Mixer'],
            ['name' => 'Tonic Water', 'category' => 'Mixer'],
            ['name' => 'Mint leaves', 'category' => 'Mixer'],
            ['name' => 'Egg White', 'category' => 'Mixer'],
            ['name' => 'Single Cream', 'category' => 'Mixer'],
            ['name' => 'Espresso coffee', 'category' => 'Mixer'],
        ];

        foreach ($ingredients as $ingredient) {
            Ingredient::factory()->create([
                'name' => $ingredient['name'],
                'category' => $ingredient['category']
            ]);
        }
    }
}
