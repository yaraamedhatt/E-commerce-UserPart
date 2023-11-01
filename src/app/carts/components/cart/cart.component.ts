import { Component , OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts:any[]=[]
  total:any
  success:boolean=false
  constructor(private service:CartsService){}
  ngOnInit(): void {
    this.getCartProducts()
  }
  getCartProducts(){
    if("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
  }
  this.getTotalPrice()
}
getTotalPrice(){
  this.total=0
  for(let x in this.cartProducts){
    this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity
  }
}
minusAmount(index:number){
  this.cartProducts[index].quantity--
  this.getTotalPrice()
  localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
}
addAmount(index:number){
  this.cartProducts[index].quantity++
  this.getTotalPrice()
  localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
}
detectChange(){
  localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
}
deleteProduct(index:number){
  this.cartProducts.splice(index,1)
  this.getTotalPrice()
  localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
}
clearCart(){
  this.cartProducts=[]
  this.getTotalPrice()
  localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
}
addToCart(){
  let products=this.cartProducts.map(res => {
    return {productId:res.item.id, quantity:res.quantity}
  })
  let Model={
    userId:5,
    date:new Date(),
    products:products
  }
  this.service.createNewCart(Model).subscribe(res => {
    this.success=true;
  })
}
}
