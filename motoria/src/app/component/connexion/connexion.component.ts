import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms'; // Import de FormsModule
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router'; // Import du Router


@Component({
  selector: 'app-connexion',
  imports: [FormsModule], 
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'], 
})
export class ConnexionComponent {
  login = '';
  psswrd = '';
  message = '';

  constructor(private apiService: ApiService, private router: Router) {}

  connexion(): void {
    console.log('Méthode login appelée');
    
    if (!this.login || !this.psswrd) {
      this.message = "Veuillez remplir tous les champs.";
      return;
    }
  
    const userData = { login: this.login, psswrd: this.psswrd };
    
    this.apiService.connexion(userData).subscribe(
      (response: any) => {
        this.router.navigate(['/EspaceEleve']);

      },
      (error: any) => { 
        console.error('Erreur : ', error);
        this.message = "Erreur de connexion. Veuillez réessayer.";

      }
    );
  }

 
  
  
}


