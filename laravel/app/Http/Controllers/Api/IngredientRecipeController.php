<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\IngredientRecipeRequest;
use App\Models\IngredientRecipe;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Throwable;

class IngredientRecipeController extends Controller
{
    /**
     * Store multiple newly created resources in storage.
     */
    public function store(Request $request, Recipe $recipe)
    {
        // Validate the data and ensure it does not exist
        if ($recipe->user_id != Auth::id()) {
            return response(['error' => 'Insufficient permissions to add ingredients to this recipe.'], 401);
        }

        try {
            $request->validate([
                'ingredients' => 'required'
            ]);
        } catch (Throwable $e) {
            $recipe->delete();

            return response(['error' => 'Ingredients are required to create a recipe.'], 400);
        }

        try {

            // For every ingredient, validate and create it
            foreach ($request['ingredients'] as $ingredient) {
                // If it exists, continue the foreach loop
                $exists = IngredientRecipe::where('recipe_id', $recipe->id)->where('ingredient_id', $ingredient['ingredient_id'])->exists();
                if ($exists) {
                    continue;
                }

                // Store the Ingredient Recipe
                $ingredient["recipe_id"] = $recipe->id;
                $ingredientRequest = new Request($ingredient);
                $data = $ingredientRequest->validate([
                    'ingredient_id' => 'required|exists:ingredients,id',
                    'recipe_id' => 'required|exists:recipes,id',
                    'amount' => 'required',
                    'measurement' => 'required'
                ]);
                IngredientRecipe::create($data);
            }
        } catch (Throwable $e) {
            // If something goes wrong, delete the recipe
            $recipe->delete();

            return response(['error' => 'Invalid ingredient data.'], 400);
        }

        return response("", 201);
    }

    public function update(Request $request, Recipe $recipe)
    {
        // Validate the data and ensure it does not exist
        if ($recipe->user_id != Auth::id()) {
            return response(['error' => 'Insufficient permissions to update ingredients for this recipe.'], 401);
        }

        $request->validate([
            'ingredients' => 'required'
        ]);

        $requestIngredients = $request['ingredients'];
        try {
            // For every ingredient, validate and create it
            foreach ($request['ingredients'] as $ingredient) {
                // If it exists, continue the foreach loop
                $exists = IngredientRecipe::where('recipe_id', $recipe->id)->where('ingredient_id', $ingredient['ingredient_id'])->exists();
                if ($exists) {
                    continue;
                }

                // Store the Ingredient Recipe
                $ingredient["recipe_id"] = $recipe->id;
                $ingredientRequest = new Request($ingredient);
                $data = $ingredientRequest->validate([
                    'ingredient_id' => 'required|exists:ingredients,id',
                    'recipe_id' => 'required|exists:recipes,id',
                    'amount' => 'required',
                    'measurement' => 'required'
                ]);
                IngredientRecipe::create($data);
            }
        } catch (Throwable $e) {
            // If something goes wrong, return error 400
            return response(['error' => 'Invalid ingredient data.'], 400);
        }

        $requestIngredients = $request['ingredients'];
        // For each ingredient that isn't in the request, delete it
        foreach ($recipe->ingredients as $ingredient) {
            $removeIngredient = true;
            foreach ($requestIngredients as $requestIngredient) {
                if ($requestIngredient['ingredient_id'] == $ingredient->ingredient_id) {
                    $removeIngredient = false;
                }
            }
            if ($removeIngredient == true) {
                IngredientRecipe::where('recipe_id', $recipe->id)->where('ingredient_id', $ingredient->ingredient_id)->delete();
            }
        }

        return response("", 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $recipe = Recipe::find($request->recipe_id);

        if (!$recipe) {
            return response(["error" => "Recipe not found."], 400);
        }

        if (Auth::id() != $recipe->user_id) {
            return response(["error" => "You are not authorised to modify this recipe."], 401);
        }

        $ingredientRecipe = IngredientRecipe::where('recipe_id', $recipe->id)->where('ingredient_id', $request->ingredient_id)->first();

        if (!$ingredientRecipe) {
            return response(["error" => "Recipe does not contain ingredient."], 400);
        }

        $recipe->delete();
        return response("", 204);
    }
}
