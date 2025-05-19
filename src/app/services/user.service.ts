import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../classes/user';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  userURL:string="https://localhost:7158/api/User"

  constructor(private http:HttpClient) { }
  getAllUsers():Observable<Array<User>>
  {
    console.log('הפונקציה getAllUsers קראה את כל ');
    return this.http.get<Array<User>>(this.userURL)//נפתח צינו של הבקשה וברגע שהי אתגיע נפתח PULSE של מידע 
  } 

  getUserByID(userId:number): Observable<User>{
    return this.http.get<User>(`${this.userURL}/${userId}`,{responseType:'text' as 'json'})

  }
  deleteUser(userId:Number) : Observable<any>{
    return this.http.delete(`${this.userURL}/${userId}`)
  }
  editUser(userId:Number,newUser: User):Observable<any>{
  return this.http.put(`${this.userURL}/${userId}`,newUser)

  }
  addUser(newUser: User): Observable<any> {


    return this.http.post(this.userURL, newUser).pipe(
      tap(response => {
        console.log('User added successfully:', response);
      }),
      catchError(error => {
        console.error('Error adding user:', error);
        return throwError(error);
      })
    );
  }
  
}


