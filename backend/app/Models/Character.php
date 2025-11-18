<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Character extends Model
{
    /** @use HasFactory<\Database\Factories\CharacterFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'image',
        'acquired',
        'description',
        'powers',
        'character_class_id'
    ];

    public function characterClass():BelongsTo
    {
        return $this->belongsTo(CharacterClass::class, 'character_class_id', 'id');
    }
}