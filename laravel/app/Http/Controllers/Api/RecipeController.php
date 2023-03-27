<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RecipeRequest;
use App\Http\Resources\IngredientRecipeResource;
use App\Http\Resources\RecipeResource;
use App\Models\Ingredient;
use App\Models\IngredientRecipe;
use App\Models\Recipe;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Throwable;

class RecipeController extends Controller
{
    /**
     * Get recipes with or without a filter.
     */
    public function index(Request $request)
    {
        // return 'working';
        $recipes = Recipe::all();

        // Filters out by user created recipes
        if ($request->created && auth('sanctum')->check()) {
            $recipes = $recipes->where('user_id', auth('sanctum')->id());
        }
        // Filters out by recommended recipes
        if ($request->recommended) {
            $recipes = $recipes->where('is_recommended', 1);
        }
        // Filters out by recipes the user can make with their ingredients
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
        // Shuffles recipes
        if ($request->shuffle) {
            $recipes = $recipes->shuffle();
        }
        // How many recipes to take
        if ($request->take) {
            $recipes = $recipes->take($request->take);
        }

        return response(RecipeResource::collection($recipes), 200);
    }

    /**
     * Store a newly created recipe and its corresponding ingredients.
     */
    public function store(RecipeRequest $request)
    {
        // Validate and setup the data
        $data = $request->validated();
        $data['user_id'] = Auth::id();

        // Create the recipe
        $recipe = Recipe::create($data);

        try {
            // For every ingredient, validate and create it
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
        } catch (Throwable $e) {
            // If something goes wrong, delete the recipe
            $recipe->delete();

            return response(['error' => 'Invalid ingredient data.'], 400);
        }

        return response($recipe, 201);
    }

    /**
     * Validate a recipe without creating it.
     */
    public function validateRecipe(Request $request)
    {
        if (Auth::guest()) {
            return response(['error' => 'You must be authenticated to create a recipe.'], 401);
        }

        if ($request->id) {
            $recipe = Recipe::find($request->id);

            $request->validate([
                'name' => 'required|min:3|max:32|unique:recipes,name,' . $recipe->id,
                'instructions' => 'required',
            ]);
        } else {
            $request->validate([
                'name' => 'required|min:3|max:32|unique:recipes,name',
                'instructions' => 'required',
            ]);
        }

        return response(true, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Recipe $recipe)
    {
        $ingredients = IngredientRecipeResource::collection($recipe->ingredients);

        // Append the name of each ingredient
        foreach ($ingredients as $ingredient) {
            $ingredient->name = Ingredient::find($ingredient->ingredient_id)->name;
        }

        return response(compact(['recipe', 'ingredients']), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Recipe $recipe)
    {
        $data = $request->validate([
            'name' => 'required|min:3|max:32|unique:recipes,name,' . $recipe->id,
            'instructions' => 'required',
            'ingredients' => 'required'
        ]);

        if ($recipe->user_id != Auth::id()) {
            return response(['error' => 'Unauthorised to modify this recipe.'], 401);
        }

        try {
            // For every ingredient, validate and create it
            foreach ($request['ingredients'] as $ingredient) {
                $exists = IngredientRecipe::where('recipe_id', $recipe->id)->where('ingredient_id', $ingredient['ingredient_id'])->exists();
                if ($exists) {
                    continue;
                }
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
        } catch (Throwable $e) {
            return response(['error' => 'Invalid ingredient data.'], 400);
        }

        $recipe->update($data);

        return response($recipe, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Recipe $recipe)
    {
        // Check if the recipe is owned by authenticated user
        if (Auth::id() != $recipe->user_id) {
            return response(['error' => 'You must have sufficient permissions to delete this recipe.'], 401);
        }

        $recipe->delete();
        return response("", 204);
    }
}
