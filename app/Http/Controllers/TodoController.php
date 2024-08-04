<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateTodoRequest;
use App\Models\Todo;
use Illuminate\Support\Facades\App;
//
use App\Http\Requests\CreateTodoRequest;
use App\Http\Responses\TodoDeleteSuccessFulResponse;
use App\Http\Responses\TodoFailToDelete;
use App\Http\Responses\TodoUpdateSuccessfulResponse;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function listAll(Request $request)
    {
        $todos = Todo::when($request->has('search'), function () {
            return Todo::where('title', 'like', '%' . request('search') . '%');
        })->get();

        return response()->json(
            $todos,
        );
    }

    public function getOne($id)
    {
        $todo = Todo::findOrFail($id);

        return response()->json($todo);
    }

    public function update($id, UpdateTodoRequest $request)
    {
        $todo = Todo::findOrFail($id);

        if (
            $todo->update([
                'title' => $request->validated('title'),
            ])
        ) {
            return App::make(TodoUpdateSuccessfulResponse::class, ["todo" => $todo]);
        }

        return response()->json([
            'message' => 'Failed to update todo',
        ]);
    }

    public function delete($id)
    {
        $todo = Todo::findOrFail($id);

        if ($todo->delete()) {
            return App::make(TodoDeleteSuccessFulResponse::class, ["todo" => $todo]);
        }

        return App::make(TodoFailToDelete::class, [$todo]);
    }

    public function create(CreateTodoRequest $request)
    {
        $createdTodo = Todo::create([
            'title' => $request->validated('title'),
        ]);

        return response()->json($createdTodo);
    }
}
