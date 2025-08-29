<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Provider extends Model
{
    protected $fillable = [
        'user_id',
        'company_name',
        'logo',
        'city',
        'zipcode',
        'description',
        'facebook_url',
        'instagram_url',
        'website_url',
        'trial_end_at',
        'is_published',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
