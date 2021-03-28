import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { getMaskUserPassword } from './state/user.reducer';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';

  maskUserPassword: boolean;

  constructor(
    private store: Store<any>,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.store.select(getMaskUserPassword).subscribe(
      maskUserPassword => this.maskUserPassword = maskUserPassword,
    );
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(): void {
    this.store.dispatch(
      { type: '[User] Toggle Mask User Name' },
    );
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    }
  }
}
