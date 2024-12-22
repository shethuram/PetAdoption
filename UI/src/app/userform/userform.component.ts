import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { LeaderboardService } from '../services/leaderboard.service';
import emailjs from 'emailjs-com';


@Component({
  selector: 'app-userform',
  imports:[CommonModule , RouterModule],
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {

  currentIndex: number = 0;
  isAdoptModalOpen: boolean = false; // Modal visibility flag

  pets:any[] = []
  userEmail: string = '';


  constructor(
    private userservice: UserService,
    private leaderboardService: LeaderboardService,
    private router: Router,
  ) {}


  ngOnInit() {
  
    const storedEmail = sessionStorage.getItem('userEmail');  // in case of page refresh , we fetch from storage and again set the observable
    if (storedEmail) {
     this.userservice.setuseremail(storedEmail);  // observable is set again 
    }


    this.userservice.getallpets().subscribe({
      next: (response: any[]) => {
        this.pets = response.map((pet) => ({                          // kind of an iterator 
          ...pet,
          imageurl: pet.image ? `data:image/jpeg;base64,${pet.image}` : null // Use backend's Base64 string
        }));
      },
      error: (error: any) => {
        console.error('Error fetching pets:', error);
        
      }
  });


    this.userservice.getleaders().subscribe(             
      (response: any[]) => {
        this.leaderboardService.setleaderboard(response);
      },
    );


  }
  
 
  showNext() {
    if (this.currentIndex < this.pets.length - 1) {
      this.currentIndex++;
    }
  }

  showPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }


  // Open the adopt modal
  openAdoptModal() {
    this.isAdoptModalOpen = true;
    this.pets[this.currentIndex].is_adopted = true;   // for front end to know the changes ,as we're disabling the adopt button
    this.SetCount();     
    this.SetAdoptAndBoughtPrice();
    this.SendNotify();


  }

  // Close the adopt modal
  closeAdoptModal() {
    this.isAdoptModalOpen = false;
  }



  // Implementation methods 



  SetCount(){                         // here we subscribe to the useremail 

    this.userservice.UserEmail$.subscribe((email) => {
      this.userEmail = email;
      if (this.userEmail) {

          this.userservice.setcount(this.userEmail).subscribe(
            (response) => {
              console.log('Count updated');
            },
          );
      }
      else{
        alert('Animal details cannot be fetched');
      }
    });
  }


  
  SetAdoptAndBoughtPrice(){                   // since useremail is already subscribed and stored , we use that

    if(this.leaderboardService.isUserintopthree(this.userEmail))   // discount applied
    {
        this.pets[this.currentIndex].bought_price = this.pets[this.currentIndex].quoted_price-500; // for frontend to reflect changes

        this.userservice.setadoptandprice(this.pets[this.currentIndex].id , this.pets[this.currentIndex].quoted_price-500).subscribe(             // adoption is set true in database
          (response) => {
            alert('Discount of ₹500 is applied');
          },      
        );
    }   
    
    else{   // discount not applied
      this.pets[this.currentIndex].bought_price = this.pets[this.currentIndex].quoted_price ;  // for frontend 

      this.userservice.setadoptandprice(this.pets[this.currentIndex].id , this.pets[this.currentIndex].quoted_price).subscribe(          
        (response) => {
          console.log('No Discount applied');
        },      
      );


    }

  }



  SendNotify() {
    const templateParams = {
      useremail: this.userEmail,
      owneremail: this.pets[this.currentIndex].email,
      petname: this.pets[this.currentIndex].name
    };
                                                                                   // userid , templateid, parameters,publickey
    emailjs.send('service_obc2i9h', 'template_0u2rxjr', templateParams , 'k1EZDdfSjws0bvodV').then(
    (response)=> {
      console.log('SUCCESS sending email!', response.status, response.text);
      },

      (error) => {
        console.log('FAILED to send email', error);
      },

    );
  }


  logout(): void {
    sessionStorage.clear();
}

  

}
