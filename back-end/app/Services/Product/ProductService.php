<?php

namespace App\Services\Product;

use Illuminate\Database\QueryException;
use App\Repositories\Product\ProductRepositoryInterface as Product;

class ProductService
{

    private $service;

    public function __construct(Product $service)
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

    public function getById(int $id)
    {
        try {
            return $this->service->getById($id);
        } catch (QueryException $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function create(array $dados)
    {
        try {
            return $this->service->create($dados);
        } catch (QueryException $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function update(int $id, array $dados)
    {
        try {

            $product = $this->service->getById($id);

            if($product){
                return $this->service->update($product, $dados);
            }

            throw new \Exception('Product not Found');

        } catch (QueryException $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function delete(int $id)
    {
         $product = $this->service->getById($id);

         if($product){
            return $this->service->delete($product);
         }
        
         throw new \Exception('Product not Found');
    }
}