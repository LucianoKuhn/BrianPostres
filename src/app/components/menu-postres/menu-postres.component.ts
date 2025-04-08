import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu-postres',
  templateUrl: './menu-postres.component.html',
  styleUrls: ['./menu-postres.component.css'],
})
export class MenuPostresComponent {
  postres: any = {};
  postresFiltrado: any = {};
  postreSeleccionado = '';
  administrador = false;
  mostrarCompAdmin = false;
  nombreUsuario: string | null = '';
  mostrarUsuario: boolean = false;
  estadoRecibido!: boolean;

  constructor(
    private readonly dataService: DataService,
    private userService: UserService
  ) {
    this.getPostres();
    this.postreSeleccionado = 'aa';
    this.comprobarAdmin();
  }
  ngOnInit() {
    this.mostrarNombre();

  }

  async comprobarAdmin() {
    try {
      const email = await this.userService.getCurrentUserEmail();
      //console.log('Email: ', email);

      if (email === 'brianschmunk04@gmail.com') {
        this.administrador = true;
      }
    } catch (error) {
      //console.error('Error obtaining email:', error);
    }
  }

  scrollToEditor() {
    const editorElement = document.getElementById('mostrarControl');
    if (editorElement) {
      editorElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  async getPostres() {
    this.dataService
      .getPostres()
      .then((postres: any) => {
        this.postres = postres.filter((postre:any)=> postre.visible);
       // console.log('postres:', postres);
        this.filtrarPostres();
      })
      .catch((error: any) => console.log(error));
  }
  filtrarPostres() {
    if (
      this.postreSeleccionado === 'todos' ||
      this.postreSeleccionado === 'aa'
    ) {
      this.postresFiltrado = null;
      setTimeout(() => (this.postresFiltrado = [...this.postres]), 0);
    } else {
      this.postresFiltrado = this.postres.filter(
        (postre: any) => postre.categoria === this.postreSeleccionado
      );
    }
  }

  mostrarNombre() {
    this.userService.obtenerNombre();
    this.nombreUsuario = localStorage.getItem('nombre');
   // console.log( this.nombreUsuario)
    if(this.nombreUsuario !== null && this.nombreUsuario !== ""){
      this.mostrarUsuario = true;
    //  console.log('nombre de usuario: ', this.nombreUsuario);
    } else this.mostrarUsuario = false;

   
  }
}
