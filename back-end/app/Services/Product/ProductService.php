<?php

namespace App\Services\Product;

use App\Models\ProductDetail\ProductDetail;
use Illuminate\Database\QueryException;
use App\Repositories\Product\ProductRepositoryInterface as Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class ProductService
{

    private $service;

    public function __construct(Product $service)
    {
        $this->service = $service;
        $this->productDetail = new ProductDetail();
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

    public function create(array $data)
    {
        try {
            DB::beginTransaction();

            $product = $this->service->create($data);

            $dataProductDetail = [
                "inDate" => date("Y-m-d H:i:s"),
                "productId" => $product->id,
                "quantity" => $product->quantity
            ];

            $this->productDetail->create($dataProductDetail);

            DB::commit();

            return $product;

        } catch (QueryException $e) {
            DB::rollBack();

            return ['error' => $e->getMessage()];
        }
    }

    public function createMany(array $datas)
    {
        try {
            DB::beginTransaction();

            $products = new Collection();

            foreach($datas['products'] as $data){

                $product = $this->service->create($data);

                $dataProductDetail = [
                    "inDate" => date("Y-m-d H:i:s"),
                    "productId" => $product->id,
                    "quantity" => $product->quantity
                ];

                $this->productDetail->create($dataProductDetail);

                $products->push($product);
            }

            DB::commit();

            return $products;

        } catch (QueryException $e) {
            DB::rollBack();
            return ['error' => $e->getMessage()];
        }
    }

    public function update(int $id, array $data)
    {
        try {

            DB::beginTransaction();

            $product = $this->service->getById($id);

            if($product){

                $dataProductDetail = [
                    "inDate" => date("Y-m-d H:i:s"),
                    "productId" => $product->id,
                    "quantity" => $data['quantity']
                ];

                $this->productDetail->create($dataProductDetail);

                $productUpdated = $this->service->update($product, $data);

                DB::commit();

                return $productUpdated;
            }

            DB::rollBack();

            throw new \Exception('Product not Found');

        } catch (QueryException $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function updateMany(array $data)
    {
        try {

            $products = new Collection();

            DB::beginTransaction();

            foreach($data['products'] as $productData){

                $product = $this->service->getById($productData['id']);

                if($product){

                    $dataProductDetail = [
                        "inDate" => date("Y-m-d H:i:s"),
                        "productId" => $product->id,
                        "quantity" => $productData['quantity']
                    ];

                    $this->productDetail->create($dataProductDetail);

                    $products->push($this->service->update($product, $productData));
                }
            }

            if(count($data['products']) == count($products)){

                DB::commit();

                return $products;

            }

            DB::rollBack();

            throw new \Exception('Products Update error');

        } catch (QueryException $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function delete(int $id)
    {
        $product = $this->service->getById($id);

        if($product){

            DB::beginTransaction();

            $productDetails = $this->productDetail->where('productId', $id)->get();

            foreach($productDetails as $productDetailNow){
                $productDetailNow->delete();
            }

            DB::commit();

            return $this->service->delete($product);
        }

        DB::rollBack();
        throw new \Exception('Product not Found');
    }
}
