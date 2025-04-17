// src/app/components/student-list/student-list.component.ts
import { Component, OnInit }      from '@angular/core';
import { CommonModule }           from '@angular/common';
import { RouterModule, Router }   from '@angular/router';
import { StudentService }         from '../../services/student.service';
import { Student }                from '../../models/student';
import {FormsModule} from "@angular/forms";

type DisplayStudent = Student & {
  displayIndex: number;
  studentId:    string;
  gender:       string;
  email:        string;
};

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,    // gives you *ngFor, *ngIf, etc.
    RouterModule,     // gives you [routerLink]
    FormsModule
  ],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: DisplayStudent[] = [];
  displayedStudents: DisplayStudent[] = [];
  genders = ['Male', 'Female', 'Non‑binary'];
  constructor(
    private svc: StudentService,
    private router: Router
  ) {}

  searchId = '';

  ngOnInit() {
    this.load();
  }

  load() {
    this.svc.getAll().subscribe(data => {
      this.students = data.map((s, idx) => {
        const sid    = this.generateStudentId();
        const email  = this.makeEmail(s.name, sid);
        return {
          ...s,
          displayIndex: idx + 1,
          studentId:    sid,
          gender: s.gender!,
          email:  s.email!
        };
      });
    });
  }

  applySearch() {
    if (!this.searchId.trim()) {
      this.displayedStudents = [...this.students];
    } else {
      this.displayedStudents = this.students.filter(s =>
        s.studentId.includes(this.searchId.trim())
      );
    }
  }
  get filteredStudents(): DisplayStudent[] {
    if (!this.searchId) {
      return this.students;
    }
    return this.students.filter(s =>
      s.studentId.includes(this.searchId)
    );
  }

  edit(id: number) {
    this.router.navigate(['/students', id]);
  }

  delete(id: number) {
    this.svc.delete(id).subscribe(() => this.load());
  }

  private generateStudentId(): string {
    // e.g. “S2025-” + random 4 digits
    return Math.floor(100000  + Math.random() * 900000).toString();
  }

  private makeEmail(name: string, sid: string): string {
    const clean = name.trim().toLowerCase().replace(/\s+/g, '.');
    return `${clean}.${sid.toLowerCase()}@school.edu`;
  }
}
