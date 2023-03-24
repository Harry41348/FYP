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
        'is_recommended'
    ];

    public function ingredients()
    {
        return $this->hasMany(IngredientRecipe::class);
    }
}
