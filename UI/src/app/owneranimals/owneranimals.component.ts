import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-owneranimals',
  imports: [CommonModule, RouterModule],
  templateUrl: './owneranimals.component.html',
  styleUrls: ['./owneranimals.component.css']
})
export class OwneranimalsComponent implements OnInit {
  animals: any[] = []; // To store the list of animals
  ownerEmail: string = ''; // To store the email of the current user
  

  constructor(private userservice: UserService,
    private router: Router  ,
  ) {}

  ngOnInit(): void {

    const storedEmail = sessionStorage.getItem('ownerEmail');  // in case of page refresh , we fetch from storage and again set the observable
    if (storedEmail) {
     this.userservice.setowneremail(storedEmail);  // observable is set again 
    }
   
    // Subscribe to the shared email observable
    this.userservice.OwnerEmail$.subscribe((email) => {
        this.ownerEmail = email;
        if (this.ownerEmail) {
          this.fetchAnimals(this.ownerEmail);    // the function below is called 
        }
        else{
          alert('Animal details cannot be fetched');
        }
      });
  }





  fetchAnimals(email: string): void {
    this.userservice.getowneranimals(email).subscribe(
      (response: any[]) => {
        this.animals = response;
      },
    );

  }

  logout(): void {
    sessionStorage.clear();
}


}
