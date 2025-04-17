import { bootstrapApplication }    from '@angular/platform-browser';
import { importProvidersFrom }     from '@angular/core';
import { AppComponent }            from './app/app.component';
import { HttpClientModule }        from '@angular/common/http';
import { FormsModule }             from '@angular/forms';
import { RouterModule, Routes }    from '@angular/router';

import { StudentListComponent } from './app/components/student-list/student-list.component';
import { StudentFormComponent } from './app/components/student-form/student-form.component';

// your routes (you’ll create these components next)
const routes: Routes = [
  { path: 'students',       component: StudentListComponent },
  { path: 'students/add',   component: StudentFormComponent },
  { path: 'students/:id',   component: StudentFormComponent },
  { path: '', redirectTo: '/students', pathMatch: 'full' }
];

bootstrapApplication(AppComponent, {
  providers: [
    // make HttpClient, forms & routing available app‑wide
    importProvidersFrom(
      HttpClientModule,
      FormsModule,
      RouterModule.forRoot(routes)
    )
  ]
})
  .catch(err => console.error(err));
