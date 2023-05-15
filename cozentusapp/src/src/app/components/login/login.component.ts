import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginserviceService } from 'src/app/services/loginservice.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit {
  profileForm ={
    username: '',
    password:  ''
  };
  constructor(private formBuilder: FormBuilder,private route: Router,private loginservice:LoginserviceService){}
  hide=true;
ngOnInit(): void {
}



//(ngSubmit)="OnSubmit()"

 OnSubmit() {
    if((this.profileForm.username !='' && this.profileForm.password!= '') && (this.profileForm.username!=null && this.profileForm.password !=null) ){
      this.loginservice.login(this.profileForm.username, this.profileForm.password)
      /*.subscribe(
        data => {
          this.loginservice.setToken(data.token);
          if (data.role === 'ROLE_ADMIN') {
            this.loginservice.isAdmin;
            this.route.navigate(['/courses']);
          } else if (data.role === 'ROLE_TEACHER') {
            this.loginservice.isTeacher;
            this.route.navigate(['/teacher-panel']);
          } else {
            console.error('Invalid role:',data.role);
          }
        },
        error => {
          console.error(error);
          // Display error message to the user
        }
      );
  }
} 

}*/
    }
  }
}