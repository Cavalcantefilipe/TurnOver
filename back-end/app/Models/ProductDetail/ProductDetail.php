<?php

namespace App\Models\ProductDetail;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductDetail extends Model
{
    use SoftDeletes;

    protected $table = 'productDetails';

    protected $fillable = [
        'productId',
        'quantity',
        'inDate'
    ];

}
