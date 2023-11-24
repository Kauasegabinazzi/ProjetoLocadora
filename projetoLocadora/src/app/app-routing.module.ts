import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { ClientsEditComponent } from './pages/clients/clients-edit/clients-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'veiculos', component: VehiclesComponent },
  { path: 'clientes', component: ClientsComponent },
  { path: 'clientesEdit', component: ClientsEditComponent },
  { path: 'reservas', component: ReservationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
