import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './shared/page-not-found.component';
import { UserSettingsFormComponent } from './user-settings-form/user-settings-form.component';
import { SignupComponent } from './signup/signup.component';
import { CustomerComponent } from './customer/customer.component';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './products/product-data';

/* Feature Module */
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { MessagesModule } from './messages/messages.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    UserSettingsFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProductsModule,
    UserModule,
    MessagesModule,
    InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
