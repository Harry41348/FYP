<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IngredientUser extends Model
{
    use HasFactory;

    protected $table = "ingredient_user";

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'ingredient_id',
        'user_id',
    ];
}
