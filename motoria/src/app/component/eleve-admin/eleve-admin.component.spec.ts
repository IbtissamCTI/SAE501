import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleveAdminComponent } from './eleve-admin.component';

describe('EleveAdminComponent', () => {
  let component: EleveAdminComponent;
  let fixture: ComponentFixture<EleveAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EleveAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EleveAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
