import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {map, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {GetProductsService} from "../../shared/services/get-products.service";


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [':host {flex: 1 0 auto}'],
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  @Input() title: string;
  private subscription: Subscription | null = null
  public requestData: boolean = false
  public requestMessage: string = ''
  public formValues = {
    name: '',
    last_name: '',
    phone: '',
    country: '',
    zip: '',
    product: '',
    address: '',
    comment: '',

  }
  postInForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[А-Я][а-я]+\\s*')]],
    lastName: ['', [Validators.required, Validators.pattern('^[А-Я][а-я]+\\s*')]],
    phone: ['', [Validators.required, Validators.pattern('^\\+|[0-9]{1}?[0-9]{10}')]],
    country: ['', [Validators.required, Validators.pattern('^[А-ЯA-Z][А-яа-яA-Za-z ]+$')]],
    zip: ['', [Validators.required, Validators.pattern('[0-9]{3,4}')]],
    product: [{value: '', disabled: true}],
    address: ['', [Validators.required, Validators.pattern('^[#.0-9a-zA-Zа-яА-Я\\s,-]+$')]],
    comment: [''],
  })

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder, private productData: GetProductsService) {
    this.title = '';
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['title']) {
        this.postInForm.patchValue({
          product: params['title']
        })
        // this.formValues.product = params['title']
      }
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

  get name() {
    return this.postInForm.get('name')
  }

  get lastName() {
    return this.postInForm.get('lastName')
  }

  get phone() {
    return this.postInForm.get('phone')
  }

  get country() {
    return this.postInForm.get('country')
  }

  get zip() {
    return this.postInForm.get('zip')
  }

  get product() {
    return this.postInForm.get('product')
  }

  get address() {
    return this.postInForm.get('address')
  }

  get comment() {
    return this.postInForm.get('comment')
  }

  postForm() {
    console.log(this.postInForm)
    this.productData.postOrder({
      name: this.name?.value as string,
      last_name: this.lastName?.value as string,
      phone: this.phone?.value as string,
      country: this.country?.value as string,
      zip: Number(this.zip?.value) as number,
      product: this.product?.value as string,
      address: this.address?.value as string,
      comment: this.comment?.value as string
    })
      .subscribe((response ) => {

        if(response.success){
          this.requestData = true
          setTimeout(() => {
            this.router.navigate(['/products'])
          },4000)
        } else{
          this.requestData = false
          if(response.message){
            this.requestMessage = response.message
          }
        }
      })
    this.postInForm.reset()

  }
}
