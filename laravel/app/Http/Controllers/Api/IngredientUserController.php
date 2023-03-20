<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\IngredientUserRequest;
use App\Http\Resources\IngredientResource;
use App\Models\Ingredient;
use App\Models\IngredientUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IngredientUserController extends Controller
{
    /**
     * Return the users ingredients
     */
    public function index()
    {
        $user = Auth::user();
        $orderCategories = ['Spirit', 'Liqueur', 'Alcohol', 'Mixer'];
        $ingredients = $user->ingredients->sortBy(function ($ingredient) use ($orderCategories) {
            return array_search($ingredient["category"], $orderCategories);
        });

        $ingredientsRes = IngredientResource::collection($ingredients);

        return response($ingredientsRes, 200);
    }

    /**
     * Store an added user ingredient
     */
    public function store(IngredientUserRequest $request)
    {
        $data = $request->validated();
        $exists = IngredientUser::where('user_id', $data['user_id'])->where('ingredient_id', $data['ingredient_id'])->exists();
        if ($exists) {
            return response(['ingredient' => 'You already have this ingredient'], 409);
        }

        $ingredientUser = IngredientUser::create($data);
        return response($ingredientUser, 201);
    }

    /**
     * Toggles the user ingredient
     */
    public function toggle($id)
    {
        // Find if the user has the ingredient
        $userId = Auth::id();
        $userIngredient = IngredientUser::where('user_id', $userId)->where('ingredient_id', $id);
        $userHas = $userIngredient->exists();

        if ($userHas) {
            // If ingredient, remove it
            $userIngredient->first()->delete();
            return response(['userHas' => false], 200);
        } else {
            // If no ingredient, add it
            IngredientUser::create([
                'user_id' => $userId,
                'ingredient_id' => $id
            ]);
            return response(['userHas' => true], 200);
        }

        return response(['error' => 'Something went wrong'], 500);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = Auth::user();
        $userIngredient = IngredientUser::where('user_id', $user->id)->where('ingredient_id', $id)->first();

        $userIngredient->delete();

        return response('', 204);
    }
}
