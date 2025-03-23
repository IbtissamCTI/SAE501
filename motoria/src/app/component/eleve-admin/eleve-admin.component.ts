import { Component, OnInit } from '@angular/core';
import { EleveService } from '../../services/eleve.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-eleve-admin',
  templateUrl: './eleve-admin.component.html',
  styleUrls: ['./eleve-admin.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
})
export class EleveAdminComponent implements OnInit {
  users: any[] = [];
  newUser: any = {};
  editedUser: any = null;
  showAddForm: boolean = false;
  showEditForm: boolean = false;

  constructor(private eleveService: EleveService) {}

  ngOnInit(): void {
    this.loadEleves();
  }

  loadEleves(): void {
    this.eleveService.getEleves().subscribe(
      (data: any) => {
        this.users = data;
        console.log('Élèves chargés :', this.users); // Vérifiez les données chargées
      },
      (error) => {
        console.error('Erreur lors du chargement des élèves', error);
      }
    );
  }

  openAddForm(): void {
    console.log('Ouverture du formulaire d\'ajout'); // Vérifiez si cette méthode est appelée
    this.showAddForm = true;
    this.newUser = {};
  }

  closeAddForm(): void {
    console.log('Fermeture du formulaire d\'ajout'); // Vérifiez si cette méthode est appelée
    this.showAddForm = false;
  }

  addUser(): void {
    console.log('Ajout d\'un élève :', this.newUser); // Vérifiez les données du formulaire
    this.eleveService.addEleve(this.newUser).subscribe(
      (response) => {
        console.log('Réponse du serveur :', response);
        this.loadEleves();
        this.newUser = {};
        this.showAddForm = false;
      },
      (error) => console.error('Erreur lors de l\'ajout de l\'élève', error)
    );
  }

  editUser(user: any): void {
    console.log('Modification de l\'élève :', user); 
    this.editedUser = { ...user };
    this.showEditForm = true; 
  }

  updateUser(): void {
    console.log('Mise à jour de l\'élève :', this.editedUser); 
    this.eleveService.updateEleve(this.editedUser).subscribe(
      (response: any) => {
        console.log('Élève modifié :', response);
        this.loadEleves();
        this.editedUser = null;
      },
      (error) => {
        console.error('Erreur lors de la modification de l\'élève', error);
      }
    );
  }

  closeEditForm(): void {
    console.log('Fermeture du formulaire de modification'); // Vérifiez si cette méthode est appelée
    this.editedUser = null;
    this.showEditForm = false; // Assurez-vous que cette ligne est présente
  }
}



