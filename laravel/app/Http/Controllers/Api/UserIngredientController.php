<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserIngredientRequest;
use App\Http\Resources\IngredientResource;
use App\Models\UserIngredient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserIngredientController extends Controller
{
    /**
     * Return the users ingredients TODO make this a user function
     */
    public function index()
    {
        $user = Auth::user();
        $ingredients = $user->ingredients;
        $ingredientsJSON = IngredientResource::collection($ingredients);

        return response($ingredientsJSON, 200);
    }

    /**
     * Store an added user ingredient
     */
    public function store(UserIngredientRequest $request)
    {
        $data = $request->validated();

        $userIngredient = UserIngredient::create($data);
        return response("", 201);
    }

    /**
     * Display the specified resource. TODO Probably not needed
     */
    public function show(UserIngredient $userIngredient)
    {
        //
    }

    /**
     * Update the specified resource in storage. TODO Probably not needed
     */
    public function update(Request $request, UserIngredient $userIngredient)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserIngredient $userIngredient)
    {
        $userIngredient->delete();

        return response("", 204);
    }
}
