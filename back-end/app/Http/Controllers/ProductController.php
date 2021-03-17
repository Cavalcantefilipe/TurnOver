<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Product\ProductService;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;


class ProductController extends Controller
{
    private $service;

    public function __construct(ProductService $service)
    {
        $this->service = $service;
    }

    public function get()
    {
        return $this->service->get();
    }

    public function getById(int $id)
    {
        try {
            return $this->service->getById($id);
        } catch (\Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function create(Request $request)
    {
        $valid = Validator::make(
            $request->all(),
            [
                'name' => 'required|string|max:200',
                'quantity' => 'required|integer|min:0',
                'price' => 'required|numeric|min:0'
            ]
        );

        if ($valid->fails()) {
            return response()->json($valid->errors(), Response::HTTP_BAD_REQUEST);
        }
        try {
            return $this->service->create(
                $request->all()
            );
        } catch (\Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }

    }

    public function createMany(Request $request)
    {
        $valid = Validator::make(
            $request->all(),
            [
                'products' => 'present|array',
                'products.*.name' => 'required|string|max:200',
                'products.*.quantity' => 'required|integer|min:0',
                'products.*.price' => 'required|numeric|min:0'
            ]
        );

        if ($valid->fails()) {
            return response()->json($valid->errors(), Response::HTTP_BAD_REQUEST);
        }
        try {
            return $this->service->createMany(
                $request->all()
            );
        } catch (\Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }

    }

    public function update(int $id, Request $request)
    {
        $valid = Validator::make(
            $request->all(),
            [
                'name' => 'required|string|max:200',
                'quantity' => 'required|integer|min:0',
                'price' => 'required|numeric|min:0'
            ]
        );

        if ($valid->fails()) {
            return response()->json($valid->errors(), Response::HTTP_BAD_REQUEST);
        }

        try {
            return $this->service->update(
                $id,
                $request->all()
            );
        } catch (\Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function updateMany(Request $request)
    {
        $valid = Validator::make(
            $request->all(),
            [
                'products' => 'required|array',
                'products.*.id' => 'required|integer|exists:products,id',
                'products.*.name' => 'required|string|max:200',
                'products.*.quantity' => 'required|integer|min:0',
                'products.*.price' => 'required|numeric|min:0'
            ]
        );

        if ($valid->fails()) {
            return response()->json($valid->errors(), Response::HTTP_BAD_REQUEST);
        }
        try {
            return $this->service->updateMany(
                $request->all()
            );
        } catch (\Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }

    }

    public function delete(int $id)
    {
        try {
            return $this->service->delete($id);
        } catch (\Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}
