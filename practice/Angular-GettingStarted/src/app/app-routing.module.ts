import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './shared/page-not-found.component';
import { UserSettingsFormComponent } from './user-settings-form/user-settings-form.component';
import { SignupComponent } from './signup/signup.component';
import { CustomerComponent } from './customer/customer.component';

export const AppComponentList = [
  WelcomeComponent,
  PageNotFoundComponent,
  SignupComponent,
  CustomerComponent
];

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'settings', component: UserSettingsFormComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'customer', component: CustomerComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
