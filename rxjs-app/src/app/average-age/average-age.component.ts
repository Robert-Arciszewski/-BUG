import { Component } from '@angular/core';
import { from } from 'rxjs';
import { filter, map, mergeMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-average-age',
  templateUrl: './average-age.component.html',
  styleUrls: ['./average-age.component.css'],
  standalone: true,
})
export class AverageAgeComponent {
  averageAge: number | null = null;

  persons = [
    { id: 1, name: "Jan Kowalski" },
    { id: 2, name: "John Doe" },
    { id: 3, name: "Jarek Kaczka" }
  ];

  ages = [
    { person: 1, age: 18 },
    { person: 2, age: 24 },
    { person: 3, age: 666 }
  ];

  locations = [
    { person: 1, country: "Poland" },
    { person: 3, country: "Poland" },
    { person: 1, country: "USA" }
  ];

  calculateAverageAge() {
    const polishResidents$ = from(this.locations).pipe(
      filter(location => location.country === 'Poland'),
      mergeMap(location => from(this.persons).pipe(
        filter(person => person.id === location.person),
        mergeMap(person => from(this.ages).pipe(
          filter((age: { person: number, age: number }) => age.person === person.id),
          map((age: { person: number, age: number }) => age.age)
        ))
      )),
      toArray()
    );

    polishResidents$.subscribe((agesArray: number[]) => {
      const sum = agesArray.reduce((total: number, age: number) => total + age, 0);
      const avg = sum / agesArray.length;
      this.averageAge = avg;
    });
  }
}
