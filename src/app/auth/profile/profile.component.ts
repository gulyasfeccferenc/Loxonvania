import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalContentComponent} from '../../common/modal-content/modal-content.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  colors = [
    {color: '', name: 'indigó'},
    {color: 'pink', name: 'pink'},
    {color: 'lime', name: 'lime'},
    {color: 'grey', name: 'grey'}
  ]
  constructor(private user: UserService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  changeColor(color: {color: string, name: string}) {
    localStorage.setItem('background-color', color.color);
    document.querySelector('body').className = color.color;
  }

  openModal() {
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.title =  "ERP INTEGRÁCIÓ"
    modalRef.componentInstance.content = "Ez a funkció sajnos csak a PRO verzióban érhető el!"
    modalRef.componentInstance.button = ':(';
  }
}
