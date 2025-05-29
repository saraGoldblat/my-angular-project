import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../classes/user';
import { catchError, tap,map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  userURL:string="https://localhost:7158/api/User"
  public currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();


  constructor(private http:HttpClient) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
   }
   }
  getAllUsers():Observable<Array<User>>
  {

  
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
  getUserByNagmeAndPassword(userName: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.userURL}/${userName}/${password}`, { responseType: 'text' as 'json' })
      .pipe(tap(user => {
        if (user) {
          this.setCurrentUser(user); // שמירה גם ב-localStorage
        }
      }));
  }
  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  
   
  }
  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  
 
  isManager(user: User): Observable<boolean> {
    return this.http.post<{ Token: string }>('https://localhost:7158/api/Login',   user,
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
    
      map((response) => {
        console.log("בדיקה ")
        const token = response.Token; // קבלת הטוקן מהשרת
        console.log("token: ",token)
        localStorage.setItem('authToken', token); // שמירת הטוקן ב-localStorage
        return true; // המשתמש הוא מנהל
      }),
      catchError((error) => {
         console.error("Error occurred:", error);
        if (error.status === 401) {
          return [false]; // המשתמש אינו מנהל
        }
        throw error; // טיפול בשגיאות אחרות
      })
    );
  }

  // isManager(user: User):boolean{
  //   if( user.username=='aaa'&&user.password=='1234567')
  //     return true ;
  //   return false;

  // }
}


