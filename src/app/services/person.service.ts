import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs/';
import { catchError, tap } from 'rxjs/operators';
import Config from '../services/config';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private personUrl: string;

  constructor(private http: HttpClient) {
    const config = new Config;
    this.personUrl = config.host + '/people';
  }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.personUrl);
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.personUrl}/${id}`);
  }

  savePerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.personUrl, person);
  }

  updatePerson(person: Person): Observable<Person> {
    return this.http.put<Person>(this.personUrl, person);
  }

  deletePerson(id: number): Observable<any> {
    return this.http.delete<any>(`${this.personUrl}/${id}`);
  }
}
