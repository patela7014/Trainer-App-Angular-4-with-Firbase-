import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutBuilderRoutingModule } from './workout-builder-routing.module';
import { WorkoutBuilderComponent } from './workout-builder/workout-builder.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { NavComponent } from './navigation/nav/nav.component';
import { SubNavComponent } from './navigation/sub-nav/sub-nav.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { WorkoutComponent } from './workout/workout.component';
import { NavExercisesComponent } from './nav-exercises/nav-exercises.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WorkoutBuilderRoutingModule
  ],
  declarations: [NavComponent, WorkoutBuilderComponent, WorkoutsComponent, SubNavComponent, ExercisesComponent, WorkoutComponent, NavExercisesComponent]
})
export class WorkoutBuilderModule { }
