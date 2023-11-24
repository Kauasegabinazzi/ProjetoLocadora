import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientList } from '../module/struct';

@Component({
  selector: 'app-clients-edit',
  templateUrl: './clients-edit.component.html',
  styleUrls: ['./clients-edit.component.scss']
})
export class ClientsEditComponent implements OnInit, OnDestroy {

  public estrutura: Array<ClientList> = [];
  public isEdit: boolean = false;

  constructor() {
    const state = history.state;
    this.estrutura = state.estrutura;
    this.isEdit = state.isEdit;
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }
}
