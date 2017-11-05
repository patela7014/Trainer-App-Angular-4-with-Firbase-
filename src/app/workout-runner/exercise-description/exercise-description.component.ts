import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'exercise-description',
  templateUrl: './exercise-description.component.html',
  styleUrls: ['./exercise-description.component.css']
})
export class ExerciseDescriptionComponent implements OnInit {

  @Input() description : any;
  @Input() steps : any;
  constructor() { }

  ngOnInit() {
  }

}
