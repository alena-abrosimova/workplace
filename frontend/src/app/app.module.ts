import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppDateAdapter, MAT_DATE_FNS_DATE_FORMATS } from './app.date-adapter';
import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppHeaderModule } from './app-header';
import { AppSidebarModule } from './app-sidebar';
import { AppGuard } from './app.guard';
import { appServiceFactory, DEFAULT_FORM_FIELD_OPTIONS } from './app.data';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getRusPaginatorIntl } from 'ng-project-helper';
import { ErrorInterceptor, LogoutInterceptor, TokenInterceptor } from './interceptors';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'x-csrftoken'
    }),
    RouterModule.forRoot(APP_ROUTES, {relativeLinkResolution: 'legacy'}),
    ToastrModule.forRoot({positionClass: 'toast-top-center', tapToDismiss: true}),
    FlexLayoutModule,
    AppHeaderModule,
    AppSidebarModule
  ],
  providers: [
    AppGuard,
    AppService,
    {provide: APP_INITIALIZER, useFactory: appServiceFactory, deps: [AppService], multi: true},
    {provide: MatPaginatorIntl, useValue: getRusPaginatorIntl()},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LogoutInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_DATE_FORMATS},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: DEFAULT_FORM_FIELD_OPTIONS},
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
