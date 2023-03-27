<?php

namespace Tests\Feature;

use App\Models\Ingredient;
use App\Models\IngredientUser;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Testing\Fluent\AssertableJson;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class IngredientTest extends TestCase
{
    public function SetUp(): void
    {
        parent::SetUp();

        // Set up acting as a user
        Sanctum::actingAs(
            User::factory()->create()
        );

        $this->withHeader('Accept', 'application/json');

        // Set up the dummy ingredients
        $ingredients = [
            ['name' => 'Vodka', 'category' => 'Spirit'],
            ['name' => 'Spiced Rum', 'category' => 'Spirit'],
            ['name' => 'Lime', 'category' => 'Mixer'],
        ];

        foreach ($ingredients as $ingredient) {
            Ingredient::factory()->create([
                'name' => $ingredient['name'],
                'category' => $ingredient['category']
            ]);
        }
    }

    // Test get all ingredients
    public function test_get_all_ingredients()
    {
        // Send a get request to ingredients
        $response = $this->get('/api/ingredients')->assertOk();

        // Assert the the content the ingredients are in the response
        $response
            ->assertJson(
                fn (AssertableJson $json) =>
                $json->has(3)
                    ->first(
                        fn (AssertableJson $json) =>
                        $json->where('id', 1)
                            ->where('name', 'Vodka')
                            ->where('category', 'Spirit')
                            ->where('userHas', null)
                    )
            );
    }

    // Test get ingredients in the spirits category
    public function test_get_ingredients_category_spirits()
    {
        // Send a get request to ingredients
        $response = $this->get('/api/ingredients/spirit')->assertOk();

        // Assert the the content the ingredients are in the response
        $response
            ->assertJson(
                fn (AssertableJson $json) =>
                $json->has(2)
                    ->first(
                        fn (AssertableJson $json) =>
                        $json->where('id', 1)
                            ->where('name', 'Vodka')
                            ->where('category', 'Spirit')
                            ->where('userHas', null)
                    )
            );
    }

    // Test get ingredients with incorrect category
    public function test_get_ingredients_categories_non_existent()
    {
        // Send a get request to ingredients
        $response = $this->get('/api/ingredients/random')->assertOk();

        // Assert the the content the ingredients are in the response
        $response
            ->assertJson(
                fn (AssertableJson $json) =>
                $json->has(0)
            );
    }

    // Test get user ingredients
    public function test_get_ingredients_user()
    {
        // Create IngredientUser's
        IngredientUser::factory()->create([
            'ingredient_id' => 3,
            'user_id' => Auth::id(),
        ]);
        IngredientUser::factory()->create([
            'ingredient_id' => 2,
            'user_id' => Auth::id(),
        ]);

        // Send a get request to user ingredients
        $response = $this->get('/api/user-ingredients')->assertOk();

        // Assert the users ingredients are in the response
        $response
            ->assertJson(
                fn (AssertableJson $json) =>
                $json->has(2)
                    ->first(
                        fn (AssertableJson $json) =>
                        $json->where('id', 2)
                            ->where('name', 'Spiced Rum')
                            ->where('category', 'Spirit')
                            ->where('userHas', null)
                    )
            );
    }

    // Test post user ingredient
    public function test_post_ingredient_user()
    {
        // Send a post request to user ingredients
        $response = $this->post('/api/user-ingredients', [
            'ingredient_id' => 1
        ])->assertCreated();

        // Assert the database has the new user ingredient
        $this->assertDatabaseHas('ingredient_user', [
            'ingredient_id' => 1,
            'user_id' => Auth::id()
        ]);
    }

    // Test post user ingredient with different user_id
    public function test_post_unauthorised_ingredient_user()
    {
        $user = User::factory()->create();

        // Send a post request to user ingredients
        $response = $this->post('/api/user-ingredients', [
            'user_id' => $user->id,
            'ingredient_id' => 1
        ])->assertCreated();

        // Assert the database did not add the wrong user_id
        $this->assertDatabaseMissing('ingredient_user', [
            'ingredient_id' => 1,
            'user_id' => $user->id
        ]);
        $this->assertDatabaseHas('ingredient_user', [
            'ingredient_id' => 1,
            'user_id' => Auth::id()
        ]);
    }

    // Test toggle ingredient
    public function test_toggle_ingredient()
    {
        // Toggle ingredient 1 and assert it is in the database
        $this->put('/api/user-ingredients/toggle/1')->assertOK();
        $this->assertDatabaseHas('ingredient_user', [
            'ingredient_id' => 1,
            'user_id' => Auth::id()
        ]);

        // Toggle ingredient 1 again and assert it is no longer in the database
        $this->put('/api/user-ingredients/toggle/1')->assertOK();
        $this->assertDatabaseMissing('ingredient_user', [
            'ingredient_id' => 1,
            'user_id' => Auth::id()
        ]);
    }

    // Test delete user ingredient
    public function test_delete_ingredient_user()
    {
        // Create IngredientUser and check its in the database
        IngredientUser::factory()->create([
            'ingredient_id' => 1,
            'user_id' => Auth::id(),
        ]);
        $this->assertDatabaseHas('ingredient_user', [
            'ingredient_id' => 1,
            'user_id' => Auth::id()
        ]);

        // Send a delete request to user ingredients
        $response = $this->delete('/api/user-ingredients/1')->assertNoContent();

        // Assert the database no longer has the ingredient
        $this->assertDatabaseMissing('ingredient_user', [
            'ingredient_id' => 1,
            'user_id' => Auth::id()
        ]);
    }
}
