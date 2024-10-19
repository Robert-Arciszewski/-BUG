import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../car.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class CarListComponent {
}
