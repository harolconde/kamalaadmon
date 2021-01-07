import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsDeBellezaComponent } from './tips-de-belleza.component';

describe('TipsDeBellezaComponent', () => {
  let component: TipsDeBellezaComponent;
  let fixture: ComponentFixture<TipsDeBellezaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipsDeBellezaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsDeBellezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
