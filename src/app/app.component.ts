import { Component } from '@angular/core';


interface postresInterface{
  nombre: string;
  porcion:number;
  precio:number;
  visible:boolean;
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'BrianPostresApp';
 
}
