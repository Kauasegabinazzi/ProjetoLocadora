import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  opened: boolean = false; // Adicione esta linha

  /*cars = [
    { logo: 'assets/icons/logo_car1.png', name: 'Carro 1', mileage: '1000 km', fuelType: 'Gasolina', model: 'Modelo 1', color: 'Azul', year: 2022 },
    { logo: 'assets/icons/logo_car2.png', name: 'Carro 2', mileage: '1200 km', fuelType: 'Diesel', model: 'Modelo 2', color: 'Vermelho', year: 2021 },
    { logo: 'assets/icons/logo_car3.png', name: 'Carro 3', mileage: '800 km', fuelType: 'Elétrico', model: 'Modelo 3', color: 'Verde', year: 2023 },
    // Adicione mais carros conforme necessário
  ];

  currentIndex = 0;

  navigate(direction: number) {
    this.currentIndex = (this.currentIndex + direction + this.cars.length) % this.cars.length;
  }*/
}
