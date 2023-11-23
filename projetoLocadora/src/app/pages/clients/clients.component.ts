import { Component, OnInit } from '@angular/core';
import { ClientList } from './module/struct';
import { ClientService } from 'src/services/client.service';

@Component({
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit{

  constructor(private service: ClientService){

  }

  ngOnInit(): void {
    this.service.ClientList().subscribe(
      res => this.clientList = res,
      error => console.log(error)
    );
  }

  public clientList: Array<ClientList> = [];
}
