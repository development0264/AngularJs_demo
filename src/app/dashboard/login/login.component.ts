import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API,BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  password: string = "";
  userId: string= "";
  constructor(private baseService: BaseService,private router: Router) { }

  ngOnInit(): void {
    if((atob(localStorage.getItem('authenticated')) == "true") && (atob(localStorage.getItem('toke')))){
      this.router.navigate(['/houm-build']);
    }
  }

  async login(){
    this.baseService.doRequest(API.login, "POST", {
      "email": this.userId,
      "password": this.password
      })
      .subscribe((response: any) => {
        console.log(response);
        if(response.status == "success"){
          localStorage.setItem('authenticated',btoa('true'));
          localStorage.setItem('token',btoa(response.data));
          this.router.navigate(['/houm-build']);
        }else{
          alert("Invalid Credentials, Please try again");
        }
      }, error => {
        alert(error.error.message);
      });
  }
}
