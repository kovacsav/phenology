import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './page/article/article.component';
import { ChallengeComponent } from './page/challenge/challenge.component';
import { FullArticleComponent } from './page/full-article/full-article.component';
import { DetailedPlantGuideComponent } from './page/guide/detailed-plant-guide/detailed-plant-guide.component';
import { GuideComponent } from './page/guide/guide.component';
import { IndividualPlantGuideComponent } from './page/guide/individual-plant-guide/individual-plant-guide.component';
import { HistoryComponent } from './page/history/history.component';

import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { ObservationDatasComponent } from './page/observation-datas/observation-datas.component';
import { ObservedDatasComponent } from './page/observed-datas/observed-datas.component';
import { RegisterComponent } from './page/register/register.component';


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
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'article',
    component: ArticleComponent,
  },
  {
    path: 'details/:id',
    component: FullArticleComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: 'challenge',
    component: ChallengeComponent,
  },
  {
    path: 'data',
    component: ObservedDatasComponent,
  },
  {
    path: 'guide',
    component: GuideComponent,
  },
  {
    path: 'plant',
    component: DetailedPlantGuideComponent,
  },
  {
    path: 'plant/:id',
    component: IndividualPlantGuideComponent,
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
