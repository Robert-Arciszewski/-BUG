import { Routes } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { CarDetailsComponent } from './car-details/car-details.component';

export const routes: Routes = [
  { path: '', component: CarListComponent },
  { path: 'car/:id', component: CarDetailsComponent },
];
