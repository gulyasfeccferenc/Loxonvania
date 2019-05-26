import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.sass']
})
export class ModalContentComponent implements OnInit {
  @Input() title;
  @Input() content;
  @Input() button;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
