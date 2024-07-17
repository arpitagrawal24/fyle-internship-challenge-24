import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private storageKey = 'userData';
  
  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([
        {
          id: 1,
          name: 'John Doe',
          workouts: [
            { type: 'Running', minutes: 30 },
            { type: 'Cycling', minutes: 45 }
          ]
        },
        {
          id: 2,
          name: 'Jane Smith',
          workouts: [
            { type: 'Swimming', minutes: 60 },
            { type: 'Running', minutes: 20 }
          ]
        },
        {
          id: 3,
          name: 'Mike Johnson',
          workouts: [
            { type: 'Yoga', minutes: 50 },
            { type: 'Cycling', minutes: 40 }
          ]
        }
      ]));
    }
  }

  getUsers() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addUser(user: any) {
    const users = this.getUsers();
    user.id = users.length ? Math.max(...users.map((u: any) => u.id)) + 1 : 1;
    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  updateUser(user: any) {
    let users = this.getUsers();
    users = users.map((u: any) => u.id === user.id ? user : u);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }
}
