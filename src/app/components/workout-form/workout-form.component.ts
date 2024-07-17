import { Component } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent {
  name = '';
  workoutType = '';
  workoutMinutes = 0;

  constructor(private workoutService: WorkoutService) {}

  onSubmit() {
    const user = {
      name: this.name,
      workouts: [{ type: this.workoutType, minutes: this.workoutMinutes }]
    };
    this.workoutService.addUser(user);
    this.name = '';
    this.workoutType = '';
    this.workoutMinutes = 0;
  }
}
