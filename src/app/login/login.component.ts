import { LoginService } from './../shared/services/login.service';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
/**
 * Component of login, is responsible for managing access to the application by attacking the
 * `AuthenticationService` service
 *
 *
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login ',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('loadingState', [
      state('active', style({
        overflow: 'hidden',        
        
      })),
      state('inactive', style({
        opacity: '0',
        overflow: 'hidden',
        height: '0px',
        width: '0px'
      })),
      transition('inactive => active', animate('1000ms ease-in')),
      transition('active => inactive', animate('1000ms ease-out'))
    ])
  ]
})
export class LoginComponent implements OnInit {

  private returnUrl: string;


  public model: { username: string, password: string } = <{ username: string, password: string }>{};


  public loading = false;


  public haveError = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) { }

  public login() {
    this.loading = true;
    setTimeout(
      () => {
        this.loading = false;
        const user = this.loginService.login(this.model);
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigateByUrl('admin');        
      },
      1100
    );


  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
}
