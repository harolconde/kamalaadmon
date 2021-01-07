import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarProductosComponent } from './administrar-productos.component';

describe('AdministrarProductosComponent', () => {
  let component: AdministrarProductosComponent;
  let fixture: ComponentFixture<AdministrarProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
