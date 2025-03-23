import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ScoreEtud } from '../models/score-etud';
import { Eleve } from '../models/eleve.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost/API_SAE/public/';

  constructor(private http: HttpClient) {}

  connexion(userData: any): Observable<any> {
    console.log('Appel à l\'API avec les données :', userData);
    return this.http.post('http://localhost/API_SAE/public/connexion_eleve.php', userData); // Assure-toi que l'URL est correcte
  }
  connexionAdmin(userData: any): Observable<any> {
    return this.http.post('http://localhost/API_SAE/public/connexion_admin.php', userData); // Assure-toi que l'URL est correcte
  }

  getScores(idEleve: number): Observable<ScoreEtud> {
    return this.http.post<ScoreEtud>('http://localhost/API_SAE/public/score_eleve.php', { id_eleve: idEleve });
  }

  getEleves(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(`${this.apiUrl}/eleves.php?action=getEleves`);
  }
  
}
