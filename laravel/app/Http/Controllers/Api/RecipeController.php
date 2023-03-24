<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RecipeRequest;
use App\Http\Resources\IngredientRecipeResource;
use App\Http\Resources\IngredientResource;
use App\Http\Resources\RecipeResource;
use App\Models\Ingredient;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->take) {
            $recipes = Recipe::all()->shuffle()->take($request->take);
        } else {
            $recipes = Recipe::all()->shuffle();
        }
        return response(RecipeResource::collection($recipes, 200));
    }

    /**
     * Display a listing of saved saved recipes.
     */
    public function savedRecipes(Request $request)
    {
        return response(['message' => 'No saved recipes.'], 200);
    }

    /**
     * Display a listing of saved saved recipes.
     */
    public function recommendedRecipes(Request $request)
    {
        if ($request->take) {
            $recipes = Recipe::where('is_recommended', true)->get()->shuffle()->take($request->take);
        } else {
            $recipes = Recipe::where('is_recommended', 1)->get()->shuffle();
        }
        return response(RecipeResource::collection($recipes, 200));
    }

    /**
     * Display a listing of saved saved recipes.
     */
    public function myBarRecipes(Request $request)
    {
        return response(['message' => 'No recipes with available ingredients.'], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RecipeRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();

        return response(Recipe::create($data), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Recipe $recipe)
    {
        // $ingredients = IngredientRecipeResource::collection($recipe->ingredients);
        $ingredients = IngredientRecipeResource::collection($recipe->ingredients);

        foreach ($ingredients as $ingredient) {
            $ingredient->name = Ingredient::find($ingredient->ingredient_id)->name;
        }

        return response(compact(['recipe', 'ingredients']), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RecipeRequest $request, Recipe $recipe)
    {
        $data = $request->validated();
        $recipe->update($data);

        return response($recipe, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Recipe $recipe)
    {
        if (Auth::id() == $recipe->user_id) {
            $recipe->delete();
            return response("", 204);
        }
        return response("", 401);
    }
}
