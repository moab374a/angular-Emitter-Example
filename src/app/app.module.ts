import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PostCreateComponent} from './posts/post-create/post-create-component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HeaderComponent} from './header/header.component';
import {PostListComponent} from './posts/post-list/post-list.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatRadioModule} from "@angular/material/radio";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from "@angular/material/paginator";
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AuthInterceptor} from "./auth/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
