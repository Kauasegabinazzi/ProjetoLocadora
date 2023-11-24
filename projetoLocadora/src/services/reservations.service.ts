import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ReservationList } from 'src/app/pages/reservations/module/struct';

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {

  private baseUrl: string = 'http://localhost:3000';
  private reservationsUrl: string = `${this.baseUrl}/list-reservations`;
  private reservationListSubject: BehaviorSubject<ReservationList[]> = new BehaviorSubject<ReservationList[]>([]);
  public reservationList$: Observable<ReservationList[]> = this.reservationListSubject.asObservable();

  private updateReservationList(): void {
    this.getReservationList().subscribe((reservations: ReservationList[]) => {
      this.reservationListSubject.next(reservations);
    });
  }

  constructor(private http: HttpClient) {}

  getReservationList(): Observable<Array<ReservationList>> {
    return this.http.get<Array<ReservationList>>(`${this.baseUrl}/list-reservations`).pipe(
      res => res,
      error => error
    )
  }
  
  addReservation(clientid: number, vehicleid: number): Observable<ReservationList> {
    const newReservation = {
      id: clientid,
      vehicleid: vehicleid,
    };

    return this.http.post<any>(this.reservationsUrl, newReservation).pipe(
      tap((response: any) => {
        if (response && response.success) {
          this.updateReservationList();
        }
      })
    );
  }
}
