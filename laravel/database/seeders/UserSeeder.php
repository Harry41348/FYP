<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'first_name' => 'Harry',
            'last_name' => 'Wijnschenk',
            'email' => 'harry@email.com',
            'is_admin' => true,
        ]);

        User::factory()->count(20)->create();
    }
}
