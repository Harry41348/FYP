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
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(IngredientRecipeRequest $request)
    {
        // Validate the data and ensure it does not exist
        $data = $request->validated();
        $recipe = Recipe::find($data["recipe_id"]);

        if ($recipe->user_id != Auth::id()) {
            return response(["message" => "You do not own this recipe."], 401);
        }

        $exists = IngredientRecipe::where('recipe_id', $data['recipe_id'])->where('ingredient_id', $data['ingredient_id'])->exists();

        if ($exists) {
            return response(['ingredient' => 'You already have this ingredient'], 409);
        }

        $ingredientRecipe = IngredientRecipe::create($data);
        return response($ingredientRecipe, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
