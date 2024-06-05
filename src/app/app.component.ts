  import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
  import { UserService } from 'src/app/services/user.service';
  
  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
  })
  export class AppComponent {
    title = 'BrianPostresApp';
    estado = '';
    sesionIniciada!: boolean;
    isAuthenticated: boolean = false;
    autenticado = localStorage.getItem('token');
    usuarioboolean: boolean = false;
  
    constructor(private userService: UserService, private render: Renderer2) {}

    @ViewChild('navbar', { static: false }) navbar?: ElementRef;
    
    ngOnInit() {
      this.userService.sesionIniciada$.subscribe((estadoRecibido) => {
        this.sesionIniciada = estadoRecibido;
        this.ingresarOSalir();
        this.esAdmin();
      });
      this.esAdmin();
      this.ingresarOSalir();
    }

    esAdmin(){
      let mail = localStorage.getItem('mail');
     // console.log(mail);
     if(mail != null){
       if(mail == 'brianschmunk04@gmail.com'){
        this.isAuthenticated = true;
       } else {
        this.isAuthenticated = false;
       } 
     } else {
       //console.log('no autenticado');
       this.isAuthenticated = false;
     }
    }
  
    ingresarOSalirClick() {
      if (this.estado == ' Salir') {
        this.userService.logOut();
        localStorage.removeItem('mail');
        localStorage.removeItem('nombre');
        //console.log('sali desde el boton principal');
        this.estado = ' Ingresar';
        this.esAdmin();
      }
    }
    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event) {
      const targetElement = event.target as HTMLElement;
      if (this.navbar && !this.navbar.nativeElement.contains(targetElement)) {
        this.render.removeClass(this.navbar.nativeElement, 'show');
      }
    }
  
  
    async ingresarOSalir() {
     try{
     const usuarioPresente = await this.userService.hayUsuario();
      if (usuarioPresente) {
        this.estado = ' Salir';
      } else {
        this.estado = ' Ingresar';
      }
     } catch (error){
     // console.error("Error verificando usuario:", error);
     }
 
    }
  }
  