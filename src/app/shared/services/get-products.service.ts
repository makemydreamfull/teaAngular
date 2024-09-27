import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductsType} from "../../../types/products.type";
import {ProductOrder} from "../../../types/productOrder";

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {

  constructor(private http: HttpClient) { }
  getProducts(): Observable<ProductsType[]>{
    return this.http.get<ProductsType[]>('https://testologia.ru/tea')
  }
  postOrder(data: ProductOrder): Observable<{ success: boolean, message?: string }>{
    return this.http.post<{ success: boolean, message?: string }>('https://testologia.ru/order-tea', data)
  }
}
