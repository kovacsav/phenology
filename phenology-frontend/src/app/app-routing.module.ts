import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './page/article/article.component';
import { GuideComponent } from './page/guide/guide.component';
import { HistoryComponent } from './page/history/history.component';

import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { ObservationDatasComponent } from './page/observation-datas/observation-datas.component';
import { ObserverComponent } from './page/observer/observer.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'observation',
    component: ObservationDatasComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'article',
    component: ArticleComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: 'observer',
    component: ObserverComponent,
  },
  {
    path: 'guide',
    component: GuideComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
