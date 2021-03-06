import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UnitService} from '../unit.service';
import {WorkerModel} from '../models/worker/worker.model';
import {Subscription} from 'rxjs';
import {UserService} from '../user.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
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
        console.warn("Jöttek junitok!");
        console.warn(this.userService.getUserData());
        console.warn(units);
        this.units = units;
      });
    console.warn('constructor');
  }

  ngOnInit() {
    // const element = document.getElementById('app-workplace-omniscroll');
    // const vat = Scrollbar.init(element, {}); //TODO: Add smooth scrolling after everything else finished
    console.warn('ng on init');
  }

  ngOnDestroy() {
    //TODO: Put every unit related sync here!!!
    this.unitsSubscription.unsubscribe();
  }

  getNewUnit(price: number) {
    this.unitService.generateUnit();
    this.userService.spendPoints(price);
  }

  newUnitAvailable() { //TODO: Proper calculation need to be added here
    if (this.userService.getUserData() != null) {
      // console.warn("VAN USER DATA");
      // console.warn(this.userService.getUserData().points > this.newUnitPrice());
      // console.warn(this.unitService.getNrOfUnits() < this.getCapacity());
      // console.warn(this.getCapacity());
      return (this.userService.getUserData().points > this.newUnitPrice()) && (this.unitService.getNrOfUnits() < this.getCapacity());
    }
    return false;
  }

  unitLevelupAvailable(unit: WorkerModel) {
    return unit.level < 5 && this.userService.getUserData().points > this.getLevelUpValue(unit);
  }

  newUnitPrice() {
    return 500; // TODO: Calculation of the price based on level
  }

  getLevelUpValue(unit: WorkerModel) {
    return unit.level * 250 + 250;
  }

  getCapacity() {
    return (this.userService.getUserData().level.length + 1) * 5 || 5; //TODO: ELRENDEZNI, MIUTÁN A LEVEL TISZTÁZÓDOTT
  }

  liftUnitLevel(unit, price: number) {
    this.unitService.liftUnitLevel(unit, unit._id, this.userService.getUserData().id);
    this.userService.spendPoints(price);
  }

  // HANDLING MODAL
  /**
   * Will trigger a modal to make sure the user want to fire that unit
   *
   * @param unit
   */
  open(unit) {
    const rand = Math.floor(Math.random() * (+this.excuses.length - +0));
    const modalRef = this.modalService.open(ModalContentComponent);
    console.warn(":::::::MODAL");
    console.warn(unit._id);
    modalRef.componentInstance.title =  unit.name + ' ' + this.excuses[rand].title;
    modalRef.componentInstance.content = this.excuses[rand].content;
    modalRef.componentInstance.button = 'Nem érdekel, kirúgom!';
    modalRef.result.then((result) => {
      if (result != null && result === 1) {
        this.unitService.fireUnit(unit, unit._id, this.userService.getUserData().id);
      }
    }, (reason) => {
      if (reason != null && reason === 1) {
        this.unitService.fireUnit(unit, unit._id, this.userService.getUserData().id);
      }
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
