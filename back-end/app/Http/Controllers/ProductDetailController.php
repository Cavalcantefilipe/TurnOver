<?php

namespace App\Http\Controllers;

use App\Services\ProductDetail\ProductDetailService;


class ProductDetailController extends Controller
{
    private $service;

    public function __construct(ProductDetailService $service)
    {
        $this->service = $service;
    }

    public function get()
    {
        return $this->service->get();
    }

}
