import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./views/main/main.component";
import {ProductsComponent} from "./views/products/products/products.component";
import {OrderComponent} from "./views/order/order.component";
import {ProductComponent} from "./views/products/product/product.component";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'order', component: OrderComponent},
  {path: 'product/:id', component: ProductComponent},
  {path: '**', redirectTo: ''},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
