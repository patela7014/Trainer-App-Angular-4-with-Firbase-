import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavExercisesComponent } from './nav-exercises.component';

describe('NavExercisesComponent', () => {
  let component: NavExercisesComponent;
  let fixture: ComponentFixture<NavExercisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavExercisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
