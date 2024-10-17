import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { AuthRequest } from 'src/app/models/interfaces/auth/AuthRequest';
import { SingnupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';

import { UserService } from './../../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  loginCard: Boolean = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieServise: CookieService,
    private messageService: MessageService) { }

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as AuthRequest)
        .subscribe({
          next: (response: any) => {
            if (response) {
              this.cookieServise.set('USER_INFO', response?.token);
              this.loginForm.reset();
              this.successToastMessage(`Bem vindo de volta ${response.name}`);
            }
          },
          error: () => this.errorToastMessage(`Erro ao fazer login`)
        })
    }
  }

  onSubmitSignupForm(): void {
    if (this.signupForm.value && this.signupForm.valid) {
      this.userService.signupUser(this.signupForm.value as SingnupUserRequest)
        .subscribe({
          next: (response) => {
            if (response) {
              this.signupForm.reset();
              this.loginCard = true;
              this.successToastMessage(`Usuário criado com sucesso!`);
            }
          },
          error: (err) => this.errorToastMessage(`Erro ao criar usuário detalhes -> ${err.error.error}`)
        });
    }
  }

  successToastMessage(message: any): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: message,
      life: 2000
    });
  }

  errorToastMessage(message: any): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: message,
      life: 2000
    });
  }

}
