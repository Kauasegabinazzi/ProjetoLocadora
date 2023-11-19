import { Component, OnInit } from '@angular/core';
import { ReservationsService } from './reservations.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  })
export class ReservationsComponent implements OnInit{
  reservations: { vehicles: any; clients: any }[] = [];

  constructor(private reservationsService: ReservationsService){}

  ngOnInit(){
  this.reservations = this.reservationsService.getReservations();
}
}
