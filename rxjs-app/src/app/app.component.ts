import { Component } from '@angular/core';
import { AverageAgeComponent } from './average-age/average-age.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [AverageAgeComponent],
})
export class AppComponent {}
