<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\IngredientRecipeRequest;
use App\Models\IngredientRecipe;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IngredientRecipeController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(IngredientRecipeRequest $request)
    {
        // Validate the data and ensure it does not exist
        $data = $request->validated();
        $recipe = Recipe::find($data["recipe_id"]);

        if ($recipe->user_id != Auth::id()) {
            return response(["error" => "You do not own this recipe."], 401);
        }

        $exists = IngredientRecipe::where('recipe_id', $data['recipe_id'])->where('ingredient_id', $data['ingredient_id'])->exists();

        if ($exists) {
            return response(['error' => 'You already have this ingredient'], 409);
        }

        $ingredientRecipe = IngredientRecipe::create($data);
        return response($ingredientRecipe, 201);
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
