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
        // Act as a user
        Sanctum::actingAs(
            User::factory()->create()
        );

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

    // Test get ingredients in a category
    public function test_get_ingredients_categories_spirits()
    {
        // Act as a user
        Sanctum::actingAs(
            User::factory()->create()
        );

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

    // Test get ingredients
    public function test_get_ingredients_categories_non_existent()
    {
        // Act as a user
        Sanctum::actingAs(
            User::factory()->create()
        );

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
        // Act as a user
        Sanctum::actingAs(
            User::factory()->create()
        );

        // Create IngredientUser's
        IngredientUser::factory()->create([
            'ingredient_id' => 1,
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
                        $json->where('id', 1)
                            ->where('name', 'Vodka')
                            ->where('category', 'Spirit')
                            ->where('userHas', null)
                    )
            );
    }

    // Test post user ingredient
    public function test_post_ingredient_user()
    {
        // Act as a user
        Sanctum::actingAs(
            User::factory()->create()
        );

        // Send a post request to user ingredients
        $response = $this->post('/api/user-ingredients', [
            'user_id' => Auth::id(),
            'ingredient_id' => 1
        ])->assertCreated();

        // Assert the database has the new user ingredient
        $this->assertDatabaseHas('ingredient_user', [
            'ingredient_id' => 1,
            'user_id' => Auth::id()
        ]);
    }

    // Test post user ingredient with different user_id
    public function test_post_unauthorized_ingredient_user()
    {
        // Act as a user
        Sanctum::actingAs(
            User::factory()->create()
        );

        $otherUser = User::factory()->create();

        // Send a post request to user ingredients
        $response = $this->post('/api/user-ingredients', [
            'user_id' => $otherUser->id,
            'ingredient_id' => 1
        ])->assertCreated();

        // Assert the database has the new user ingredient
        $this->assertDatabaseMissing('ingredient_user', [
            'ingredient_id' => 1,
            'user_id' => $otherUser->id
        ]);
    }

    // Test toggle ingredient
    public function test_toggle_ingredient()
    {
        // Act as a user
        Sanctum::actingAs(
            User::factory()->create()
        );

        // Toggle ingredient 1 and assert it is in the database
        $this->post('/api/user-ingredients/toggle/1')->assertOK();
        $this->assertDatabaseHas('ingredient_user', [
            'ingredient_id' => 1,
            'user_id' => Auth::id()
        ]);

        // Toggle ingredient 1 again and assert it is no longer in the database
        $this->post('/api/user-ingredients/toggle/1')->assertOK();
        $this->assertDatabaseMissing('ingredient_user', [
            'ingredient_id' => 1,
            'user_id' => Auth::id()
        ]);
    }

    // Test delete user ingredient
    public function test_delete_ingredient_user()
    {
        // Act as a user
        Sanctum::actingAs(
            User::factory()->create()
        );

        // Create IngredientUser and check its in the database
        $ingredientUser = IngredientUser::factory()->create([
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
