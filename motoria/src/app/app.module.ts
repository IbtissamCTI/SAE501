import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { AccueilComponent } from './component/accueil/accueil.component';
import { AvisrubriqueComponent } from './component/avisrubrique/avisrubrique.component';
import { FooterComponent } from './component/footer/footer.component';
import { ConnexionComponent } from './component/connexion/connexion.component'; // Ajout de l'importation du composant
import { HttpClientModule } from '@angular/common/http';
import { AccueilConnexionComponent } from './component/accueil-connexion/accueil-connexion.component';
import { CommonModule } from '@angular/common'; // Importez CommonModule
import { EleveService } from './services/eleve.service'; // Importez le service



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccueilComponent,
    AvisrubriqueComponent,
    FooterComponent,
    
    
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ConnexionComponent,
    AccueilConnexionComponent,
    CommonModule,
    
  ],
  providers: [ApiService, EleveService],
  bootstrap: [AppComponent]
})
export class AppModule { }

