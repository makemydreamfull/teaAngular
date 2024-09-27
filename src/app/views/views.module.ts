import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import {MainComponent} from "./main/main.component";
import {ProductsComponent} from "./products/products/products.component";
import {OrderComponent} from "./order/order.component";
import {ProductComponent} from "./products/product/product.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    MainComponent,
    ProductsComponent,
    OrderComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ViewsModule { }
