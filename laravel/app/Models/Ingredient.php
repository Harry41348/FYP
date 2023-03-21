<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Auth;

class Ingredient extends Model
{
    use HasFactory;

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'category',
        'userHas'
    ];

    /**
     * Default attributes.
     * 
     * @var array<string, string>
     */
    protected $attributes = [
        'category' => 'Spirit',
    ];

    public function users()
    {
        return $this->BelongsToMany(User::class);
    }
}
