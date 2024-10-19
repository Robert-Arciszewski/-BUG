import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importuj Router
import { CarService } from '../car.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class CarDetailsComponent {
  car: any = { name: '', services: [] };
  index: number = 0;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.index = Number(this.route.snapshot.paramMap.get('id'));
    this.car = this.carService.getCar(this.index);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  addService(): void {
    const part = prompt('Wprowadź nazwę części:');
    const cost = prompt('Wprowadź koszt:');
    if (part && cost) {
      this.car.services.push({ part, cost });
      this.carService.updateCar(this.index, this.car);
    }
  }
}
