<?php

namespace Database\Seeders;

use App\Models\Recipe;
use Illuminate\Database\Seeder;

class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Recipe::factory()->create([
            'name' => 'Piña Colada',
            'instructions' => 'Blend: Place the white rum, coconut cream, pineapple juice and chunks, and ice in a blender. Process until totally blended. Pour: Pour into glasses and top with and top with the golden rum (it should float on top). Serve: Serve with pineapple leaves or slices as garnish if desired.',
            'user_id' => 1,
        ]);

        Recipe::factory()->create([
            'name' => 'Strawberry Daquiri',
            'instructions' => 'Place frozen strawberries in a blender; add sugar, lemon juice, and lime juice. Pour in rum and lemon-lime beverage, then add ice. Blend until smooth.',
            'user_id' => 1,
        ]);

        Recipe::factory()->create([
            'name' => 'Cucumber Collins',
            'instructions' => 'Add all the ingredients to an ice filled shaker, and shake for 30 seconds. Strain into an ice filled tumbler.',
            'user_id' => 1,
        ]);
    }
}
