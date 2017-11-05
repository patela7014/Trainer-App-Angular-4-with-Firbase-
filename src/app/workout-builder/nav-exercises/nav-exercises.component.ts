import { Component, OnInit, Input } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { WorkoutBuilderService } from '../../services/workout-builder.service';

import { Exercise, WorkoutPlan } from '../../services/model';

@Component({
  selector: 'nav-exercises',
  templateUrl: './nav-exercises.component.html',
  styleUrls: ['./nav-exercises.component.css']
})
export class NavExercisesComponent implements OnInit {
  exercises : Exercise[];
  @Input() workout: WorkoutPlan;
  constructor(private workoutService : WorkoutService, private workoutBuilderService : WorkoutBuilderService) { }

  ngOnInit() {

    this.getAllExercises()
  }

  addExercise(exercise){
    this.workoutBuilderService.addNewExercise(this.workout, exercise)
  }

  getAllExercises(){
    this.workoutService.exerciseRequest().subscribe(
      data => {
        this.exercises = data;
        console.log('this.exercises', this.exercises)
      },
      err => {
        console.log(err);
      });
  }

}
