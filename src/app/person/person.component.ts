import { Component, OnInit } from '@angular/core';
import { Person } from '../models/person';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  persons: Person[] = [];

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.getPersons();
  }

  getPersons(): void {
    this.personService.getPersons()
      .subscribe(persons => this.persons = persons);
  }

  deletePerson(id: number): void {
    this.personService.deletePerson(id)
      .subscribe(() => {
        const persons = this.persons.slice();
        persons.splice(this.persons.findIndex(person => person.id === id), 1);
        this.persons = persons;
      });
  }

}
