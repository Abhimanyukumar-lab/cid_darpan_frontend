import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor() {}

  getToastMessage = (
    title: string,
    icon: 'success' | 'error' | 'warning' | 'info' | 'question',
    timer: number,
    position:
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'center'
      | 'center-start'
      | 'center-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end'
  ) => {
    const Toast = Swal.mixin({
      toast: true,
      position: position,
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: icon,
      title: title,
    });
  };
}
