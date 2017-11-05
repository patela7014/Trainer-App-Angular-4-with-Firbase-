import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { WorkoutPlan } from '../../services/model';
import {Router} from '@angular/router';
@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {

  workouts : WorkoutPlan[];
  workoutDuration : number[];
  constructor(private workoutService : WorkoutService, public router: Router) { }

  ngOnInit() {
    this.getAllWorkouts();
  }

  getAllWorkouts(){
    this.workoutService.workoutRequest().subscribe(
      data => {
        this.workouts = data;
        this.totalWorkoutDuration();
      },
      err => {
        console.log(err);
      });
  }

  totalWorkoutDuration(){
    return this.workouts.map((workout)=>{
      workout.totalWorkoutDuration = ()=>{
        if(!workout.exercises) return 0;
        let total = workout.exercises.map((e)=>e.duration).reduce((previous,current)=> parseInt(previous) + parseInt(current));
        return ((workout.restBetweenExercise?workout.restBetweenExercise:0) * (workout.exercises.length -1)) + total;
      }
    })
  }

  onSelect(workout){
    this.router.navigate( ['./builder/workout', workout.name] );
  }


}
