import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [':host{display: flex; flex-direction: column; height: 100%;}'],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ngOnInit(){
  }
}
