import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualPlantGuideComponent } from './individual-plant-guide.component';

describe('IndividualPlantGuideComponent', () => {
  let component: IndividualPlantGuideComponent;
  let fixture: ComponentFixture<IndividualPlantGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualPlantGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualPlantGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
