import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ReservationList } from 'src/app/pages/reservations/module/struct';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  reservations: ReservationList[] = [];

  private url: string = 'http://localhost:3000';
  private reservationsUrl: string = `${this.url}/list-reservations`;
  private reservationListSubject: BehaviorSubject<ReservationList[]> = new BehaviorSubject<ReservationList[]>([]);
  public reservationList$: Observable<ReservationList[]> = this.reservationListSubject.asObservable();

  constructor(private http: HttpClient) {}

  public ReservationList(): Observable<Array<ReservationList>> {
    return this.http.get<Array<ReservationList>>(`${this.url}/list-reservations`).pipe(
      tap((reservations: ReservationList[]) => {
        this.reservationListSubject.next(reservations);
      }),
      catchError((error: any) => {
        console.error('Error fetching reservations:', error);
        return throwError(error);
      })
    );
  }  

  ReservationListUpdate(): void {
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
