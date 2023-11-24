import { Component, OnInit, OnDestroy } from '@angular/core';
import { ErrorDialogService } from '../../../services/error-dialog.service';
import { ReservationList } from 'src/app/pages/reservations/module/struct';
import { ClientService } from 'src/services/client.service';
import { VehicleService } from 'src/services/vehicle.service';
import { ReservationService } from '../../../services/reservation.service';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { VehicleList } from '../vehicles/module/struct';
import { ClientList } from '../clients/module/struct';

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
  reservations: ReservationList[] = [];
  selectedClient: number = 0;
  selectedVehicle: number = 0;
  

  private subscriptions: Subscription[] = [];
  private reservationsSubject: BehaviorSubject<Reservation[]> = new BehaviorSubject<Reservation[]>([]);
  reservations$ = this.reservationsSubject.asObservable();


  constructor(private VehicleService: VehicleService, private ReservationService: ReservationService, private errorDialogService: ErrorDialogService, private ClientService: ClientService) { }

  ngOnInit(): void {
    this.loadInitialData();
    this.ReservationService.reservationList$.subscribe(reservations => {
      this.reservations = reservations;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadInitialData(): void {
    this.subscriptions.push(
      this.loadData('vehicles', this.vehicles, this.VehicleService.VehicleList.bind(this.VehicleService)),
      this.loadData('clients', this.clients, this.ClientService.ClientList.bind(this.ClientService)),
      this.loadData('reservations', this.reservations, this.ReservationService.ReservationList.bind(this.ReservationService))
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
        this.ReservationService.ReservationAdd(this.selectedClient, this.selectedVehicle)
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