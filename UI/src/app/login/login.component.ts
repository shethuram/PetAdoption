import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule , RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // ! -> it will be initialized later



  constructor(private fb: FormBuilder,
     private userservice: UserService,
      private router: Router,
    ) {}



  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6), // Minimum length of 6 characters
        ],
      ],
      type: ['', Validators.required], // Required field for type
    });
  }



  onSubmit() {
    if (this.loginForm.invalid) {
      alert('Please fill all the fields correctly.');
      return;
    }
    
    else 
    {
      this.userservice.checkemailpassword(this.loginForm.value).subscribe(
        (response) => {   

          if(response && response.acesstoken)    
          {
              sessionStorage.setItem('acesstoken', response.acesstoken);

              alert("Login Success");

              if(this.loginForm.value.type === 'owner') {
              this.userservice.setowneremail(this.loginForm.value.email);   // set owneremail (shared variable)// if true (OK status)
              this.router.navigate(['/ownerform']);
              }
              else{
              this.userservice.setuseremail(this.loginForm.value.email);   
              this.router.navigate(['/userform']);
              }
          }  

          else
          {
            alert('Login Failed , Enter valid Credentials');
              this.loginForm.reset();
          }
      },
        (error) => {                                      // any issues 
         alert('Login Failed , Enter valid Credentials');
          this.loginForm.reset();
        }
      );
  
  }


}

}
