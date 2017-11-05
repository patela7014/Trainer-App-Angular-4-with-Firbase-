import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutRunnerRoutingModule } from './workout-runner-routing.module';
import { WorkoutRunnerComponent } from './workout-runner/workout-runner.component';
import { ExerciseDescriptionComponent } from './exercise-description/exercise-description.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { WorkoutContainerComponent } from './workout-container/workout-container.component';
import { VideoDialogComponent } from './video-dialog/video-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    WorkoutRunnerRoutingModule
  ],
  declarations: [
    WorkoutRunnerComponent,
    ExerciseDescriptionComponent,
    VideoPlayerComponent,
    WorkoutContainerComponent
  ],
})
export class WorkoutRunnerModule { }

