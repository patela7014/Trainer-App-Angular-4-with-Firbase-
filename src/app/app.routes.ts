import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StartComponent} from './start/start/start.component';

const workoutBuilderRoutes: Routes = [
  {
    path: 'builder',
    loadChildren: 'app/workout-builder/workout-builder.module#WorkoutBuilderModule'
  }
];

const workoutRunnerRoutes: Routes = [
  {
    path: 'runner',
    loadChildren: 'app/workout-runner/workout-runner.module#WorkoutRunnerModule'
  }
];

export const routes: Routes = [
  { path: 'start', component: StartComponent },
  ...workoutBuilderRoutes,
  ...workoutRunnerRoutes,
  { path: '**', redirectTo: '/start' }
];


export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
