import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  public loadingPopup: boolean = false
  private observable!: Observable<boolean>
  constructor() {
  }
  ngOnInit() {
    this.observable = new Observable<boolean>((observer) => {
      const setTime = setTimeout(() => {
        console.log(observer)
        this.loadingPopup = true
      },10000)
      return {
        unsubscribe() {
          clearTimeout(setTime)
        }
      }
    })
    this.observable.subscribe()
  }

}
