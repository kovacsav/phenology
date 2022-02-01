import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservedDatasComponent } from './observed-datas.component';

describe('ObservedDatasComponent', () => {
  let component: ObservedDatasComponent;
  let fixture: ComponentFixture<ObservedDatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservedDatasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservedDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
