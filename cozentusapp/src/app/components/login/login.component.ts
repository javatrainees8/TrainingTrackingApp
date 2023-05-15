import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginserviceService } from 'src/services/loginservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  profileForm = {
    username: '',
    password: ''
  };
  loginSuccess = false;
  loginError = false;
  teacherLoginSuccess=false;
  teacherLoginError=false

  constructor(private formBuilder: FormBuilder, private route: Router, private loginservice: LoginserviceService) { }

  hide = false;

  ngOnInit(): void {
  }

  OnSubmit() {
    if ((this.profileForm.username !== '' && this.profileForm.password !== '') && (this.profileForm.username !== null && this.profileForm.password !== null)) {
      this.loginservice.login(this.profileForm.username, this.profileForm.password)
        .subscribe(
          data => {
            this.loginservice.setToken(data.token);
            if (data.role === 'ROLE_ADMIN') {
              this.loginservice.isAdmin;
              this.loginSuccess = true;
              setTimeout(() => {
                this.route.navigate(['/courses']);
              }, 2000);
            } else if (data.role === 'ROLE_TEACHER') {
              this.loginservice.isTeacher;
              this.teacherLoginSuccess = true;
              setTimeout(() => {
                this.route.navigate(['/teacher-panel']);
              }, 2000);
            } else {
              console.error('Invalid role:', data.role);
              this.loginError = true;
            }
          },
          error => {
            console.error(error);
            this.loginError = true;
          }
        );
    }
  }
}
