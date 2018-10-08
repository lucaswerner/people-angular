import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { PersonService } from './person.service';
import { Person } from '../models/person';
import { asyncData } from '../helpers/observable-helper';

describe('PersonService', () => {

  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy };
  let personService: PersonService;
  let personDummy: Person;

  beforeEach(() => {

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    personService = new PersonService(<any>httpClientSpy);
    personDummy = {
      firstName: 'Mamão',
      lastName: 'com Açúcar'
    };

    return TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
  }
  );

  it('should be created', () => {
    const service: PersonService = TestBed.get(PersonService);
    expect(service).toBeTruthy();
  });

  it('should return list of Person', (done: DoneFn) => {
    const service: PersonService = TestBed.get(PersonService);
    service.getPersons().subscribe((persons: Person[]) => {
      expect(Array.isArray(persons)).toBe(true);
      done();
    });
  });

  it('should return expected persons (HttpClient called once)', () => {
    const expectedPersons: Person[] =
      [{ id: 1, firstName: 'Robson', lastName: 'Santos' },
      { id: 2, firstName: 'Ferreira', lastName: 'Silva' }];

    httpClientSpy.get.and.returnValue(asyncData(expectedPersons));

    personService.getPersons().subscribe(
      persons => expect(persons).toEqual(expectedPersons, 'expected Persons')
    );
  });

  it('should return person from save method', () => {

    const expectedPerson: Person = {
      ...personDummy,
      id: 1
    };

    httpClientSpy.post.and.returnValue(asyncData(expectedPerson));

    personService.savePerson(personDummy).subscribe(person =>
      expect(person).toEqual(expectedPerson, 'expected Person')
    );
  });

  it('should return person with search by ID', () => {

    const id = 1;

    const expectedPerson: Person = {
      ...personDummy,
      id
    };

    httpClientSpy.get.and.returnValue(asyncData(expectedPerson));

    personService.getPerson(id).subscribe(person =>
      expect(person).toEqual(expectedPerson, 'expected Person')
    );
  });

  it('should update person after save', () => {
    const expectedPerson: Person = {
      ...personDummy,
      id: 1
    };

    const newPerson: Person = {
      ...expectedPerson,
      firstName: 'Chocolate',
      lastName: 'Pera'
    };

    httpClientSpy.post.and.returnValue(asyncData(expectedPerson));
    httpClientSpy.put.and.returnValue(asyncData(newPerson));

    personService.savePerson(personDummy).subscribe(savedPerson =>
      personService.updatePerson(newPerson).subscribe(updatedPerson => {

        expect(savedPerson).toEqual(expectedPerson, 'saved person');
        expect(updatedPerson).toEqual(newPerson, 'updated person');
      }
      )
    );
  });

  it('should return empty value from deleted person', () => {
    httpClientSpy.delete.and.returnValue(asyncData(undefined));

    personService.deletePerson(1).subscribe(person =>
      expect(person).toEqual(undefined, 'deleted person'));
  });
});
