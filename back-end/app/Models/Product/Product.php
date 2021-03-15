<?php

namespace App\Models\Product;

use App\Models\ProductDetail\ProductDetail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $table = 'products';

    protected $fillable = [
        'name',
        'quantity',
        'price'
    ];

    protected $with = ['productDetail'];

    public function productDetail(){
        return $this->hasMany(ProductDetail::class, 'productId')->orderBy('inDate');
    }

}
