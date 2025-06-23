import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../classes/user';
import { catchError, tap,map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

   private apiUrl = "https://localhost:7158/api/Login";
  userURL:string="https://localhost:7158/api/User"
  public currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();


  constructor(private http:HttpClient) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
   }
   }
  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return token
      ? new HttpHeaders({ 'Authorization': `Bearer ${token}` })
      : new HttpHeaders();
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      this.userURL,
      { headers: this.authHeaders() }
    );
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
      .pipe(
      tap(user => {
        console.log('User received:', user);
        if (user) {
        this.setCurrentUser(user); // שמירה גם ב-localStorage
        }
      })
      );
  }
  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    window.location.reload();
    window.location.href = '/';
  
   
  }
  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  
  
   isManager(user1: User,password1:string): Observable<boolean> {
  if (typeof user1 === 'string') {
        user1 = JSON.parse(user1);  
  }
  const user: User = {
    userId: user1.userId,
    username: user1.username,
    password: password1,
    lastName: user1.lastName,
    phone: user1.phone,
    address: user1.address,
    email: user1.email
  };
  const url = "https://localhost:7158/api/Login";
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.http.post<{ token: string }>(url, user, { headers }).pipe(
    map((response) => {
      console.log('Full response:', response);
      console.log('Token received:', response.token);
      localStorage.setItem('authToken', response.token); // שמירת הטוקן ב-localStorage
      return true; // מחזיר true אם הבקשה הצליחה
    }),
    catchError((error) => {
      return [false]; // מחזיר false אם הבקשה נכשלה
    })
  );
}
   


}