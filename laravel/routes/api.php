<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\IngredientController;
use App\Http\Controllers\Api\IngredientUserController;
use App\Http\Controllers\Api\RecipeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function () {
        return Auth::user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);

    // Ingredients
    Route::get('/ingredients', [IngredientController::class, 'index']);
    Route::get('/ingredients/{category}', [IngredientController::class, 'index']);
    Route::get('/ingredients/user/{category}', [IngredientController::class, 'userIngredients']);

    // User Ingredients
    Route::get('/user-ingredients', [IngredientUserController::class, 'index']);
    Route::delete('/user-ingredients/{id}', [IngredientUserController::class, 'destroy']);
    Route::post('/user-ingredients', [IngredientUserController::class, 'store']);
    Route::put('/user-ingredients/toggle/{id}', [IngredientUserController::class, 'toggle']);

    //Recipes
    Route::post('/recipes', [RecipeController::class, 'store']);
    Route::put('/recipes/{recipe}', [RecipeController::class, 'update']);
    Route::delete('/recipes/{recipe}', [RecipeController::class, 'destroy']);
});

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');

// Recipes
Route::get('/recipes', [RecipeController::class, 'index']);
Route::get('/recipes/saved', [RecipeController::class, 'savedRecipes']);
Route::get('/recipes/recommended', [RecipeController::class, 'recommendedRecipes']);
Route::get('/recipes/my-bar', [RecipeController::class, 'myBarRecipes']);
Route::get('/recipes/{recipe}', [RecipeController::class, 'show']);
