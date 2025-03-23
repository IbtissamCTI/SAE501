import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ScoreEtud } from '../../models/score-etud';
import { Eleve } from '../../models/eleve.model';
import { ChartData, ChartDataset } from '../../models/chart-data';

@Component({
  selector: 'app-espace-admin',
  imports: [],
  templateUrl: './espace-admin.component.html',
  styleUrl: './espace-admin.component.css'
})
export class EspaceAdminComponent implements OnInit {
  public eleves: Eleve[] = []; // Liste des élèves
  public selectedEleveId: number | null = null; // ID de l'élève sélectionné
  public chartData: ChartData | null = null; // Données du graphique
  public chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  constructor(private ApiService: ApiService) {}

  ngOnInit(): void {
    this.fetchEleves(); // Récupérer la liste des élèves au chargement du composant
  }
    // Récupérer la liste des élèves
    fetchEleves(): void {
      this.ApiService.getEleves().subscribe(
        (eleves: Eleve[]) => {
          this.eleves = eleves;
        },
        (error) => {
          console.error('Erreur lors de la récupération des élèves :', error);
        }
      );
    }
  
    // Récupérer les scores de l'élève sélectionné
    onEleveSelect(event: Event): void {
      const selectElement = event.target as HTMLSelectElement;
      this.selectedEleveId = parseInt(selectElement.value, 10);
  
      if (this.selectedEleveId) {
        this.ApiService.getScores(this.selectedEleveId).subscribe(
          (response: ScoreEtud) => {
            this.chartData = this.mapResponseToChartData(response);
          },
          (error) => {
            console.error('Erreur lors de la récupération des scores :', error);
          }
        );
      }
    }
  
    // Transformer les données de l'API en données pour Chart.js
    mapResponseToChartData(response: ScoreEtud): ChartData {
      return {
        labels: response.labels,
        datasets: [
          {
            label: 'Scores par thématique',
            data: response.values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
    }
  }


