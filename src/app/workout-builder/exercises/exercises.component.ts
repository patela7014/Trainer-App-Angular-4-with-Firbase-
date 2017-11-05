import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { Exercise } from '../../services/model';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  exercises : Exercise[];
  constructor(private workoutService : WorkoutService) { }

  ngOnInit() {
    this.getAllExercises();
  }

  getAllExercises(){
    this.workoutService.exerciseRequest().subscribe(
      data => {
        this.exercises = data;
      },
      err => {
        console.log(err);
      });
  }


}
