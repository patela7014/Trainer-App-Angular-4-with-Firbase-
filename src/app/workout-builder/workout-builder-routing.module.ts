import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkoutBuilderComponent } from './workout-builder/workout-builder.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { WorkoutComponent } from './workout/workout.component';

const routes: Routes = [
  {
    path: '',
    component: WorkoutBuilderComponent,
    children: [
      {path:'', pathMatch: 'full', redirectTo: 'workouts'},
      {path:'workouts', component: WorkoutsComponent },
      {path:'exercises', component: ExercisesComponent },
      {path:'workout/:id', component: WorkoutComponent },
      {path:'workout/new',  component: WorkoutComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutBuilderRoutingModule { }
