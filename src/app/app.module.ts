import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { MenuPostresComponent } from './menu-postres/menu-postres.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuPostresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp({"projectId":"brianpostres-c0040","appId":"1:585290165948:web:8886a8319d35bbdf05eab9","storageBucket":"brianpostres-c0040.appspot.com","apiKey":"AIzaSyCwgYP8U2jvc_8TLRUVZYf4z_gzHNBu2v8","authDomain":"brianpostres-c0040.firebaseapp.com","messagingSenderId":"585290165948","measurementId":"G-KJL7NBV809"})),
    provideAuth(() => getAuth()),
   
    provideStorage(() => getStorage()),
    FormsModule,
    NgxSkeletonLoaderModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
