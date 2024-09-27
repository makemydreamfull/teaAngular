import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {GetProductsService} from "../../../shared/services/get-products.service";
import {Subscription, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsType} from "../../../../types/products.type";
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [':host{display: flex; justify-content: center; align-items: center; flex: 1 0 auto}'],
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  @Input() title: string;
  @Input() product: ProductsType | undefined;
  public products: ProductsType[] = []
  private subscription: Subscription | null = null
  public loading: boolean = true
  constructor(public productsData: GetProductsService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.title = '';
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: ''
    }
  }
  ngOnInit() {
    this.productsData.getProducts()
      .pipe(
        tap(() => {
        })
      )
      .subscribe({

        error: (error) => {
          alert('Ошибка на сервере! Пожалуйста обратитесь в поддержку.')
          this.router.navigate(['/'])
        },
        next: (data) => {
          this.products = data
          this.showElement()
        }
      })
  }

  showElement(){
    this.subscription = this.activatedRoute.url.subscribe(params => {
      this.product  = this.products.find(item => {return item.id === Number(params[1].path)})
      if(this.product){
        this.product = {
          id: this.product.id,
          image: this.product.image,
          title: this.product.title,
          price: this.product.price,
          description: this.product.description
        }
        this.loading = false

      }
      console.log(params)
    })
    console.log(this.products)
  }



}
