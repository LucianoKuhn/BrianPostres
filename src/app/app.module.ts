import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule } from '@angular/forms';
import { MenuPostresComponent } from './menu-postres/menu-postres.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { StorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    MenuPostresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"brianpostres-c0040","appId":"1:585290165948:web:8886a8319d35bbdf05eab9","storageBucket":"brianpostres-c0040.appspot.com","apiKey":"AIzaSyCwgYP8U2jvc_8TLRUVZYf4z_gzHNBu2v8","authDomain":"brianpostres-c0040.firebaseapp.com","messagingSenderId":"585290165948","measurementId":"G-KJL7NBV809"})),
    provideFirestore(() => getFirestore()),
    StorageModule,
    FormsModule,
    NgxSkeletonLoaderModule,
  
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"brianpostres-c0040","appId":"1:585290165948:web:8886a8319d35bbdf05eab9","storageBucket":"brianpostres-c0040.appspot.com","apiKey":"AIzaSyCwgYP8U2jvc_8TLRUVZYf4z_gzHNBu2v8","authDomain":"brianpostres-c0040.firebaseapp.com","messagingSenderId":"585290165948","measurementId":"G-KJL7NBV809"})),
    provideStorage(() => getStorage()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
