import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './component/accueil/accueil.component';
import { AvisrubriqueComponent } from './component/avisrubrique/avisrubrique.component';
import { ConnexionComponent} from './component/connexion/connexion.component';
import { ConnexionAdminComponent } from './component/connexion-admin/connexion-admin.component';
import { EspaceEleveComponent } from './component/espace-eleve/espace-eleve.component';
import { AccueilConnexionComponent } from './component/accueil-connexion/accueil-connexion.component';
import { EspaceAdminComponent } from './component/espace-admin/espace-admin.component';
import { EleveAdminComponent } from './component/eleve-admin/eleve-admin.component';


const routes: Routes = [
  {path: '', component: AccueilComponent},
  {path: 'avis-rubrique', component: AvisrubriqueComponent },
  {path: 'Accueil', component: AccueilComponent},
  {path: 'EspaceEleve', component: EspaceEleveComponent},
  { path: 'accueilConnexion', component: AccueilConnexionComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'EspaceAdmin', component: EspaceAdminComponent},
  { path: 'connexionAdmin', component: ConnexionAdminComponent},
  { path: 'EleveAdmin', component: EleveAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
