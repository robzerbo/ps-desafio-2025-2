<?php

namespace App\Http\Controllers;

use App\Models\Character;
use App\Http\Requests\StoreCharacterRequest;
use App\Http\Requests\UpdateCharacterRequest;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class CharacterController extends Controller
{
    protected $character;

    public function __construct(Character $character)
    {
        $this->character = $character;
    }
    
    
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $characters = $this->character->with('characterClass')->get();

        return Response()->json($characters, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCharacterRequest $request):JsonResponse
    {
        $data = $request->validated();

        if($request->hasFile('image')){
            $path = $request->file('image')->store('characters', 'public');
            $data['image'] = url('storage/' . $path);
        }

        $character = $this->character->create($data);

        $id = $character->id;
        $character_character_class = $this->character->with('characterClass')->findOrFail($id);

        return response()->json($character_character_class, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id):JsonResponse
    {
        $character = $this->character->with('characterClass')->findOrFail($id);

        return response()->json($character, Response::HTTP_OK);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCharacterRequest $request, $id):JsonResponse
    {
        $character = $this->character->with('characterClass')->findOrFail($id);

        $data = $request->validated();

        if($request->hasFile('image')){
            try {
                $image_name = explode('characters/', $character['image']);
                Storage::disk('public')->delete('characters/' .$image_name[1]);
            } catch (Throwable){    
            } finally{
                $path = $request->file('image')->store('characters', 'public');
                $data['image'] = url('storage/' .$path);
            }
        }

        $character->update($data);

        return response()->json($character, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $character = $this->character->findOrFail($id);

        $character->delete();

        return response()->json(['message' =>'Personagem deletado com sucesso']);
    }
}