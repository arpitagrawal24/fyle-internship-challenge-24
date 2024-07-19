import { Component } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { User } from './../../utils/interface';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css'],
})
export class WorkoutFormComponent {
  name: string = '';
  workoutType: string = '';
  workoutMinutes: number = 0;

  constructor(private workoutService: WorkoutService) {}

  onSubmit() {
    const users = this.workoutService.getUsers();
    const user = users.find((u: User) => u.name === this.name);

    if (user) {
      user.workouts.push({
        type: this.workoutType,
        minutes: this.workoutMinutes,
      });
      this.workoutService.updateUser(user);
    } else {
      const newUser: User = {
        id: users.length ? Math.max(...users.map((u: User) => u.id)) + 1 : 1,
        name: this.name,
        workouts: [{ type: this.workoutType, minutes: this.workoutMinutes }],
      };
      this.workoutService.addUser(newUser);
    }

    this.name = '';
    this.workoutType = '';
    this.workoutMinutes = 0;
  }
}
