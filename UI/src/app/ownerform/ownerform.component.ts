import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';   // formsmodule is needed for two way binding
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-ownerform',
  imports: [FormsModule , RouterModule],                   
  templateUrl: './ownerform.component.html',
  styleUrls: ['./ownerform.component.css']
})
export class OwnerformComponent {
  petDetails = {
    name: '',
    type: '',
    breed: '',
    age: 0,
    quoted_price: 0,
    image: null as File | null // Allow File or null
  };

  userEmail: string = ''; // To store the email from the shared variable
 


  constructor(
    public userservice: UserService,
    private router: Router,  
  ){}


  ngOnInit(): void {


    const storedEmail = sessionStorage.getItem('ownerEmail');  // in case of page refresh , we fetch from storage and again set the observable
    if (storedEmail) {
     this.userservice.setowneremail(storedEmail);  // observable is set again 
    }

    // Subscribe to the shared variable for email
    this.userservice.OwnerEmail$.subscribe((email) => {
      console.log('Received email:', email);

      this.userEmail = email; 
    });
  }


  // two way binding doesn't work for file type , instead (change) event listener is used 

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;   // typecasted as HTMLInputElement (the file input element) -> gives access to file-related properties like files.
    if (input.files && input.files[0]) {
      this.petDetails.image = input.files[0];
    }
  }

  onSubmit(): void {
    if (
      !this.petDetails.name ||!this.petDetails.type || !this.petDetails.breed || !this.petDetails.age ||
      !this.petDetails.quoted_price || !this.petDetails.image) {
      alert('Please fill all fields.');
      return;
    }
  
    // Create FormData to handle file uploads
    const formData = new FormData();
    formData.append('name', this.petDetails.name);
    formData.append('type', this.petDetails.type);
    formData.append('breed', this.petDetails.breed);
    formData.append('age', this.petDetails.age.toString());
    formData.append('quoted_price', this.petDetails.quoted_price.toString());
    formData.append('image', this.petDetails.image as File); // Attach the file
    formData.append('email', this.userEmail); // Attach the email
  
    this.userservice.registerpet(formData).subscribe(
      (response) => {
        alert('Pet Registration Success');
      },
      (error) => {
        alert('Error, please try again');
      }
    );
  }


  logout(): void {
    sessionStorage.clear();
}

}
