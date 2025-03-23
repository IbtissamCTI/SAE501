import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisrubriqueComponent } from './avisrubrique.component';

describe('AvisrubriqueComponent', () => {
  let component: AvisrubriqueComponent;
  let fixture: ComponentFixture<AvisrubriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvisrubriqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvisrubriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
