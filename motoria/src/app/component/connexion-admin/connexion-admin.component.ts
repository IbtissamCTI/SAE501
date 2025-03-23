import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import de FormsModule
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router'; // Import du Router
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-connexion-admin',
  imports: [FormsModule],
  templateUrl: './connexion-admin.component.html',
  styleUrl: './connexion-admin.component.css'
})
export class ConnexionAdminComponent {
  login='';
  psswrd = '';
  message = '';

  constructor(private apiService: ApiService, private router: Router) {}

  connexionAdmin() {

    if (!this.login || !this.psswrd) { 
      this.message = "Veuillez remplir tous les champs.";
      return;
    }

    const userData = {
      login: this.login,
      psswrd: this.psswrd
    };

    this.apiService.connexionAdmin(userData).subscribe(
      (response: any) => {
        this.router.navigate(['/EleveAdmin']);
      },
      (error: any) => {
        console.error('Erreur : ', error);
        this.message = "Erreur lors de la connexion. Veuillez vĂ©rifier vos identifiants.";
      }
    );
  }
}