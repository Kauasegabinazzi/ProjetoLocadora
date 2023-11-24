import { VehicleList } from 'src/app/pages/vehicles/module/struct';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class VehicleService {

  private url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public VehicleList(): Observable<Array<VehicleList>> {
    return this.http.get<Array<VehicleList>>(`${this.url}/list-vehicles`).pipe(
      res => res,
      error => error
    )
  }
}
