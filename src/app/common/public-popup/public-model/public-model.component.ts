import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  Input,
  ElementRef,
} from '@angular/core';
import { PublicModelService } from '../public-model.service';

@Component({
  selector: 'app-public-modal',
  templateUrl: './public-model.component.html',
  styleUrls: ['./public-model.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PublicModelComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;

  constructor(
    private modalService: PublicModelService,
    private el: ElementRef
  ) {
    this.element = this.el.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    document.body.appendChild(this.element);

    this.element.addEventListener('click', (el) => {
      if (el.target.className === 'app-public-modal') {
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
    document.body.classList.add('app-public-modal-open');
  }

  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('app-public-modal-open');
  }
}
