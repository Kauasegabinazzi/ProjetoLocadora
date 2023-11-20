import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {
  private vehicles = [
    { id: 1, model: 'Carro A', available: true },
    { id: 2, model: 'Carro B', available: true },
    // Adicione mais modelos de carros conforme necessário
  ];

  private clients = [
    { id: 1, name: 'Cliente 1' },
    { id: 2, name: 'Cliente 2' },
    // Adicione mais clientes conforme necessário
  ];

  private reservations: any[] = [];

  getVehicles(): Observable<any[]> {
    return of(this.vehicles);
  }

  getClients(): Observable<any[]> {
    return of(this.clients);
  }

  reserveVehicle(clientId: number, vehicleId: number): Observable<any> {
    const vehicle = this.vehicles.find(v => v.id === vehicleId);
    const client = this.clients.find(c => c.id === clientId);
    
    if (vehicle && client && vehicle.available) {
      vehicle.available = false;
      this.reservations.push({ clientId, vehicleId });
      return of({ success: true });
    }
    
    return of({ success: false });
  }

  getReservations(): Observable<any[]> {
    return of(this.reservations.map(reservation => ({
      clientName: this.clients.find(c => c.id === reservation.clientId)?.name,
      vehicleId: reservation.vehicleId
    })));
  }
}

