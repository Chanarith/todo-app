<?php

namespace Tests\Feature;

use App\Models\Todo;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TodoCreateTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_list_todos(): void
    {
        $response = $this->get('/api/todos');

        $response
            ->assertStatus(200)
            ->assertJson(
                Todo::all()->toArray(),
            );
    }
}
