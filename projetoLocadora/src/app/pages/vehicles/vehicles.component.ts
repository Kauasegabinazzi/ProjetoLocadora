import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
})
export class VehiclesComponent {

  constructor(private router: Router) {}

  cars = [
    {
      imagePath: 'https://r-media.volkswagen.com/v2/VW/2GB-2023-MULTI/2GB-2024-MP1/20231101/pt-BR-br/6K6K/WJ/00A,0A2,0B1,0FR,0N1,0NW,0RZ,1A4,1KA,1T2,1TW,1W0,1X0,1ZS,2C5,2D0,2FE,2H0,2J4,3B4,3C7,3FA,3GA,3H0,3J4,3L1,3NZ,3Q6,3U1,3ZB,4AM,4GF,4I3,4KC,4L6,4P0,4QU,4R4,4U7,4UF,4X1,5N0,5RQ,5SJ,5XH,6E3,6F1,6FF,6K0,6KC,6PH,6Q2,6YA,7L6,7Q0,7R6,7TL,7W0,7X2,7Y0,8IT,8M1,8N6,8Q1,8RL,8S2,8SA,8T2,8TA,8UK,8WA,8X0,8ZG,9E1,9I5,9II,9JA,9ME,9P9,9PE,9S0,9V6,9WG,A8M,AV1,AW5,B41,CI8,DS8,E0A,G1A,GP1,IA0,K8G,KA1,KC0,L0L,N3P,QJ1,QK0,T26,U9C,VF0/D6MOFA34FrontPC/b19d7b4a-df80-487c-908a-47785dbb35fc/1d9002bc68dc04fb383ca4e8eb6bf655149cf07e71eedb8b48a0ef6e0728ebe0.png?width=864',
      manufacturer: 'Volkswagen Gol',
      year: '2016',
      color: 'Vermelho',
      mileage: '80647 km'
    },
    {
      imagePath: 'https://imgs.search.brave.com/EyAbGegsGI85-si2DBVZRMpuJn5RzAqMt2zdsuTNUts/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hdnRv/Y2FyMjAyMC5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjMv/MTAvTU5OSnFscUku/cG5n',
      manufacturer: 'Chevrolet  Cobalt',
      year: '2023',
      color: 'Prata',
      mileage: '35460 km'
    },
    {
      imagePath: 'https://imgs.search.brave.com/a01kfOvX176h9GGZE6b36lu4f4HrlDB_AwaLh3sDs48/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODBiNTg1YjJlZGJj/ZTI0YzQ3YjJjMWMu/cG5n',
      manufacturer: 'Audi TT',
      year: '2023',
      color: 'Prata',
      mileage: '23000 km'
    },
    {
      imagePath: 'https://imgs.search.brave.com/Cthg9J_cVFxxG2JpeO8nHCI0tHfW6iQP3-IxAdu7gvU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wcm9k/dWN0aW9uLmF1dG9m/b3JjZS5jb20vdXBs/b2Fkcy92ZXJzaW9u/L3Byb2ZpbGVfaW1h/Z2UvNzEzMS9tb2Rl/bF9taWRkbGVfd2Vi/cF9jb21wcmFyLWxp/ZmUtMS0wLW1hbnVh/bF9kM2YwY2M1NGJh/LnBuZy53ZWJw',
      manufacturer: 'Renault Logan',
      year: '2018',
      color: 'Prata',
      mileage: '89014 km'
    },
    {
      imagePath: 'https://imgs.search.brave.com/leqLag9H4L9UXlLtNUgrlvzOITCiNDNF9JFMevkWS5s/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZngt/dnJmLW1haW4taW1n/cy5pbWdpeC5uZXQv/Zi80LzIvZGJkYWM5/MmZhMGFmOTg2NjRk/YTVkMjg5MDk0ODhl/OGRhY2E1MzI0Zi5w/bmc_YXV0bz1mb3Jt/YXQmZml0PWNsaXAm/dz00MjA',
      manufacturer: 'Hyundai Azera',
      year: '2016',
      color: 'Branco',
      mileage: '80647 km'
    },
    {
      imagePath: 'https://imgs.search.brave.com/qJDLxwwVyNELpvUkQOI5cyWFSnKwLqWZw95aTwKMWEY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9kaS11/cGxvYWRzLXBvZDE3/LmRlYWxlcmluc3Bp/cmUuY29tL2FjdXJh/YnlleGVjdXRpdmUv/dXBsb2Fkcy8yMDE5/LzA0LzIwMTktSG9u/ZGEtQ2l2aWMucG5n',
      manufacturer: 'Honda Civic',
      year: '2019',
      color: 'Creme',
      mileage: '35460 km'
    },
    {
      imagePath: 'https://imgs.search.brave.com/vvkMbfOADOTtPQk8u4nRZ8UsObkxEq_Lug8ahrJwWOE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2hldnJvbGV0LmNs/L2NvbnRlbnQvZGFt/L2NoZXZyb2xldC9z/b3V0aC1hbWVyaWNh/L2NoaWxlL2VzcGFu/b2wvaW5kZXgvY2Fy/cy9vbml4LXR1cmJv/LXJzL2NvbG9yaXpl/ci8wMS1pbWFnZXMv/bmV3L2NoZXZyb2xl/dC1jaGlsZS1vbml4/LXR1cmJvLXJzLXBs/YXRhLW1ldGFsaWNv/LnBuZz9pbXdpZHRo/PTk2MA',
      manufacturer: 'Chevrolet Onix',
      year: '2023',
      color: 'Prata',
      mileage: '23000 km'
    },
    {
      imagePath: 'https://imgs.search.brave.com/O2nwmcy807iKABNO90qRbib4zwyT1ZAgjqQR9Fhctc0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9kaS11/cGxvYWRzLXBvZDEx/LmRlYWxlcmluc3Bp/cmUuY29tL2dhcmF2/ZWxjZGpyL3VwbG9h/ZHMvMjAxNy8wOS8y/MDE4LUplZXAtQ29t/cGFzcy1IZXJvLnBu/Zw',
      manufacturer: 'Jeep Compass',
      year: '2018',
      color: 'Azul',
      mileage: '89014 km'
    }
  ]
  reservar() {
    console.log('Reserva realizada!');
    this.router.navigate(['/reservas']);
  }

  onMouseOver() {
    document.querySelector('.reserve-button')?.classList.add('hovered');
  }

  onMouseOut() {
    document.querySelector('.reserve-button')?.classList.remove('hovered');
  }
}


