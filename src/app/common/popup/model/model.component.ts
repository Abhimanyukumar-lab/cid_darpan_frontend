import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  Input,
  ElementRef,
} from '@angular/core';
import { ModelService } from '../model.service';

@Component({
  selector: 'app-modal',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModelComponent implements OnInit, OnDestroy {
closeModal(arg0: string) {
throw new Error('Method not implemented.');
}
  @Input() id: string;
  @Input() className: string;
  @Input() closeOnClick: boolean = true;
  private element: any;

  constructor(private modalService: ModelService, private el: ElementRef) {
    this.element = this.el.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    if (!this.className) {
      this.className = 'sm-modal';
    }

    document.body.appendChild(this.element);

    if (this.closeOnClick)
      this.element.addEventListener('click', (el) => {
        if (el.target.className === 'app-modal') {
          this.close();
        }
      });

    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('app-modal-open');
  }

  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('app-modal-open');
  }
}
