import { Component, OnInit } from '@angular/core';
import { FakeApiService } from './reservations.service';
import { ErrorDialogService } from './errordialog.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  vehicles: any[] = [];
  clients: any[] = [];
  selectedClient: number = 0;
  selectedVehicle: number = 0;
  reservations: any[] = [];

  constructor(public fakeApiService: FakeApiService, private errorDialogService: ErrorDialogService) { }

  ngOnInit(): void {
    this.loadVehicles();
    this.loadClients();
    this.loadReservations();
  }

  loadVehicles(): void {
    this.fakeApiService.getVehicles().subscribe(vehicles => {
      this.vehicles = vehicles.filter(v => v.available);
    });
  }

  loadClients(): void {
    this.fakeApiService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  loadReservations(): void {
    this.fakeApiService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
    });
  }

  reserveVehicle(): void {
    if (this.selectedClient !== 0 && this.selectedVehicle !== 0) {
      const existingReservation = this.reservations.find(
        reservation =>
          reservation.vehicleId === this.selectedVehicle && reservation.clientId !== this.selectedClient
      );

      if (!existingReservation) {
        this.fakeApiService.reserveVehicle(this.selectedClient, this.selectedVehicle)
          .subscribe(response => {
            if (response.success) {
              this.loadReservations();
              this.loadVehicles();
              this.selectedClient = 0;
              this.selectedVehicle = 0;
            } else {
              this.errorDialogService.openDialog('Falha ao reservar o veículo.');
            }
          });
      }
    }
  }

  getClientName(clientId: number): string {
    const client = this.clients.find(c => c.id === clientId);
    return client ? client.name : 'Cliente Desconhecido';
  }

  getVehicleModel(vehicleId: number): string {
    const vehicle = this.vehicles.find(v => v.id === vehicleId);
    return vehicle ? vehicle.model : 'Veículo Desconhecido';
  }
}
