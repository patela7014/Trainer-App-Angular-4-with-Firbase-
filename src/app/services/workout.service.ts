import { Injectable, Inject } from '@angular/core';
import { WorkoutPlan,ExercisePlan,Exercise} from './model';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';

@Injectable()
export class WorkoutService {

  public workouts: Array<WorkoutPlan> = [];
  public exercises: Array<Exercise> = [];
  public exercisesData : any;

  constructor(public http: Http, private af: AngularFireDatabase, @Inject(FirebaseApp) firebaseApp: any) {
    this.http = http;
    this.getWorkout('7MinWorkout')
  }

  exerciseRequest() : Observable<any[]> {
    return this.af.list('exercises').valueChanges();
  }

  workoutRequest() : Observable<any[]> {
    return this.af.list('workouts').valueChanges();
  }

  getAllWorkouts(){
    this.workoutRequest().subscribe(
      data => {
        this.workouts = data;
        console.log('this.workouts', this.workouts)
      },
      err => {
        console.log(err);
      });
  }


  getExercises() : Exercise[]{
    return this.exercises;
  }

  getWorkouts() : WorkoutPlan[]{
    console.log('workouts', this.workouts)
    return this.workouts;
  }

  getWorkout(name: string){
    for(let workout of this.workouts){
      if(workout.name === name) return workout;
    }

    return null;
  }

  addExercise(exercise: Exercise){
    if(exercise.name){
      this.exercises.push(exercise);
    }
  }

  setupInitialExercises(){

  }

  setupInitialWorkouts(){

  }

}
