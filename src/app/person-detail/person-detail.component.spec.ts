import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { PersonDetailComponent } from './person-detail.component';

describe('PersonDetailComponent', () => {
  let component: PersonDetailComponent;
  let fixture: ComponentFixture<PersonDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonDetailComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadPerson method', () => {
    const spy = spyOn(component, 'loadPerson');
    component.loadPerson();
    expect(spy).toHaveBeenCalled();
  });

  it('should call save method', () => {
    const spy = spyOn(component, 'save');
    component.save({ firstName: 'Test', lastName: 'Saving' });
    expect(spy).toHaveBeenCalled();
  });
});
