import { Component, OnInit, OnDestroy } from '@angular/core';
import { FakeApiService } from '../../../services/reservations.service';
import { ErrorDialogService } from '../../../services/errordialog.service';
import { ClientList } from 'src/app/pages/clients/module/struct';
import { VehicleList } from 'src/app/pages/vehicles/module/struct';
import { ReservationList } from 'src/app/pages/reservations/module/struct';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';

type ValidProperties = 'vehicles' | 'clients' | 'reservations';
type Reservation = ReservationList;

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit, OnDestroy {
  vehicles: VehicleList[] = [];
  clients: ClientList[] = [];
  selectedClient: number = 0;
  selectedVehicle: number = 0;
  reservations: ReservationList[] = [];

  private subscriptions: Subscription[] = [];
  private reservationsSubject: BehaviorSubject<Reservation[]> = new BehaviorSubject<Reservation[]>([]);
  reservations$ = this.reservationsSubject.asObservable();

  constructor(public fakeApiService: FakeApiService, private errorDialogService: ErrorDialogService) { }

  ngOnInit(): void {
    this.loadInitialData();
    this.fakeApiService.reservationList$.subscribe(reservations => {
      this.reservations = reservations;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadInitialData(): void {
    this.subscriptions.push(
      this.loadData('vehicles', this.vehicles, this.fakeApiService.getVehicleList.bind(this.fakeApiService)),
      this.loadData('clients', this.clients, this.fakeApiService.getClientList.bind(this.fakeApiService)),
      this.loadData('reservations', this.reservations, this.fakeApiService.getReservationList.bind(this.fakeApiService))
    );
  }

  loadData(property: ValidProperties, data: any[], method: () => Observable<any[]>): Subscription {
    return method().subscribe((response: any) => {
      if (response) {
        this[property] = response;
      }
    }, (error: any) => {
      this.errorDialogService.openDialog(`Erro ao carregar ${property}: ${error.message}`);
    });
  }
  
  reserveVehicle(): void {
    if (this.selectedClient !== 0 && this.selectedVehicle !== 0) {
      const existingReservation = this.reservationsSubject.getValue().find(
        (reservation: Reservation) => reservation.vehicleid === this.selectedVehicle && reservation.id === this.selectedClient
      );

      if (!existingReservation) {
        this.fakeApiService.addReservation(this.selectedClient, this.selectedVehicle)
          .subscribe((response: any) => {
            if (response) {
              const newReservation: Reservation = {
                id: this.selectedClient,
                vehicleid: this.selectedVehicle
              };
              this.reservationsSubject.next([...this.reservationsSubject.getValue(), newReservation]);
              this.selectedClient = 0;
              this.selectedVehicle = 0;
            } else {
              this.errorDialogService.openDialog('Falha ao reservar o veículo.');
            }
          });
      }
    }
  }

  getClientName(clientid: number): string {
    const client = this.clients.find(c => c.id === clientid);
    return client ? client.name : 'Cliente Desconhecido';
  }

  getVehicleModel(vehicleid: number): string {
    const vehicle = this.vehicles.find(v => v.id === vehicleid);
    return vehicle ? vehicle.model : 'Veículo Desconhecido';
  }
}

