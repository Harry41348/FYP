<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RecipeRequest;
use App\Http\Resources\IngredientRecipeResource;
use App\Http\Resources\RecipeResource;
use App\Models\Ingredient;
use App\Models\Recipe;
use App\Models\SavedRecipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Image;
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

        // Filter out by user saved recipes
        if ($request->saved == "true" && auth('sanctum')->check()) {
            $recipes = auth('sanctum')->user()->savedRecipes;
        }
        // Filters out by user created recipes
        if ($request->created == "true" && auth('sanctum')->check()) {
            $recipes = $recipes->where('user_id', auth('sanctum')->id());
        }
        // Filters out by recommended recipes
        if ($request->recommended == "true") {
            $recipes = $recipes->where('is_recommended', 1);
        }
        // Filters out by recipes the user can make with their ingredients
        if ($request->available == "true" && auth('sanctum')->check()) {
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
        if ($request->shuffle == "true") {
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

        if (isset($data['image'])) {
            $image = $request->file('image');
            $input['file'] = time() . '.' . $image->getClientOriginalExtension();

            $destinationPath = public_path('storage/images');
            $imgFile = Image::make($image->getRealPath());
            $imgFile->orientate()->resize(720, 720, function ($constraint) {
                $constraint->aspectRatio();
            })->save($destinationPath . '/' . $input['file']);
            $data['image'] = 'images/' . $input['file'];
        }

        // Create the recipe
        try {
            $recipe = Recipe::create($data);
        } catch (Throwable $e) {
            if (isset($data['image'])) {
                Storage::disk('public')->delete($data['image']);
            }
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
            $request->validate([
                'name' => 'required|min:3|max:32|unique:recipes,name,' . $request->id,
                'instructions' => 'required'
            ]);
        } else {
            $request->validate([
                'name' => 'required|min:3|max:32|unique:recipes,name',
                'instructions' => 'required'
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

        $recipe = new RecipeResource($recipe);

        if (auth('sanctum')->check()) {
            $isSaved = SavedRecipe::where('recipe_id', $recipe->id)->where('user_id', auth('sanctum')->id())->exists();
            return response(compact(['recipe', 'ingredients', 'isSaved']), 200);
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
            'image' => 'nullable|image|mimes:jpg,png,jpeg,webp'
        ]);

        if ($recipe->user_id != Auth::id()) {
            return response(['error' => 'Unauthorised to modify this recipe.'], 401);
        }

        if (isset($data['image'])) {
            $imageToDelete = substr($recipe->image, strpos($recipe->image, 'storage/') + 8);
            if ($imageToDelete !== "images/defaultCocktail.jpg") {
                Storage::disk('public')->delete($imageToDelete);
            }

            $image = $request->file('image');
            $input['file'] = time() . '.' . $image->getClientOriginalExtension();

            $destinationPath = public_path('storage/images');
            $imgFile = Image::make($image->getRealPath());
            $imgFile->orientate()->resize(720, 720, function ($constraint) {
                $constraint->aspectRatio();
            })->save($destinationPath . '/' . $input['file']);
            $data['image'] = 'images/' . $input['file'];
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

        $imageToDelete = substr($recipe->image, strpos($recipe->image, 'storage/') + 8);
        if ($imageToDelete !== "images/defaultCocktail.jpg") {
            Storage::disk('public')->delete($imageToDelete);
        }

        $recipe->delete();
        return response("", 204);
    }
}
