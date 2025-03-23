import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilConnexionComponent } from './accueil-connexion.component';

describe('AccueilConnexionComponent', () => {
  let component: AccueilConnexionComponent;
  let fixture: ComponentFixture<AccueilConnexionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilConnexionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
