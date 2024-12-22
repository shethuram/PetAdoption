import { Routes } from '@angular/router';
import { OwneranimalsComponent } from './owneranimals/owneranimals.component';
import { OwnerformComponent } from './ownerform/ownerform.component';
import { UserformComponent } from './userform/userform.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { InfoComponent } from './info/info.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/firstpage', pathMatch: 'full' },
     { path: 'firstpage', component: FirstpageComponent },
     {path:'register',component:RegisterComponent},
     {path:'info',component:InfoComponent},
     {path:'login',component:LoginComponent},
     { path: 'ownerform', component: OwnerformComponent , canActivate:[AuthGuard] , data: { role: 'owner' } },
     { path: 'my-animals', component: OwneranimalsComponent ,canActivate:[AuthGuard] , data: { role: 'owner' } },
     { path: 'userform', component: UserformComponent,canActivate:[AuthGuard] , data: { role: 'user' } },
     {path: 'leaderboard', component: LeaderboardComponent,canActivate:[AuthGuard] , data: { role: 'user' } },
     { path: '**', redirectTo: '/firstpage' },
];
