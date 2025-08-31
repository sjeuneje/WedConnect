<?php

namespace App\Models\Providers\Services;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ServiceOption extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'name',
        'description',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function rate(): HasOne
    {
        return $this->hasOne(OptionRate::class, 'option_id');
    }
}
