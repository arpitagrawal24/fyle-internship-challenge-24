import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { User, ExtendedUser } from './../../utils/interface';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
})
export class WorkoutListComponent implements OnInit {
  users: ExtendedUser[] = [];
  filteredUsers: ExtendedUser[] = [];
  searchText = '';
  filterType = '';
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];

  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.workoutService.getUsers().map((user: User) => {
      console.log(user);
      const workoutTypes = user.workouts
        .map((workout) => workout.type)
        .join(', ');
      const workoutCount = user.workouts.length;
      const totalMinutes = user.workouts.reduce(
        (total, workout) => total + workout.minutes,
        0
      );
      return { ...user, workoutTypes, workoutCount, totalMinutes };
    });

    this.filterUsers();
  }

  filterUsers() {
    const filtered = this.users.filter((user) => {
      const matchesName = user.name
        .toLowerCase()
        .includes(this.searchText.toLowerCase());
      const matchesType = this.filterType
        ? user.workouts.some((workout) => workout.type === this.filterType)
        : true;
      return matchesName && matchesType;
    });
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    this.filteredUsers = filtered.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  updateItemsPerPage() {
    this.currentPage = 1;
    this.filterUsers();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterUsers();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.filterUsers();
    }
  }
}
