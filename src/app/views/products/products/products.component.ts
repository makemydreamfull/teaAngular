import {Component, Input, OnInit} from '@angular/core';
import {GetProductsService} from "../../../shared/services/get-products.service";
import {ProductsType} from "../../../../types/products.type";
import {tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() product!: ProductsType;
  public products: ProductsType[] = []
  public element!: ProductsType
  public loading: boolean = true
  constructor(public productsData: GetProductsService, private router: Router) {
  }

  ngOnInit() {
    this.productsData.getProducts()
      .pipe(
        tap(() => {
          this.loading = false
        })
      )
      .subscribe({
        error: (error) => {
          alert('Ошибка на сервере! Пожалуйста обратитесь в поддержку.')
          this.router.navigate(['/'])
        },
        next: (data) => {
          this.products = data
        }
      })

  }

}
