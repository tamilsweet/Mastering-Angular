import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from 'app/core/module-import-guard';
import { BookTrackerErrorHandlerService } from './book-tracker-error-handler.service';
import { DataService } from './data.service';
import { LoggerService } from './logger.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    LoggerService,
    DataService,
    { provide: ErrorHandler, useClass: BookTrackerErrorHandlerService }
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

}
