<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CharacterClass extends Model
{
    /** @use HasFactory<\Database\Factories\CharacterClassFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
    ];

    public function characters():HasMany
    {
        return $this->hasMany(Character::class, 'character_class_id', 'id');
    }
}