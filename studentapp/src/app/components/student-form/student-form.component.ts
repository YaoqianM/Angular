// src/app/components/student-form/student-form.component.ts
import { Component, OnInit }      from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormsModule }            from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService }         from '../../services/student.service';
import { Student }                from '../../models/student';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    CommonModule,  // for *ngIf, etc. if you use them
    FormsModule    // for [(ngModel)]
  ],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  genders = ['Male', 'Female', 'Non‑binary'];
  student: Student = {
    name:      '',
    age:       0,
    major:     '',
    studentId: '',
    gender:    this.genders[0],
    email:     ''
  };

  constructor(
    private svc: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // editing existing – load from API
      this.svc.get(+id).subscribe(s => this.student = s);
    } else {
      // new – seed ID & email
      this.initializeNew();
    }
  }

  initializeNew() {
    this.student.studentId = this.generateStudentId();
    this.student.email     = this.makeEmail(this.student.name, this.student.studentId);
  }
  save() {
    // regenerate email in case name changed
    this.student.email = this.makeEmail(this.student.name, this.student.studentId!);

    const op = this.student.id
      ? this.svc.update(this.student)
      : this.svc.create(this.student);

    op.subscribe(() => this.router.navigate(['/students']));
  }

  private generateStudentId(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private makeEmail(name: string, sid: string): string {
    const clean = name.trim().toLowerCase().replace(/\s+/g, '.');
    return `${clean}.${sid}@school.edu`;
  }
}
