<?php

namespace App\Http\Responses;

use Illuminate\Contracts\Support\Responsable;

class TodoFailToDelete implements Responsable
{
    public function __construct(protected $todo)
    {
    }

    public function toResponse($request)
    {
        return response()->json([
            'message' => 'Failed to delete todo with id ' . $this->todo->id,
        ]);
    }
}
