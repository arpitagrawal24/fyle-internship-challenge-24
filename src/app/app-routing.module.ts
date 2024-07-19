import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';

const routes: Routes = [
  { path: 'add-workout', component: WorkoutFormComponent },
  { path: 'workout-list', component: WorkoutListComponent },
  { path: '', redirectTo: '/workout-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
