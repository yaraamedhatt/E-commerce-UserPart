import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { OnInit } from '@angular/core';
import { __values } from 'tslib';
import { Product } from '../../models/product';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  products:Product[]=[]
  categories:string[]=[]
  loading :boolean=false
  cartProducts:any[]=[]
  constructor(private service:ProductsService){}
  ngOnInit():void{
    this.getProducts()
    this.getCategories()
  }
  getProducts(){
    this.loading=true
    this.service.getAllProducts().subscribe((res:any)=>{
      this.products=res
      this.loading=false
    }, error =>{
      console.log(error.message)
      this.loading=false
    } )
  }
  getCategories(){
    this.loading=true
    this.service.getAllcategories().subscribe((res:any)=>{
      this.categories=res
      this.loading=false
    }, error =>{
      console.log(error.message)
      this.loading=false
    } )
   
  }
  filterCategories(event:any){
    let value = event.target.value
    value=="all"? this.getProducts():this.getProductsCategory(value)
  }
  getProductsCategory(keyword:string){
    this.loading=true
    this,this.service.getProductByCategory(keyword).subscribe((res:any)=>{
      this.products=res
      this.loading=false
    })
  }
  addToCart(event:any) {
    if("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
      //console.log(this.cartProducts)
      let exist = this.cartProducts.find((item) => item.item.id == event.item.id)
      if(exist) {
        alert("Product is already in your cart")
      }else {
        this.cartProducts.push(event)
        localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
      }
    } else {
      this.cartProducts.push(event)
      localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
    }
  }

}
