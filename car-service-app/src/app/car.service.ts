import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private storageKey = 'cars';

  getCars(): any[] {
    const cars = localStorage.getItem(this.storageKey);
    return cars ? JSON.parse(cars) : [];
  }

  saveCars(cars: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cars));
  }

  addCar(car: any): void {
    const cars = this.getCars();
    cars.push(car);
    this.saveCars(cars);
  }

  getCar(index: number): any {
    return this.getCars()[index];
  }

  updateCar(index: number, car: any): void {
    const cars = this.getCars();
    cars[index] = car;
    this.saveCars(cars);
  }
}
