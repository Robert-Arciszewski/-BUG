import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../car.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CarListComponent {
  cars: any[] = [];
  isModalOpen = false;
  newCarName = '';

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {
    this.cars = this.carService.getCars();
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.newCarName = '';
  }

  addCar(): void {
    if (this.newCarName.trim()) {
      this.carService.addCar({ name: this.newCarName, services: [] });
      this.cars = this.carService.getCars();
      this.closeModal();
    }
  }

  viewDetails(index: number): void {
    this.router.navigate(['/car', index]);
  }
}
