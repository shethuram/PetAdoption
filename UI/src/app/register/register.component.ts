import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';




@Component({
  selector: 'app-register',
  imports:[CommonModule , ReactiveFormsModule , RouterModule ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;       // ! -> it will be initialized later 

  constructor(private fb: FormBuilder,
    private userservice: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.pattern(/[^A-Za-z0-9]/), // At least one special character
        ],
      ],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      alert('Please fill all the fields correctly.');
      return;
    }

    else{
    this.userservice.registerUser(this.registerForm.value).subscribe(
      (response) => {                                                    // if true (OK status)
        alert("Registration Success");
        this.router.navigate(['/login']);
      },
      (error) => {                                     
        // Check if the error is a PRIMARY KEY violation
        const errorMessage: string = error?.error; // Extract the error string          // ? optional chaining character

        if (error.status === 500 && errorMessage?.includes("Violation of PRIMARY KEY constraint")){
          alert("Email already exists. Please use a different email");
        } 

        else {
          alert("Registration failed. Please try again later");
        }

        this.registerForm.reset();

      }
    );
  }

}
}
