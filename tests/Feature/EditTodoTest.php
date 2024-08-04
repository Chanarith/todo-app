<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EditTodoTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_edit_todo(): void
    {
        $response = $this->put('/api/todos/1', [
            'title' => 'New Todo',
        ]);

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => 1,
                    'title' => 'New Todo',
                ],
            ])
            ->assertJsonStructure([
                'message',
                'data' => [
                    'id',
                    'title',
                    'created_at',
                    'updated_at',
                ],
            ]);
    }
}
