import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkoutRunnerComponent } from './workout-runner/workout-runner.component';
import { WorkoutContainerComponent } from './workout-container/workout-container.component';

const routes: Routes = [
  {
    path: '',
    component: WorkoutRunnerComponent,
    children: [
      {path:'', pathMatch: 'full', redirectTo: 'workout/hello'},
      {path:'workout/:id', component: WorkoutContainerComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutRunnerRoutingModule { }
