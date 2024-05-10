import { Component } from '@angular/core';
import { DataService } from './services/data.service';

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
