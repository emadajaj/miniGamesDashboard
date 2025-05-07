import { ProductsSerialsTableComponent } from './components/products-serials/products-serials-table.component';
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
import { PopUpWithDataComponent } from './components/pop-up-with-data/pop-up-with-data.component';
import { ProductManagerStoreModule } from './stores/like-card-products-management-store/like-card-products-manager-store.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProductsTableComponent } from './components/products/products.component';
import { ProductsManagerStoreModule } from './stores/products-management-store/products-manager-store.module';
import { StoreComponent } from './components/store/store.component';
import { GameComponent } from './components/game/game.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { GemsLogTableComponent } from './components/gems-log/gems-log-table.component';
import { LikeCardTransactionTableComponent } from './components/like-card-transaction/like-card-transaction-table.component';
import { MileStonesTableComponent } from './components/mile-stones/mile-stones.component';
import { GameUsersLogTableComponent } from './components/game-users-log/game-users-log.component';
import { TopPlayersLogTableComponent } from './components/top-players-log/top-players-log.component';
import { RankingAwardsTableComponent } from './components/ranking-awards/ranking-awards.component';
import { GamePrizesTableComponent } from './components/game-prizes/game-prizes.component';
import { BoxPrizesTableComponent } from './components/box-prizes/box-prizes.component';
import { BottomPopUopComponent } from './components/bottom-pop-up/bottom-pop-up.component';
import { MessageTableComponent } from './components/message/message.component';
import { GameSettingsComponent } from './components/game-settings/game-settings.component';

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
    LikeCardsTableComponent,
    PopUpWithDataComponent,
    ProductsTableComponent,
    StoreComponent,
    GameComponent,
    ProductsSerialsTableComponent,
    OrdersTableComponent,
    GemsLogTableComponent,
    LikeCardTransactionTableComponent,
    MileStonesTableComponent,
    GameUsersLogTableComponent,
    TopPlayersLogTableComponent,
    RankingAwardsTableComponent,
    GamePrizesTableComponent,
    BoxPrizesTableComponent,
    MessageTableComponent,
    BottomPopUopComponent,
    GameSettingsComponent

  ],
  imports: [
    RouterModule,
    ProductManagerStoreModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ProductsManagerStoreModule,
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
    BrowserAnimationsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true,
      trace: false,
    }),
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
