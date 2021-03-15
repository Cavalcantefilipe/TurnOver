<?php

namespace App\Repositories\ProductDetail;

use App\Models\ProductDetail\ProductDetail;

class ProductDetailRepositoryEloquent implements ProductDetailRepositoryInterface
{
    private $model;

    public function __construct(ProductDetail $model)
    {
        $this->model = $model;
    }

    public function get()
    {
        return $this->model->orderBy('productId')->orderBy('inDate')->get();
    }

}
