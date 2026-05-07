<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Url extends Model
{
    use SoftDeletes;

    protected $table = "urls";

    protected $fillable = [
        'user_id',
        'original_url',
        'short_code',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
