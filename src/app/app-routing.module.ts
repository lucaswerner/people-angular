import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonComponent } from './person/person.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/person', pathMatch: 'full' },
  { path: 'person', component: PersonComponent },
  { path: 'person/new', component: PersonDetailComponent },
  { path: 'person/:id', component: PersonDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
