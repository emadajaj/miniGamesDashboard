import { NgModule } from '@angular/core';
import { RouterModule, Routes as NgRoutes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LikeCardsTableComponent } from './components/like-cards-table/like-cards-table.component';
import { GameTableComponent } from './components/game-table/game-table.component';
import { ProductsTableComponent } from './components/products/products.component';
import { MetricsDashboardComponent } from './components/metrics-dashboard/metrics-dashboard.component';
import { GameUsersTableComponent } from './components/game-users-table/game-users-table.component';
import { StoreComponent } from './components/store/store.component';
import { GameComponent } from './components/game/game.component';
import { ProductsSerialsTableComponent } from './components/products-serials/products-serials-table.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { GemsLogTableComponent } from './components/gems-log/gems-log-table.component';
import { LikeCardTransactionTableComponent } from './components/like-card-transaction/like-card-transaction-table.component';
import { MileStonesTableComponent } from './components/mile-stones/mile-stones.component';
import { GameUsersLogTableComponent } from './components/game-users-log/game-users-log.component';
import { TopPlayersLogTableComponent } from './components/top-players-log/top-players-log.component';
import { RankingAwardsTableComponent } from './components/ranking-awards/ranking-awards.component';
import { GamePrizesTableComponent } from './components/game-prizes/game-prizes.component';
import { BoxPrizesTableComponent } from './components/box-prizes/box-prizes.component';
import { MessageTableComponent } from './components/message/message.component';
import { GameSettingsComponent } from './components/game-settings/game-settings.component';

export const routes: NgRoutes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent ,
    children : [
      { path: 'store', 
        component: StoreComponent, 
        canActivate: [AuthGuard],
        children: [ 
          { path: 'like-card', component: LikeCardsTableComponent },
          { path: 'products', component: ProductsTableComponent },
          { path: 'products-serials', component: ProductsSerialsTableComponent },
          { path: 'orders', component: OrdersTableComponent },
          { path: 'gems-log', component: GemsLogTableComponent },
          { path: 'like-card-transaction', component: LikeCardTransactionTableComponent },
        ] 
      },
      { path: 'games', 
        component: GameComponent, 
        canActivate: [AuthGuard],
        children: [
          { path: 'games', component: GameTableComponent},
        ] 
      },
      { path: 'users', 
        component: GameUsersTableComponent, 
        canActivate: [AuthGuard],
      },
      { path: 'metrics', 
        component: MetricsDashboardComponent, 
        canActivate: [AuthGuard],
      },
      { path: 'mile-stones', 
        component: MileStonesTableComponent, 
        canActivate: [AuthGuard],
        children: [
          { path: `$id`, component: GameTableComponent},
        ] 
      },
      { path: 'game-users-log', 
        component: GameUsersLogTableComponent, 
        canActivate: [AuthGuard],
      },
      { path: 'top-players-log', 
        component: TopPlayersLogTableComponent, 
        canActivate: [AuthGuard],
      },
      { path: 'ranking-awards', 
        component: RankingAwardsTableComponent, 
        canActivate: [AuthGuard],
      },
      { path: 'game-prizes', 
        component: GamePrizesTableComponent, 
        canActivate: [AuthGuard],
      },
      { path: 'box-prizes', 
        component: BoxPrizesTableComponent, 
        canActivate: [AuthGuard],
      },
      { path: 'message', 
        component: MessageTableComponent, 
        canActivate: [AuthGuard],
      },
      
      
    ]
  },
  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
