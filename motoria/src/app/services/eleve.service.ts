
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EleveService {
  private apiUrl = 'http://localhost/API_SAE/public/affiche_eleve.php';
  private addUrl = 'http://localhost/API_SAE/public/ajout_eleve.php'; 
  private apiUrlUpdate = 'http://localhost/API_SAE/public/modifier_eleve.php';



  constructor(private http: HttpClient) { }

  getEleves(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getEleveById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?id_eleve=${id}`);
  }

  addEleve(eleve: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.addUrl, JSON.stringify(eleve), { headers });
  }

  updateEleve(eleve: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.apiUrlUpdate, JSON.stringify(eleve), { headers: headers });
  }
}
