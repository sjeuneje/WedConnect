<?php

namespace App\Models\Couples\Providers;

use Illuminate\Database\Eloquent\Model;

class CoupleProviderFavorite extends Model
{
    protected $table = 'couples_providers_favorite';

    protected $fillable = [
      'couple_id',
      'provider_id'
    ];
}
