<?php

namespace App\Models\Providers\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServicePhoto extends Model
{
    protected $fillable = [
        'service_id',
        'path',
        'position'
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
