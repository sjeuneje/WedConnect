<?php

namespace App\Models\Providers\Services;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceRate extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'amount',
        'billing_unit',
        'custom_label',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
