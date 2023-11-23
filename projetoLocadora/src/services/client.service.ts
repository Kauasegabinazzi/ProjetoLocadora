import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientList } from 'src/app/pages/clients/module/struct';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  public ClientList(): Observable<Array<ClientList>> {
    return this.http.get<Array<ClientList>>(`${this.url}list-clients`).pipe(
      res => res,
      error => error
    )
  }
}
