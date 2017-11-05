import { Component, OnInit } from '@angular/core';
import { WorkoutPlan, ExercisePlan } from "../../services/model";
import { WorkoutBuilderService } from "../../services/workout-builder.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  sub : any;
  workout: WorkoutPlan;
  workoutDuration : number;
  constructor(private route: ActivatedRoute,public router: Router, private workoutBuilderService: WorkoutBuilderService ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let workoutName = params['id'];
      if (!workoutName) {
        workoutName = "";
      }
      this.loadWorkoutData(workoutName);
    });
  }

  loadWorkoutData(workoutName){
    if(workoutName == 'new'){
      let exerciseArray : ExercisePlan[] = [];
      this.workout =  new WorkoutPlan("", "", 30, exerciseArray) ;

    }else{
      this.workoutBuilderService.loadInitialWorkoutData(workoutName).subscribe(data => {
          this.workout = { key: data[0].payload.key, ...data[0].payload.val() };
          this.totalWorkoutDuration()
        },
        err => {
          console.log(err);
        });
    }

  }

  onKey(event: any) {}

  totalWorkoutDuration(){
    this.workout.totalWorkoutDuration = ()=>{
      if(!this.workout.exercises) return 0;
      let total = this.workout.exercises.map((e)=>e.duration).reduce((previous,current)=> parseInt(previous) + parseInt(current));
      return ((this.workout.restBetweenExercise?this.workout.restBetweenExercise:0) * (this.workout.exercises.length -1)) + total;
    }
  }

  save(formWorkout:any){
    if (!formWorkout.valid) return;
    this.workoutBuilderService.save(this.workout);
    this.router.navigate(['/builder/workouts']);
  }

  removeExercise(exercisePlan){
    this.workoutBuilderService.removeExercise(this.workout, exercisePlan);
  }

  moveExerciseTo(exercisePlan, pos){
    this.workoutBuilderService.moveExerciseTo(this.workout, exercisePlan, pos);
  }

  durations = [{ title: "15 seconds", value: 15 },
    { title: "30 seconds", value: 30 },
    { title: "45 seconds", value: 45 },
    { title: "1 minute", value: 60 },
    { title: "1 minute 15 seconds", value: 75 },
    { title: "1 minute 30 seconds", value: 90 },
    { title: "1 minute 45 seconds", value: 105 },
    { title: "2 minutes", value: 120 },
    { title: "2 minutes 15 seconds", value: 135 },
    { title: "2 minutes 30 seconds", value: 150 },
    { title: "2 minutes 45 seconds", value: 165 },
    { title: "3 minutes", value: 180 },
    { title: "3 minutes 15 seconds", value: 195 },
    { title: "3 minutes 30 seconds", value: 210 },
    { title: "3 minutes 45 seconds", value: 225 },
    { title: "4 minutes", value: 240 },
    { title: "4 minutes 15 seconds", value: 255 },
    { title: "4 minutes 30 seconds", value: 270 },
    { title: "4 minutes 45 seconds", value: 285 },
    { title: "5 minutes", value: 300 }];


}
