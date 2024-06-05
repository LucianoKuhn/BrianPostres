import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/sesiones/login/login.component';
import { RegisterComponent } from './components/sesiones/register/register.component';
import { MenuPostresComponent } from './components/menu-postres/menu-postres.component';
import { ControlPostresComponent } from './components/menu-postres/control-postres/control-postres.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: MenuPostresComponent },
  { path: 'ingresar', component: LoginComponent },
  { path: 'registrar', component: RegisterComponent },
  { path: 'administrador', component: ControlPostresComponent, canActivate: [authGuard] },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
