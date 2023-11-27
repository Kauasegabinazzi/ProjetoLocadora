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

  public ClientDelete(id: number,): Observable<ClientList> {
    return this.http.delete<ClientList>(`${this.url}list-clients/${id}`).pipe(
      res => res,
      error => error
    )
  }

  public ClientAdd(value: ClientList): Observable<ClientList> {
    return this.http.post<ClientList>(`${this.url}list-clients`, {
      name: value.name,
      age: value.age,
      birthday: value.birthday,
      registration: value.registration,
      usercreationdate: value.usercreationdate
    }).pipe(
      res => res,
      error => error
    )
  }

  public ClientEdit(id: number, value: ClientList): Observable<ClientList> {
    return this.http.put<ClientList>(`${this.url}list-clients/${id}`, {
      name: value.name,
      age: value.age,
      birthday: value.birthday,
      registration: value.registration,
      usercreationdate: value.usercreationdate
    }).pipe(
      res => res,
      error => error
    )
  }
}
