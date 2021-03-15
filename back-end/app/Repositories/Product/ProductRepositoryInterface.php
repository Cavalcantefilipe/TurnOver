<?php

namespace App\Repositories\Product;

use Illuminate\Database\Eloquent\Model;

interface ProductRepositoryInterface
{
    public function get();
    public function getById(int $id);
    public function create(array $data);
    public function update(Model $product,array $dados);
    public function delete(Model $product);
}
