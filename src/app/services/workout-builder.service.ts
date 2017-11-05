import {WorkoutService} from './workout.service';
import {SERVER_URL} from '../config';
import { Injectable, Inject } from '@angular/core';
import { WorkoutPlan,ExercisePlan,Exercise} from './model';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
let goshtisURL = SERVER_URL + 'goshtis';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class WorkoutBuilderService {

  workout : WorkoutPlan;
  constructor(private workoutService : WorkoutService, public http: Http, private af: AngularFireDatabase, @Inject(FirebaseApp) firebaseApp: any) {

  }
  loadInitialWorkoutData(name: string) : Observable<any[]> {
    return this.af.list('workouts',ref => ref.orderByChild('name').equalTo(name).limitToFirst(1)).snapshotChanges();
  }

  removeExercise(workout : WorkoutPlan, selExercisePlan: ExercisePlan){
    let curIndex = workout.exercises.findIndex((exercisePlan)=> exercisePlan.exercise.name === selExercisePlan.exercise.name);
    workout.exercises.splice(curIndex, 1);
  }

  addNewExercise(workout : WorkoutPlan, exercise : Exercise){
    workout.exercises.push(new ExercisePlan(exercise, 30));
  }

  addExerciseAtPos(workout : WorkoutPlan, selExercisePlan : ExercisePlan, pos : number){
    workout.exercises.splice(pos, 0, selExercisePlan);
  }

  moveExerciseTo(workout : WorkoutPlan, selExercisePlan : ExercisePlan, to : number){
    console.log('workout', workout)
    if(to !== -1 && to !== workout.exercises.length){
      let curIndex = workout.exercises.findIndex((exercisePlan)=> exercisePlan.exercise.name === selExercisePlan.exercise.name);
      this.removeExercise(workout, selExercisePlan);
      this.addExerciseAtPos(workout, selExercisePlan, to);
    }
  }

  save(workout){
    let {exercises, name, restBetweenExercise,title, description } = workout;
    if(workout.key){
      this.af.list('workouts').update(workout.key, {exercises, name, restBetweenExercise,title, description })
    }else{
      this.af.list('workouts').push({exercises, name, restBetweenExercise,title, description })
    }
  }

}
