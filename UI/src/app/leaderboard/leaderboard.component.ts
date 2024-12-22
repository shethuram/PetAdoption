import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { LeaderboardService } from '../services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  imports:[CommonModule , RouterModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {


  leaders:any[] = [] ;

constructor(
  private userservice: UserService,
  private leaderboardservice: LeaderboardService  ,
  private router: Router ,
) {}


  ngOnInit() {

    this.userservice.getleaders().subscribe(             
      (response: any[]) => {
        this.leaders = response;
      },
    );
  }


  
  logout(): void {
    sessionStorage.clear();
}



}
