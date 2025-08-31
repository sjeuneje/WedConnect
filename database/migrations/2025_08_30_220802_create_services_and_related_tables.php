<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('provider_id')->constrained('providers')->cascadeOnDelete();
            $table->uuid('uuid')->unique();
            $table->string('name');
            $table->text('description');
            $table->timestamps();
        });

        Schema::create('service_rates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained('services')->cascadeOnDelete();
            $table->decimal('amount', 8, 2);
            $table->enum('billing_unit', ['hour', 'half_day', 'day', 'week', 'package', 'custom']);
            $table->string('custom_label')->nullable();
            $table->timestamps();
        });

        Schema::create('service_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained('services')->cascadeOnDelete();
            $table->string('name');
            $table->text('description');
            $table->timestamps();
        });

        Schema::create('option_rates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('option_id')->constrained('service_options')->cascadeOnDelete();
            $table->decimal('amount', 8, 2);
            $table->enum('billing_unit', ['hour', 'half_day', 'day', 'week', 'package', 'custom']);
            $table->string('custom_label')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('option_rates');
        Schema::dropIfExists('service_options');
        Schema::dropIfExists('service_rates');
        Schema::dropIfExists('services');
    }
};
