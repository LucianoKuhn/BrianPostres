import { CanActivateFn } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  
  let mail = localStorage.getItem('mail');
   console.log('mail del local storage: ', mail);
   console.log('mail del estatico: brianschmunk04@gmail.com');
   
  if(mail != null){
    if(mail == 'brianschmunk04@gmail.com'){
      return true;
    } else {
      return false;
    } 
  } else {
    console.log('no autenticado');
    return false;
  }
};
