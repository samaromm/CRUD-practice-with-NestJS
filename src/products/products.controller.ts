import { ProductsService } from './products.service';
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  // add new product
  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ){
    const generatedId = this.productService.insertProduct(prodTitle,prodDesc,prodPrice);
    return {id: generatedId}
  }

  // get all products
  @Get()
  getAllProducts(){
    return this.productService.getProducts()
  }

  // get specific product
  @Get(':id')
  getProduct(@Param('id') prodId: string){
    return this.productService.getSingleProduct(prodId)
  }

  // update existing product
  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ){
    this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice)
    return 'edited succefully'
  }

  // delete an existing product
  @Delete(':id')
  deleteProduct(@Param('id') prodId: string){
    this.productService.deleteProduct(prodId)
    return 'deleted succefully'
  }

}
