import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataService } from './services/data.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/sesiones/login/login.component';
import { RegisterComponent } from './components/sesiones/register/register.component';
import { MenuPostresComponent } from './components/menu-postres/menu-postres.component';

const routes: Routes = [
  { path: '', component: MenuPostresComponent },
  { path: 'ingresar', component: LoginComponent},
  { path: 'registrar', component: RegisterComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  postres: any ={};
  nombre:string = "";
  precio:string = "";
  porcion:string = "";
  categoria:string = "";
  img:string = "";
  


  constructor(private readonly dataService: DataService) {
    this.getPostres();
  }
  async getPostres() {
    this.dataService
      .getPostres()
      .then((postres: any) => {
        this.postres = postres;
        console.log(postres);
      })
      .catch((error: any) => console.log(error));
  }
  agregarPostre(nombre: string, precio: string, porcion: string, img:string, categoria:string) {
    this.dataService.crerPostre(nombre, precio, porcion,img,categoria);
  }
 }
