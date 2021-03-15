<?php

namespace App\Services\ProductDetail;

use Illuminate\Database\QueryException;
use App\Repositories\ProductDetail\ProductDetailRepositoryInterface as ProductDetail;

class ProductDetailService
{

    private $service;

    public function __construct(ProductDetail $service)
    {
        $this->service = $service;
    }

    public function get()
    {
        try {
            return $this->service->get();
        } catch (QueryException $e) {
            return ['error' => $e->getMessage()];
        }
    }

}
