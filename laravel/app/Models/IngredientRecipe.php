<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IngredientRecipe extends Model
{
    use HasFactory;

    protected $table = "ingredient_recipe";

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'ingredient_id',
        'recipe_id',
        'amount',
        'measurement'
    ];

    public function ingredient()
    {
        return $this->hasOne(Ingredient::class);
    }
}
