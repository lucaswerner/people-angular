import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { Person } from '../models/person';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
  private id: number;
  personForm = this.formBuilder.group({
    id: [''],
    firstName: [''],
    lastName: [''],
  });

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  get firstName() { return this.personForm.get('firstName'); }

  get lastName() { return this.personForm.get('lastName'); }

  ngOnInit() {
    this.loadPerson();
  }

  goBack(): void {
    this.location.back();
  }

  save(person: Person): void {
    this.personService.savePerson(person)
      .subscribe(() => this.goBack());
  }

  getPerson(): void {
    this.personService.getPerson(this.id)
      .subscribe(person => this.personForm.patchValue(person));
  }

  loadPerson() {
    if (this.id) {
      this.getPerson();
    }
  }

  edit(person: Person): void {
    this.personService.updatePerson(person)
      .subscribe(() => this.goBack());
  }

  onSubmit(): void {
    const values = this.personForm.value;
    this.id
      ? this.edit(values)
      : this.save(values);
  }

}
