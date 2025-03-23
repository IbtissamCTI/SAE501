import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceEleveComponent } from './espace-eleve.component';

describe('EspaceEleveComponent', () => {
  let component: EspaceEleveComponent;
  let fixture: ComponentFixture<EspaceEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspaceEleveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
