<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'instructions',
        'user_id',
        'image',
        'is_recommended'
    ];

    protected $attributes = [
        'image' => null,
        'is_recommended' => false,
    ];

    public function ingredients()
    {
        return $this->hasMany(IngredientRecipe::class);
    }
}
