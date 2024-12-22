import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LeaderboardService {
  private leaderboard: any[] = []; // Array of leaderboard data (top users)

  // Setter for leaderboard data
  setleaderboard(data: any[]) {
    this.leaderboard = data;
  }

  // Check if a user is in the top 3
  isUserintopthree(email: string): boolean {
    const topThree = this.leaderboard.slice(0, 3); // Top 3 users
    return topThree.some(user => user.email === email);        // atleast one user is in the top 3 with given email
  }

  
}
