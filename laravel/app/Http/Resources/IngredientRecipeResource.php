<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IngredientRecipeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'ingredient_id' => $this->ingredient_id,
            'name' => $this->name,
            'amount' => $this->amount,
            'measurement' => $this->measurement
        ];
    }
}
