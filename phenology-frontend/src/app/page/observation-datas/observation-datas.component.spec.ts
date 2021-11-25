import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationDatasComponent } from './observation-datas.component';

describe('ObservationDatasComponent', () => {
  let component: ObservationDatasComponent;
  let fixture: ComponentFixture<ObservationDatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservationDatasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
