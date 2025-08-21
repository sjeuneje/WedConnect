<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $countries = [
          [
              'value' => 'be',
              'label' => 'Belgique'
          ]
        ];

        foreach ($countries as $country) {
            Country::query()
                ->updateOrCreate([
                    'value' => $country['value'],
                    'label' => $country['label']
                ]);
        }
    }
}
