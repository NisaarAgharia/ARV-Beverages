import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oops',
  templateUrl: './oops.page.html',
  styleUrls: ['./oops.page.scss'],
})
export class OOPSPage implements OnInit {

  constructor(private modalCtrl:ModalController) { }

  closeModal()
  {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
