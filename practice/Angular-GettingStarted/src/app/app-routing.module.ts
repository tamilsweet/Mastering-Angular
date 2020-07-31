import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './shared/page-not-found.component';
import { SignupComponent } from './signup/signup.component';
import { UserSettingsFormComponent } from './user-settings-form/user-settings-form.component';

const ROUTES: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'settings', component: UserSettingsFormComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'customer', component: CustomerComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
