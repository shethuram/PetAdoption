import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'               // Service is available globally throughout the app
  })

export class UserService{

    private apiUrl = 'https://localhost:7100/api/User/';

        private owneremail = new BehaviorSubject<string>('');
        OwnerEmail$ = this.owneremail.asObservable();

        private useremail = new BehaviorSubject<string>('');
        UserEmail$ = this.useremail.asObservable();

    constructor(private http: HttpClient) { }

    
    setowneremail(value: any): void {
        this.owneremail.next(value);             // to keep updated the email observable
        sessionStorage.setItem('ownerEmail', value);  // Store owneremail in sessionStorage
        sessionStorage.setItem('role', 'owner');
        console.log('Setting owner email:', value);
      }
    
      setuseremail(value: any): void {
        this.useremail.next(value);             // to keep updated the email observable
        sessionStorage.setItem('userEmail', value);  // Store useremail in sessionStorage
        sessionStorage.setItem('role', 'user');  
        console.log('Setting user email:', value);
        
      }

    registerUser(user: any): Observable<any> {
      return this.http.post(this.apiUrl+"registeruser", user);
    }

    checkemailpassword(user: any): Observable<any> {
        return this.http.post(this.apiUrl+"checkemailpassword", user);
    }

    registerpet(user: any): Observable<any> {
        return this.http.post(this.apiUrl+"registerpet", user);
    }


    getowneranimals(email: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}owneranimals?email=${email}`);    // email is sent as query parameter to backend 
    }


    getallpets(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}allpets`);

    }

    setadoptandprice(petid: number , price:number): Observable<any> {
    return this.http.put(`${this.apiUrl}setadoptandprice?id=${petid}&price=${price}` , {});   // put requires a body , but we set is_adopted in backend , so no body here
    }
    
    getleaders(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}leaders`);
    }

    setcount(email: string): Observable<any> {
        return this.http.put(`${this.apiUrl}setcount?email=${email}` , {});   
    }



}