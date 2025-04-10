import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { GameTableComponent } from './components/game-table/game-table.component';
import { HeaderComponent } from './components/header/header.component';
import { MetricsDashboardComponent } from './components/metrics-dashboard/metrics-dashboard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { routes } from './app-routing.module';
import { GameUsersTableComponent } from './components/game-users-table/game-users-table.component';
import { PopUpComponent } from './components/popUp/pop-up.component';
import { LoadingManagerStoreModule } from './stores/loading-management-store/loading-manager-store.module';
import { AuthManagerStoreModule } from './stores/auth-management-store/auth-manager-store.module';
import { LoadingComponent } from './components/loading/loading.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LikeCardsTableComponent } from './components/like-cards-table/like-cards-table.component';

@NgModule({
  declarations:[ 
    GameTableComponent,
    HeaderComponent,
    MetricsDashboardComponent,
    DashboardComponent,
    AppComponent,
    LoginComponent,
    GameUsersTableComponent,
    PopUpComponent,
    LoadingComponent,
    LikeCardsTableComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    LoadingManagerStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ToastrModule.forRoot({
      timeOut: 3000, // Duration for which the toast is shown
      preventDuplicates: true, // Prevent duplicate toasts
    }),
    AuthManagerStoreModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
