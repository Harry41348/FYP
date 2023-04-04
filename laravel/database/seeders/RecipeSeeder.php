<?php

namespace Database\Seeders;

use App\Models\IngredientRecipe;
use App\Models\Recipe;
use Illuminate\Database\Seeder;

class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $recipes = [
            [
                'name' => 'Mojito',
                'instructions' => '1. Add the lime juice, mint and sugar syrup to a high ball glass and muddle lightly to release the flavour of the mint. 2. Add crushed ice and then pour in the light rum, and stir. 3. Pour in a dash of soda (lemonade can be used a substitute.)',
                'ingredients' => [
                    ['ingredient_id' => 3, 'amount' => 2, 'measurement' => 'oz'],
                    ['ingredient_id' => 53, 'amount' => 8, 'measurement' => '‏'],
                    ['ingredient_id' => 38, 'amount' => 0.5, 'measurement' => 'oz'],
                    ['ingredient_id' => 40, 'amount' => 0.5, 'measurement' => 'oz'],
                    ['ingredient_id' => 51, 'amount' => 1, 'measurement' => 'dash'],
                ]
            ],
            [
                'name' => 'Strawberry Daquiri',
                'instructions' => '1. Place frozen strawberries in a blender with ice. 2. Add in the sugar syrup, lime juice, and white rum. 3. Blend until smooth. 4. Pour into a margarita glass.',
                'ingredients' => [
                    ['ingredient_id' => 3, 'amount' => 1.5, 'measurement' => 'oz'],
                    ['ingredient_id' => 38, 'amount' => 1, 'measurement' => 'oz'],
                    ['ingredient_id' => 40, 'amount' => 0.75, 'measurement' => 'oz'],
                    ['ingredient_id' => 58, 'amount' => 20, 'measurement' => 'g'],
                ]
            ],
            [
                'name' => 'Cucumber Collins',
                'instructions' => '1. Into an ice-filled shaker, add the cucumber vodka (if you don\'t have any, muddle together water and lots of cucumber, and add that with vodka), along with the sugar syrup and lime juice. 2. Mix together well (for around 30 seconds). 3. Strain into a rocks glass, and add a dash of lemonade or ginger ale. Garnish with a slice of cucumber.',
                'ingredients' => [
                    ['ingredient_id' => 59, 'amount' => 2, 'measurement' => 'oz'],
                    ['ingredient_id' => 38, 'amount' => 1, 'measurement' => 'oz'],
                    ['ingredient_id' => 40, 'amount' => 0.5, 'measurement' => 'oz'],
                    ['ingredient_id' => 47, 'amount' => 1, 'measurement' => 'oz'],
                ]
            ],
            [
                'name' => 'Piña Colada',
                'instructions' => '1. Add all the ingredients to a powerful blender with ice. The amount of ice should fill a cup. 2. Blend the ingredients until a slushy-like consistency. 3. Pour into a (preferably) hurricane glass and top with and top with the golden rum (it should float on top).',
                'ingredients' => [
                    ['ingredient_id' => 3, 'amount' => 2, 'measurement' => 'oz'],
                    ['ingredient_id' => 57, 'amount' => 2, 'measurement' => 'oz'],
                    ['ingredient_id' => 44, 'amount' => 4, 'measurement' => 'oz'],
                    ['ingredient_id' => 40, 'amount' => 0.5, 'measurement' => 'oz'],
                ]
            ],
            [
                'name' => 'Espresso Martini',
                'instructions' => '1. Make the espresso shot (use coffee if needed, but try to avoid). 2. Add all the ingredients to an ice-filled shaker and shake for 15-30 seconds. 3. Strain into a martini glass. Garnish with coffee beans.',
                'ingredients' => [
                    ['ingredient_id' => 1, 'amount' => 2, 'measurement' => 'oz'],
                    ['ingredient_id' => 56, 'amount' => 1, 'measurement' => 'oz'],
                    ['ingredient_id' => 21, 'amount' => 0.5, 'measurement' => 'oz'],
                    ['ingredient_id' => 38, 'amount' => 0.5, 'measurement' => 'oz'],
                ]
            ],
            [
                'name' => 'Long Island Iced Tea',
                'instructions' => '1. Add everything to an ice-filled collins glass except the coke. Stir. 2. Add a dash of coke as a layer above. 3. Serve with a straw and a lemon wedge for garnish.',
                'ingredients' => [
                    ['ingredient_id' => 1, 'amount' => 0.75, 'measurement' => 'oz'],
                    ['ingredient_id' => 3, 'amount' => 0.75, 'measurement' => 'oz'],
                    ['ingredient_id' => 8, 'amount' => 0.75, 'measurement' => 'oz'],
                    ['ingredient_id' => 14, 'amount' => 0.75, 'measurement' => 'oz'],
                    ['ingredient_id' => 20, 'amount' => 0.75, 'measurement' => 'oz'],
                    ['ingredient_id' => 38, 'amount' => 0.75, 'measurement' => 'oz'],
                    ['ingredient_id' => 41, 'amount' => 0.75, 'measurement' => 'oz'],
                    ['ingredient_id' => 50, 'amount' => 1, 'measurement' => 'dash'],
                ]
            ],
            [
                'name' => 'Moscow Mule',
                'instructions' => '1. Pour all the ingredients into a copper mug filled with ice. 2. Stir, and garnish with quarters of lime.',
                'ingredients' => [
                    ['ingredient_id' => 1, 'amount' => 1.5, 'measurement' => 'oz'],
                    ['ingredient_id' => 40, 'amount' => 0.5, 'measurement' => 'oz'],
                    ['ingredient_id' => 48, 'amount' => 0.5, 'measurement' => 'oz'],
                ]
            ],
            [
                'name' => 'Dark \'N\' Stormy',
                'instructions' => '1. Pour the ginger beer and lime juice into an ice-filled highball glass, and stir. 2. Layer the dark rum on top of the other ingredients. 3. Garnish with a lime wedge.',
                'ingredients' => [
                    ['ingredient_id' => 4, 'amount' => 2, 'measurement' => 'oz'],
                    ['ingredient_id' => 48, 'amount' => 3, 'measurement' => 'oz'],
                    ['ingredient_id' => 40, 'amount' => 0.5, 'measurement' => 'oz'],
                ]
            ],
            [
                'name' => 'Sex on the beach',
                'instructions' => '1. Build the ingredients in a hurricane glass, and stir well. 2. Garnish with orange slices and cherries.',
                'ingredients' => [
                    ['ingredient_id' => 1, 'amount' => 2, 'measurement' => 'oz'],
                    ['ingredient_id' => 32, 'amount' => 1, 'measurement' => 'oz'],
                    ['ingredient_id' => 43, 'amount' => 2, 'measurement' => 'oz'],
                    ['ingredient_id' => 46, 'amount' => 2, 'measurement' => 'oz'],
                    ['ingredient_id' => 41, 'amount' => 0.5, 'measurement' => 'oz'],
                ]
            ],
            [
                'name' => 'Blue Hawaii',
                'instructions' => '1. Add all the ingredients to a powerful blender with ice (ice should fill the serving glass). 2. Blend until the drink is a slushy consistency. 3. Pour into a hurricane glass.',
                'ingredients' => [
                    ['ingredient_id' => 1, 'amount' => 0.75, 'measurement' => 'oz'],
                    ['ingredient_id' => 3, 'amount' => 0.75, 'measurement' => 'oz'],
                    ['ingredient_id' => 28, 'amount' => 0.5, 'measurement' => 'oz'],
                    ['ingredient_id' => 44, 'amount' => 3, 'measurement' => 'oz'],
                    ['ingredient_id' => 40, 'amount' => 0.35, 'measurement' => 'oz'],
                    ['ingredient_id' => 41, 'amount' => 0.35, 'measurement' => 'oz'],
                    ['ingredient_id' => 38, 'amount' => 0.35, 'measurement' => 'oz'],
                ]
            ],
            [
                'name' => 'Planters Punch',
                'instructions' => '1. Add all the ingredients to an ice-filled shaker. Shake well for 15-30 seconds. 2. Strain into a mason jar.',
                'ingredients' => [
                    ['ingredient_id' => 43, 'amount' => 1.25, 'measurement' => 'oz'],
                    ['ingredient_id' => 44, 'amount' => 1.25, 'measurement' => 'oz'],
                    ['ingredient_id' => 42, 'amount' => 0.75, 'measurement' => 'oz'],
                    ['ingredient_id' => 4, 'amount' => 1.5, 'measurement' => 'oz'],
                    ['ingredient_id' => 38, 'amount' => 0.3, 'measurement' => 'oz'],
                    ['ingredient_id' => 37, 'amount' => 0.3, 'measurement' => 'oz'],
                ]
            ],
            [
                'name' => 'Hurricane',
                'instructions' => '1. Add all the ingredients into an ice-filled shaker. Shake well for 15-30 seconds. 2. Strain into a hurricane glass. 3. Garnish with an orange wheel and cherry.',
                'ingredients' => [
                    ['ingredient_id' => 3, 'amount' => 1, 'measurement' => 'oz'],
                    ['ingredient_id' => 4, 'amount' => 1, 'measurement' => 'oz'],
                    ['ingredient_id' => 7, 'amount' => 1, 'measurement' => 'oz'],
                    ['ingredient_id' => 60, 'amount' => 2, 'measurement' => 'oz'],
                    ['ingredient_id' => 38, 'amount' => 0.3, 'measurement' => 'oz'],
                    ['ingredient_id' => 41, 'amount' => 0.3, 'measurement' => 'oz'],
                ]
            ],
            [
                'name' => 'Daquiri',
                'instructions' => '1. Add all the ingredients into an ice-filled shaker. Shake well for 15-30 seconds. 2. Double strain into a martini glass. 3. Garnish with a wheel of lime.',
                'ingredients' => [
                    ['ingredient_id' => 3, 'amount' => 2, 'measurement' => 'oz'],
                    ['ingredient_id' => 61, 'amount' => 10, 'measurement' => 'g'],
                    ['ingredient_id' => 40, 'amount' => 1, 'measurement' => 'oz'],
                ]
            ],
        ];

        foreach ($recipes as $recipe) {
            $newRecipe = Recipe::factory()->create([
                'name' => $recipe['name'],
                'instructions' => $recipe['instructions'],
                'user_id' => 1
            ]);

            foreach ($recipe['ingredients'] as $ingredient) {
                IngredientRecipe::factory()->create([
                    'recipe_id' => $newRecipe->id,
                    'ingredient_id' => $ingredient['ingredient_id'],
                    'amount' => $ingredient['amount'],
                    'measurement' => $ingredient['measurement']
                ]);
            }
        }
    }
}
