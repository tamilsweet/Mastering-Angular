import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AddHeaderInterceptor } from 'app/core/add-header.interceptor';
import { AppComponentsList, AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookTrackerErrorHandlerService } from './core/book-tracker-error-handler.service';
import { CoreModule } from './core/core.module';
import { LogResponseInterceptor } from './core/log-response.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AppComponentsList
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: BookTrackerErrorHandlerService },
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LogResponseInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
