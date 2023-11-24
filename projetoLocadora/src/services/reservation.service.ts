import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ReservationList } from 'src/app/pages/reservations/module/struct';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl: string = 'http://localhost:3000';
  private reservationsUrl: string = `${this.baseUrl}/list-reservations`;
  private reservationListSubject: BehaviorSubject<ReservationList[]> = new BehaviorSubject<ReservationList[]>([]);
  public reservationList$: Observable<ReservationList[]> = this.reservationListSubject.asObservable();

  constructor(private http: HttpClient) {}

  public ReservationList(): Observable<Array<ReservationList>> {
    return this.http.get<Array<ReservationList>>(`${this.baseUrl}/list-reservations`).pipe(
      res => res,
      error => error
    )
  }

  public ReservationListUpdate(): void {
    this.ReservationList().subscribe((reservations: ReservationList[]) => {
      this.reservationListSubject.next(reservations);
    });
  }

  public ReservationAdd(clientid: number, vehicleid: number): Observable<ReservationList> {
    const newReservation = {
      id: clientid,
      vehicleid: vehicleid,
    };

    return this.http.post<any>(this.reservationsUrl, newReservation).pipe(
      tap((response: any) => {
        if (response && response.success) {
          this.ReservationListUpdate();
        }
      })
    );
  }
}
