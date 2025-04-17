export interface Student {
  id?:        number;
  name:       string;
  age:        number;
  major:      string;

  // new, optional for front‑end display & form
  studentId?: string;
  gender?:    string;
  email?:     string;
}
