<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ProductDetails extends Migration
{
    public function up()
    {
        Schema::create('productDetails', function (Blueprint $table) {
            $table->id();
            $table->integer('productId');
            $table->integer('quantity');
            $table->datetime('inDate');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('productId')->references('id')->on('products')->onDelete('cascade');;
        });
    }

    public function down()
    {
        Schema::dropIfExists('productDetails');
    }
}
