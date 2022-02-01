import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedPlantGuideComponent } from './detailed-plant-guide.component';

describe('DetailedPlantGuideComponent', () => {
  let component: DetailedPlantGuideComponent;
  let fixture: ComponentFixture<DetailedPlantGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedPlantGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedPlantGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
