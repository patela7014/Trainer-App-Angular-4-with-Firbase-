import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RoutesRecognized } from '@angular/router';
import {ExercisePlan, WorkoutPlan, Exercise} from '../../services/model';
import {WorkoutBuilderService} from '../../services/workout-builder.service';
@Component({
  selector: 'workout-runner',
  templateUrl: './workout-runner.component.html',
  styleUrls: ['./workout-runner.component.css']
})
export class WorkoutRunnerComponent implements OnInit {
  sub : any;
  workout : WorkoutPlan;
  restExercise : ExercisePlan;
  currentExercise : any;
  exerciseRunningDuration : number = 0;
  currentExerciseIndex : number;
  totalPlayedExercise : number = 0;
  workoutTimeRemaining : number;
  workoutPaused : boolean;
  exerciseTrackingInterval : number;
  workoutCompleted: boolean = false;
  constructor(private route: ActivatedRoute,public router: Router, private workoutBuilderService: WorkoutBuilderService ) {}

  ngOnInit() {
    this.route.firstChild.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id') != '') {
          let workoutName = params['id'];
          console.log('workoutName',workoutName );
          this.loadWorkoutData(workoutName);
        }
    });
  }

  start(){
    let classObj = this;

    console.log('classObj.totalPlayedExercise', classObj.totalPlayedExercise)
    if(classObj.totalPlayedExercise < classObj.workout.exercises.length) {
      this.exerciseTrackingInterval = setInterval(function () {
        if (classObj.exerciseRunningDuration >= classObj.currentExercise.duration) {
          ++classObj.totalPlayedExercise;
          clearInterval(this.exerciseTrackingInterval);
          if (classObj.currentExercise.exercise.name == 'rest') {
            ++classObj.currentExerciseIndex;
            classObj.startExercise();
          } else {
            classObj.currentExercise = this.restExercise;
            classObj.exerciseRunningDuration = 0;
            classObj.start();
          }
        }
        ++classObj.exerciseRunningDuration;
        --classObj.workoutTimeRemaining;
      }.bind(this), 1000);
    }else{
     classObj.workoutCompleted = true;
    }
  }

  onKeyPressed = function (event: KeyboardEvent) {
    if (event.which == 80 || event.which == 112) {        // 'p' or 'P' key to toggle pause and resume.
      this.pauseResumeToggle();
    }
  }

  startExercise(){
    this.currentExercise = this.workout.exercises[this.currentExerciseIndex];
    this.exerciseRunningDuration = 0;
    this.start();
  }

  pauseResumeToggle(){
    this.workoutPaused ? this.resume() : this.pause();
  }

  pause() {
    clearInterval(this.exerciseTrackingInterval);
    this.workoutPaused = true;
  }

  resume() {
    this.start();
    this.workoutPaused = false;
  }


  loadWorkoutData(workoutName){
    this.workoutBuilderService.loadInitialWorkoutData(workoutName).subscribe(data => {
        this.workout = {
          key: data[0].payload.key,
          ...data[0].payload.val()
        };
        this.totalWorkoutDuration();
        this.workoutTimeRemaining = this.workout.totalWorkoutDuration();
        this.currentExercise = this.workout.exercises[0];
        this.restExercise = new ExercisePlan(new Exercise("rest", "Relax!", "Relax a bit", "rest.png"), this.workout.restBetweenExercise);
        this.exerciseRunningDuration = 0;
        this.currentExerciseIndex = 0;
        this.workoutPaused = false;
        this.start();
    },
      err => {
        console.log(err);
      }
    );
  }

  totalWorkoutDuration(){
    this.workout.totalWorkoutDuration = ()=>{
      if(!this.workout.exercises) return 0;
      let total = this.workout.exercises.map((e)=>e.duration).reduce((previous,current)=> parseInt(previous) + parseInt(current));
      return ((this.workout.restBetweenExercise?this.workout.restBetweenExercise:0) * (this.workout.exercises.length -1)) + total;
    }
  }
}
