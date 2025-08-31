<?php

namespace App\Models\Providers\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Provider;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'provider_id',
        'uuid',
        'name',
        'description',
    ];

    public function provider(): BelongsTo
    {
        return $this->belongsTo(Provider::class);
    }

    public function rates(): HasMany
    {
        return $this->hasMany(ServiceRate::class);
    }

    public function options(): HasMany
    {
        return $this->hasMany(ServiceOption::class);
    }

    public static function getProviderServices(int $providerId): Collection
    {
        return self::query()
            ->where('provider_id', $providerId)
            ->with([
                'rates',
                'options.rate'
            ])
            ->get();
    }
}
