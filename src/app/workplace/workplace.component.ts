import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UnitService} from '../unit.service';
import {WorkerModel} from '../models/worker/worker.model';
import {Subscription} from 'rxjs';
import {UserService} from '../user.service';
import {ModalDismissReasons, NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalContentComponent} from '../common/modal-content/modal-content.component';

@Component({
  selector: 'app-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.sass'],
  providers: [UnitService]
})
export class WorkplaceComponent implements OnInit, OnDestroy {
  units: WorkerModel[] = [];
  excuses = [
    {title: ' könyörög', content: '"De Főnök! Nekem családom, gyerekeim vannak! Nem teheted ezt velem!"'},
    {title: ' sírva fakad', content: 'ಥ╭╮ಥ'},
    {title: ' hisztérikusan nevetgél', content: 'Engem nem rúghatsz ki, felmondok!'},
    {title: ' őrjöngeni kezd', content: '(╯°□°）╯︵ ┻┻    ( @&#&äđĐ )'},
    {title: ' mosolyog', content: 'fdsff'}
    ];
  private unitsSubscription: Subscription;

  constructor(private unitService: UnitService, private userService: UserService, private modalService: NgbModal) {
    unitService.getUnits();
    this.unitsSubscription = this.unitService.getUnitsUpdatedListener()
      .subscribe((units: WorkerModel[]) => {
        this.units = units;
      });
  }

  ngOnInit() {
    // const element = document.getElementById('app-workplace-omniscroll');
    // const vat = Scrollbar.init(element, {}); //TODO: Add smooth scrolling after everything else finished
  }

  ngOnDestroy() {
    this.unitsSubscription.unsubscribe();
  }

  getNewUnit() {
    this.unitService.generateUnit();
  }

  newUnitAvailable() { //TODO: Proper calculation need to be added here
    return this.userService.getUserData().points > 1050;
  }

  // HANDLING MODAL
  /**
   * Will trigger a modal to make sure the user want to fire that unit
   *
   * @param unit
   */
  open(unit: WorkerModel) {
    const rand = Math.floor(Math.random() * (+this.excuses.length - +0));
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.title =  unit.name + ' ' + this.excuses[rand].title;
    modalRef.componentInstance.content = this.excuses[rand].content;
    modalRef.componentInstance.button = 'Nem érdekel, kirúgom!';
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
