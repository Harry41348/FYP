<?php

namespace Tests\Feature;

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

        // Set up acting as a user
        Sanctum::actingAs(
            User::factory()->create()
        );

        $this->withHeader('Accept', 'application/json');

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
        $recipe = Recipe::factory()->create([
            'name' => 'Strawberry Daquiri',
            'instructions' => 'Pour ingredients together.',
            'user_id' => Auth::id(),
            'is_recommended' => true,
        ]);

        // Send get recipe request
        $response = $this->get('/api/recipes/' . $recipe->id)->assertOk();

        $response->assertJson(
            fn (AssertableJson $json) =>
            $json->where('user_id', Auth::id())
                ->where('name', 'Strawberry Daquiri')
                ->where('instructions', 'Pour ingredients together.')
                ->where('is_recommended', 1)
                ->etc()
        );
    }

    // Test store recipe
    public function test_create_recipe()
    {
        $response = $this->post('/api/recipes', [
            'name' => "Strawberry Daquiri",
            'instructions' => "Pour ingredients together.",
            'is_recommended' => false,
        ])->assertCreated();

        $response->assertJson(
            fn (AssertableJson $json) =>
            $json->where('user_id', Auth::id())
                ->where('name', 'Strawberry Daquiri')
                ->where('instructions', 'Pour ingredients together.')
                ->where('is_recommended', false)
                ->etc()
        );
    }


    /**
     * @test
     * @dataProvider unauthorizedUrls
     */
    // Test store recipe with invalid input
    public function test_invalid_create_recipe($name, $instructions)
    {
        $this->post('/api/recipes', [
            'name' => $name,
            'instructions' => $instructions,
            'is_recommended' => false,
        ])->assertStatus(422);
    }

    public function unauthorizedUrls(): array
    {
        return [
            ["Strawberry Daquiri", ""],
            ["", "Pour ingredients together.",],
            ["", "",],
            ["SD", "Pour ingredients together.",],
        ];
    }

    // Test update recipe
    public function test_update_recipe()
    {
        $recipe = Recipe::factory()->create([
            'name' => 'Strawberry Daquiri',
            'instructions' => 'Pour ingredients together.',
            'user_id' => Auth::id(),
            'is_recommended' => false,
        ]);

        $response = $this->put('/api/recipes/' . $recipe->id, [
            'name' => "Pina Colada",
            'instructions' => "Blend ingredients together.",
            'is_recommended' => true,
        ])->assertOk();

        $response->assertJson(
            fn (AssertableJson $json) =>
            $json->where('user_id', Auth::id())
                ->where('name', 'Pina Colada')
                ->where('instructions', 'Blend ingredients together.')
                ->where('is_recommended', true)
                ->etc()
        );
    }

    // Test update recipe
    public function test_invalid_update_recipe()
    {
        $recipe = Recipe::factory()->create([
            'name' => 'Strawberry Daquiri',
            'instructions' => 'Pour ingredients together.',
            'user_id' => Auth::id(),
            'is_recommended' => false,
        ]);

        $this->put('/api/recipes/' . $recipe->id, [
            'name' => "Pina Colada",
            'instructions' => "",
            'is_recommended' => true,
        ])->assertStatus(422);
    }

    // Test delete recipe
    public function test_delete_recipe()
    {
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

    // Test delete recipe
    public function test_user_cant_delete_unauthorized_recipe()
    {
        $user = User::factory()->create();
        $recipe = Recipe::factory()->create([
            'name' => 'Strawberry Daquiri',
            'instructions' => 'Pour ingredients together.',
            'user_id' => $user->id,
            'is_recommended' => false,
        ]);

        $this->assertDatabaseHas('recipes', [
            'name' => 'Strawberry Daquiri'
        ]);

        $response = $this->delete('/api/recipes/' . $recipe->id)->assertUnauthorized();

        $this->assertDatabaseHas('recipes', [
            'name' => 'Strawberry Daquiri'
        ]);
    }
}
