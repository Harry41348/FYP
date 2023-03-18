<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\IngredientRequest;
use App\Http\Resources\IngredientResource;
use App\Models\Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    /**
     * Show all ingredients
     */
    public function index()
    {
        return IngredientResource::collection(Ingredient::all());
        // return IngredientResource::collection(Ingredient::all()->orderBy('category', 'asc')); TODO order by
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
     * Return a specific ingredient. TODO Needed?
     */
    public function show(Ingredient $ingredient)
    {
        //
    }

    /**
     * Update the specified resource in storage. TODO Needed?
     */
    public function update(IngredientRequest $request, Ingredient $ingredient)
    {
        //
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
