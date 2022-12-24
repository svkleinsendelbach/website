import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ImprintComponent } from './pages/imprint/imprint.component';
import { PrivacyComponent } from './pages/about-us/privacy/privacy.component';
import { RequestComponent } from './pages/about-us/request/request.component';
import { StatuteComponent } from './pages/about-us/statute/statute.component';
import { ChronicleComponent } from './pages/about-us/chronicle/chronicle.component';
import { SportshomeComponent } from './pages/about-us/sportshome/sportshome.component';
import { ManagersComponent } from './pages/about-us/managers/managers.component';

const routes: Routes = [
  { path: 'über-uns', component: ManagersComponent },
  { path: 'sportheim', component: SportshomeComponent },
  { path: 'chroniken', component: ChronicleComponent },
  { path: 'satzung', component: StatuteComponent },
  { path: 'datenschutz', component: PrivacyComponent },
  { path: 'mitgliedsantrag', component: RequestComponent },
  { path: 'impressum', component: ImprintComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
