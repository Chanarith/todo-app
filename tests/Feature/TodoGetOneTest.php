<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TodoGetOneTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_returns_a_todo_by_id(): void
    {
        $response = $this->get('api/todos/1');

        $response
            ->assertStatus(200)
            ->assertJson([
                'id' => 1,
            ])
            ->assertJsonStructure([
                'id',
                'title',
                'created_at',
                'updated_at',
            ]);
    }
}
