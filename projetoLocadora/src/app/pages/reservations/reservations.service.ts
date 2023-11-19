import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ReservationsService {
    reservations: { vehicles: any; clients: any }[] = [];

    addReservations(vehicles: any, clients: any) {
        this.reservations.push({ vehicles, clients });
    }
    getReservations() {
    return this.reservations;
    }
}
