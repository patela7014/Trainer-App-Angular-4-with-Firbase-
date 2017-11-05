import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WorkoutService } from './workout.service';
import { WorkoutBuilderService } from "./workout-builder.service";

@NgModule({
  imports: [],
  declarations: [],
  providers: [WorkoutService,WorkoutBuilderService],
})
export class ServicesModule { }
