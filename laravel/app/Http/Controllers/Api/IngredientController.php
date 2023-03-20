<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\IngredientRequest;
use App\Http\Resources\IngredientResource;
use App\Models\Ingredient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IngredientController extends Controller
{
    /**
     * Show all ingredients or a category of ingredients
     */
    public function index($category = "")
    {
        if ($category === "") {
            $ingredients = IngredientResource::collection(Ingredient::all());
        } else {
            $ingredients = IngredientResource::collection(Ingredient::where('category', $category)->get());
        }

        return response($ingredients, 200);
    }

    /**
     * Get category of ingredients marked with user ingredients
     */
    public function userIngredients($category = "")
    {
        $user = Auth::user();
        $userIngredients = $user->ingredients;
        $ingredients = IngredientResource::collection(Ingredient::where('category', $category)->get());

        foreach ($ingredients as $ingredient) {
            if ($userIngredients->contains('id', $ingredient->id)) {
                $ingredient->userHas = true;
            } else {
                $ingredient->userHas = false;
            }
        }

        return response($ingredients, 200);
    }

    /**
     * Store a newly created ingredient.
     */
    public function store(IngredientRequest $request)
    {
        $data = $request->validated();

        $ingredient = Ingredient::create($data);
        return response(new IngredientResource($ingredient), 201);
    }

    /**
     * Remove an ingredient.
     */
    public function destroy(Ingredient $ingredient)
    {
        $ingredient->delete();

        return response("", 204);
    }
}
