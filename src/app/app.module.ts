import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MenuPostresComponent } from '../app/components/menu-postres/menu-postres.component';
import { FooterComponent } from '../app/components/footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideStorage, getStorage, StorageModule } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { LoginComponent } from './components/sesiones/login/login.component';
import { RegisterComponent } from './components/sesiones/register/register.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { ControlPostresComponent } from './components/menu-postres/control-postres/control-postres.component';
import { AgregarPostreComponent } from './components/menu-postres/control-postres/agregar-postre/agregar-postre/agregar-postre.component';
import { EditarPostreComponent } from './components/menu-postres/control-postres/editar-postre/editar-postre.component';


@NgModule({
  declarations: [AppComponent,FooterComponent, MenuPostresComponent, LoginComponent, RegisterComponent, ControlPostresComponent, AgregarPostreComponent, EditarPostreComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StorageModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
