import { Component, OnInit } from '@angular/core';
import { ClientList } from './module/struct';
import { ClientService } from 'src/services/client.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  constructor(private service: ClientService, private router: Router) {

  }

  ngOnInit(): void {
    this.service.ClientList().subscribe(
      res => this.clientList = res,
      error => console.log(error)
    );
  }

  public clientList: Array<ClientList> = [];

  navegateToEdit(nameRouter: string, estrutura: ClientList) {
    this.router.navigate([nameRouter], { state: { estrutura: estrutura, isEdit: true } });
  }

  navegateToCreate(nameRouter: string,) {
    this.router.navigate([nameRouter], { state: { isEdit: true } });
  }

  DeleteClient(id: number) {
    return this.service.ClientDelete(id).subscribe(
      res => [
        this.clientList = this.clientList.filter(
          item => {
            return id !== item.id
          }
        )
      ],
      error => error
    );
  }
}
