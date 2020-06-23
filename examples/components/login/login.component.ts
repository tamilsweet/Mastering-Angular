
export class LoginComponent {
  loginInvalid = false;

  constructor(private authService: AuthService, private router: Router) { }

  login(formValues) {
    this.authService.loginUser(formValues.username, formValues.password)
      .subscribe(resp => {
        if (!resp) {
          this.loginInvalid = true;
        } else {
          // Login success
          this.router.navigate(['dashboard']);
        }
      })
  }
}