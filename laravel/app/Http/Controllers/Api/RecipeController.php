<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\IngredientRecipeRequest;
use App\Http\Requests\RecipeRequest;
use App\Http\Resources\IngredientRecipeResource;
use App\Http\Resources\IngredientResource;
use App\Http\Resources\RecipeResource;
use App\Models\Ingredient;
use App\Models\IngredientRecipe;
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
        $recipes = Recipe::all();

        if ($request->recommended) {
            $recipes = $recipes->where('is_recommended', 1);
        }
        if ($request->available && auth('sanctum')->check()) {
            $userIngredientIds = auth('sanctum')->user()->ingredients()->allRelatedIds()->toArray();

            foreach ($recipes as $id => $recipe) {
                foreach ($recipe->ingredients as $ingredient) {
                    if (!in_array($ingredient->ingredient_id, $userIngredientIds)) {
                        $recipes->forget($id);
                        break;
                    }
                }
            }
        }
        if ($request->shuffle) {
            $recipes = $recipes->shuffle();
        }
        if ($request->take) {
            $recipes = $recipes->take($request->take);
        }

        return response(RecipeResource::collection($recipes), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RecipeRequest $request)
    {
        if (Auth::guest()) {
            return response("", 401);
        }

        $data = $request->validated();
        $data['user_id'] = Auth::id();

        $recipe = Recipe::create($data);

        foreach ($request['ingredients'] as $ingredient) {
            $request = new Request($ingredient);
            $request->validate([
                'ingredient_id' => 'required|exists:ingredients,id',
                'amount' => 'required',
                'measurement' => 'required'
            ]);
            IngredientRecipe::create([
                'ingredient_id' => $request->ingredient_id,
                'recipe_id' => $recipe->id,
                'amount' => $request->amount,
                'measurement' => $request->measurement
            ]);;
        }

        return response($recipe, 201);
    }

    /**
     * Validate a recipe
     */
    public function validateRecipe(Request $request)
    {
        if (Auth::guest()) {
            return response("", 401);
        }

        $request->validate([
            'name' => 'required|min:3|max:32|unique:recipes,name',
            'instructions' => 'required',
        ]);

        return response(true, 200);
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
