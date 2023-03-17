<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

class UserTest extends TestCase
{
    // Test login
    public function test_login()
    {
        // Create a user
        $user = User::factory()->create();

        // Send a login request with the credentials
        $response = $this->post('/api/login', [
            'email' => $user->email,
            'password' => 'P@ssword123'
        ]);

        // Assert the expected results
        $response->assertStatus(200);
        $response->assertSee($response['token']);
        $response->assertSee($response['user']);
        $this->assertAuthenticatedAs($user);
    }

    // Test invalid credentials login
    public function test_login_invalid_credentials()
    {
        // Create a user
        $user = User::factory()->create();

        // Send a login request with the incorrect credentials
        $response = $this->post('/api/login', [
            'email' => $user->email,
            'password' => 'P@ssword'
        ]);

        // Assert the expected results
        $response->assertStatus(401);
        self::assertTrue($response['message'] == 'Provided email address or password is incorrect.');
        $this->assertGuest();
    }

    // Test logout
    public function test_logout()
    {
        // Act as the new user
        Sanctum::actingAs(
            User::factory()->create()
        );

        // Send a logout request
        $response = $this->post('/api/logout');

        // Assert the expected results
        $response->assertStatus(204);
    }

    // Test register
    public function test_register()
    {
        // Payload for new user
        $payload = [
            'first_name' => 'Harry',
            'last_name' => 'Wijnschenk',
            'email' => 'harry@email.com',
            'password' => 'P@ssword123',
            'password_confirmation' => 'P@ssword123',
        ];

        // Send a register request
        $response = $this->post('/api/register', $payload);

        // Assert the expected result
        $response->assertStatus(201);
        $this->assertDatabaseHas('users', [
            'email' => $payload['email']
        ]);
    }

    // Test empty register
    public function test_empty_register()
    {
        // Payload for new user
        $payload = [
            'first_name' => '',
            'last_name' => '',
            'email' => '',
            'password' => '',
            'password_confirmation' => '',
        ];

        // Send a register request
        $response = $this->post('/api/register', $payload);

        // Assert the expected result
        $response->assertStatus(302);
        $this->assertDatabaseMissing('users', [
            'email' => $payload['email']
        ]);
    }
}
