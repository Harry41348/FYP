<?php

namespace Tests\Feature;

use App\Models\Ingredient;
use App\Models\IngredientRecipe;
use App\Models\Recipe;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Testing\Fluent\AssertableJson;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class RecipeTest extends TestCase
{
    public function SetUp(): void
    {
        parent::SetUp();

        $this->withHeader('Accept', 'application/json');

        $user = User::factory()->create();

        // Set up the dummy recipes
        Recipe::factory()->count(5)->create();
    }

    // Test get recipes
    public function test_get_recipes()
    {
        // Send get recipes request
        $response = $this->get('/api/recipes')->assertOk();

        // Assert all 5 recipes are there
        $response
            ->assertJson(
                fn (AssertableJson $json) =>
                $json->has(5)
            );
    }

    // Test show recipe
    public function test_show_recipe()
    {
        // Create a dummy recipe
        $recipe = Recipe::factory()->create([
            'name' => 'Strawberry Daquiri',
            'instructions' => 'Pour ingredients together.',
            'user_id' => Auth::id(),
            'is_recommended' => true,
        ]);

        // Send get recipe request
        $response = $this->get('/api/recipes/' . $recipe->id)->assertOk();

        $response->assertJson([
            'recipe' => [
                'id' => $recipe->id,
                'name' => 'Strawberry Daquiri',
                'instructions' => 'Pour ingredients together.',
                'user_id' => Auth::id()
            ]
        ]);
    }

    // Test validate recipe
    public function test_validate_recipe()
    {
        Sanctum::actingAs(
            User::factory()->create()
        );

        $this->get('/api/recipes/validate?name=New+cocktail&instructions=Testing')->assertOk();
    }

    // Test unauthorised validate recipe
    public function test_unauthorised_validate_recipe()
    {
        $this->get('/api/recipes/validate?name=New+cocktail&instructions=Testing')->assertUnauthorized();
    }

    // Test invalid validate recipe
    public function test_invalid_validate_recipe()
    {
        Sanctum::actingAs(
            User::factory()->create()
        );

        $this->get('/api/recipes/validate?name=New+cocktail')->assertUnprocessable();
    }

    // Test store recipe
    public function test_create_recipe()
    {
        Sanctum::actingAs(
            User::factory()->create()
        );

        // Create ingredient to go with the recipe
        Ingredient::factory()->create([
            'name' => 'Vodka',
            'category' => 'Spirit'
        ]);

        $recipeResponse = $this->post('/api/recipes', [
            'name' => "Strawberry Daquiri",
            'instructions' => "Pour ingredients together.",
            'is_recommended' => false,
        ])->assertCreated();

        // Assert the returned data and database
        $recipeResponse->assertJson([
            'name' => 'Strawberry Daquiri',
            'instructions' => 'Pour ingredients together.',
            'user_id' => Auth::id(),
        ]);

        $json = $recipeResponse->json();

        $ingredientResponse = $this->post('/api/recipes/ingredients/' . $json['id'], [
            'ingredients' => [
                '0' => [
                    'ingredient_id' => 1,
                    'amount' => 3,
                    'measurement' => 'oz'
                ]
            ]
        ])->assertCreated();

        $this->assertDatabaseHas('ingredient_recipe', [
            'ingredient_id' => 1,
            'recipe_id' => $json['id'],
            'amount' => 3,
            'measurement' => 'oz'
        ]);
    }


    /**
     * @test
     * @dataProvider unauthorisedUrls
     */
    // Test store recipe with invalid input
    public function test_invalid_create_recipe($name, $instructions)
    {
        Sanctum::actingAs(
            User::factory()->create()
        );

        // Send a post request with invalid data
        $this->post('/api/recipes', [
            'name' => $name,
            'instructions' => $instructions,
            'is_recommended' => false,
        ])->assertStatus(422);
    }

    public function unauthorisedUrls(): array
    {
        return [
            ["Strawberry Daquiri", ""],
            ["", "Pour ingredients together.",],
            ["", "",],
            ["SD", "Pour ingredients together.",],
        ];
    }

    // Test storing recipe unauthorised
    public function test_unauthorised_create_recipe()
    {
        $this->post('/api/recipes', [
            'name' => 'Old Fashioned',
            'instructions' => 'Add ingredients to a rocks glass, and stir.',
            'is_recommended' => true,
        ])->assertStatus(401);
    }

    // Test update recipe
    public function test_update_recipe()
    {
        Sanctum::actingAs(
            User::factory()->create()
        );

        // Create ingredient to go with the update
        Ingredient::factory()->create([
            'name' => 'Vodka',
            'category' => 'Spirit'
        ]);

        $recipe = Recipe::factory()->create([
            'name' => 'Strawberry Daquiri',
            'instructions' => 'Pour ingredients together.',
            'user_id' => Auth::id(),
            'is_recommended' => false,
        ]);

        // Update the recipe
        $response = $this->post('/api/recipes/' . $recipe->id, [
            'name' => "Pina Colada",
            'instructions' => "Blend ingredients together.",
        ])->assertOk();

        $response->assertJson([
            'name' => 'Pina Colada',
            'instructions' => 'Blend ingredients together.',
            'user_id' => Auth::id(),
        ]);

        $this->assertDatabaseHas('recipes', [
            'name' => 'Pina Colada',
            'instructions' => 'Blend ingredients together.',
            'user_id' => Auth::id()
        ]);

        $json = $response->json();

        $this->put('/api/recipes/ingredients/' . $json['id'], [
            'ingredients' => [
                "0" => [
                    "ingredient_id" => 1,
                    "amount" => 3,
                    "measurement" => "oz"
                ]
            ]
        ]);

        $this->assertDatabaseHas('ingredient_recipe', [
            'ingredient_id' => 1,
            'recipe_id' => $recipe->id,
            'amount' => 3,
            'measurement' => 'oz'
        ]);
    }

    // Test invalid recipe
    public function test_invalid_update_recipe()
    {
        Sanctum::actingAs(
            User::factory()->create()
        );

        $recipe = Recipe::factory()->create([
            'name' => 'Strawberry Daquiri',
            'instructions' => 'Pour ingredients together.',
            'user_id' => Auth::id(),
            'is_recommended' => false,
        ]);

        $this->post('/api/recipes/' . $recipe->id, [
            'name' => "Pina Colada",
            'instructions' => "",
            'is_recommended' => true,
        ])->assertStatus(422);
    }

    // Test unauthorised update recipe
    public function test_unauthorised_update_recipe()
    {
        Sanctum::actingAs(
            User::factory()->create()
        );

        $recipe = Recipe::factory()->create([
            'name' => 'Strawberry Daquiri',
            'instructions' => 'Pour ingredients together.',
            'user_id' => 1,
            'is_recommended' => false,
        ]);

        $this->post('/api/recipes/' . $recipe->id, [
            'name' => "Pina Colada",
            'instructions' => "New instructions",
            'is_recommended' => true
        ])->assertUnauthorized();
    }

    // Test delete recipe
    public function test_delete_recipe()
    {
        Sanctum::actingAs(
            User::factory()->create()
        );

        $recipe = Recipe::factory()->create([
            'name' => 'Strawberry Daquiri',
            'instructions' => 'Pour ingredients together.',
            'user_id' => Auth::id(),
            'is_recommended' => false,
        ]);

        $this->assertDatabaseHas('recipes', [
            'name' => 'Strawberry Daquiri'
        ]);

        $response = $this->delete('/api/recipes/' . $recipe->id)->assertNoContent();

        $this->assertDatabaseMissing('recipes', [
            'name' => 'Strawberry Daquiri'
        ]);
    }

    // Test delete recipe as unauthenticated user
    public function test_unauthorised_delete_recipe()
    {
        Sanctum::actingAs(
            User::factory()->create()
        );

        $recipe = Recipe::factory()->create([
            'name' => 'Strawberry Daquiri',
            'instructions' => 'Pour ingredients together.',
            'user_id' => 1,
            'is_recommended' => false,
        ]);

        $this->assertDatabaseHas('recipes', [
            'name' => 'Strawberry Daquiri'
        ]);

        $this->delete('/api/recipes/' . $recipe->id)->assertUnauthorized();

        $this->assertDatabaseHas('recipes', [
            'name' => 'Strawberry Daquiri'
        ]);
    }
}
