import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchText = '';
  filterType = '';
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.users = this.workoutService.getUsers();
    this.filteredUsers = this.users;
  }

  filterWorkouts() {
    this.filteredUsers = this.users.filter(user => {
      return user.name.toLowerCase().includes(this.searchText.toLowerCase()) &&
        (!this.filterType || user.workouts.some((workout: any) => workout.type === this.filterType));
    });
  }
}
