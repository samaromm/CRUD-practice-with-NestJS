import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  // add new product
  insertProduct(title: String, desc: String, price: number) {
    const prodId = uuidv4();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  // find product, used by get single product, update, delete
  private findProduct(productid: String): [Product, number]{
    const productIndex = this.products.findIndex(prod => prod.id === productid);
    const product = this.products[productIndex]
    if (!product) {
      throw new NotFoundException('product cannot be found');
    }
    return [product, productIndex];
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(productid: String) {
    const product = this.findProduct(productid)[0]
    return { ...product };
  }

  // edit product
  updateProduct(productid: String, title: String, desc: String, price: number) {
    const [product, index] = this.findProduct(productid)
    const updateProduct= {...product}
    if(title){
        updateProduct.title=title
    }
    if(desc){
        updateProduct.description=desc
    }
    if(price){
        updateProduct.price=price
    }
    this.products[index] =updateProduct   
  }

  deleteProduct(productid: String) {
    const index = this.findProduct(productid)[1]
    this.products.splice(index, 1)
  }
}
