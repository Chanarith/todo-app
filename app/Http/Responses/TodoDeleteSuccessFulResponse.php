<?php

namespace App\Http\Responses;

use App\Models\Todo;
use Illuminate\Contracts\Support\Responsable;

class TodoDeleteSuccessFulResponse implements Responsable
{
    public function __construct(protected Todo $todo)
    {
    }

    public function toResponse($request)
    {
        return response()->json([
            'message' => 'Todo deleted successfully',
            'data' => $this->todo,
        ]);
    }
}
