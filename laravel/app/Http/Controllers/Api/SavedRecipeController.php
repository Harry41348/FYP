<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use App\Models\SavedRecipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SavedRecipeController extends Controller
{
    /**
     * Save a recipe
     */
    public function save(Recipe $recipe)
    {
        if (Auth::guest()) {
            return response(['error' => 'You must be logged in to save recipes.'], 401);
        }

        $exists = SavedRecipe::where('recipe_id', $recipe->id)->where('user_id', Auth::id())->exists();
        if ($exists) {
            return response(['message' => 'This recipe is already saved.']);
        }

        SavedRecipe::create([
            'recipe_id' => $recipe->id,
            'user_id' => Auth::id()
        ]);
        return response(['message' => 'Recipe successfully saved.'], 201);
    }

    /**
     * Unsave a recipe
     */
    public function unsave(Recipe $recipe)
    {
        if (Auth::guest()) {
            return response(['error' => 'You must be logged in to unsave recipes.'], 401);
        }

        $exists = SavedRecipe::where('recipe_id', $recipe->id)->where('user_id', Auth::id())->exists();
        if (!$exists) {
            return response(['message' => 'This recipe is not saved.']);
        }

        SavedRecipe::where('recipe_id', $recipe->id)->where('user_id', Auth::id())->delete();
        return response(['message' => 'Recipe successfully unsaved.'], 201);
    }
}
