<?php

namespace App\Models\Providers\Services;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OptionRate extends Model
{
    use HasFactory;

    protected $fillable = [
        'option_id',
        'amount',
        'billing_unit',
        'custom_label',
    ];

    public function option(): BelongsTo
    {
        return $this->belongsTo(ServiceOption::class, 'option_id');
    }
}
