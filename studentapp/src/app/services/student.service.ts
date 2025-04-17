import { Injectable }  from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { Observable }  from 'rxjs';
import { Student }     from '../models/student';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private api = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) {}

  getAll():    Observable<Student[]>       { return this.http.get<Student[]>(this.api); }
  get(id: number): Observable<Student>    { return this.http.get<Student>(`${this.api}/${id}`); }
  create(s: Student): Observable<Student> { return this.http.post<Student>(this.api, s); }
  update(s: Student): Observable<Student> { return this.http.put<Student>(`${this.api}/${s.id}`, s); }
  delete(id: number): Observable<void>    { return this.http.delete<void>(`${this.api}/${id}`); }
}
