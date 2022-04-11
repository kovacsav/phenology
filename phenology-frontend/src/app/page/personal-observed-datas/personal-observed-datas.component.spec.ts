import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalObservedDatasComponent } from './personal-observed-datas.component';

describe('PersonalObservedDatasComponent', () => {
  let component: PersonalObservedDatasComponent;
  let fixture: ComponentFixture<PersonalObservedDatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalObservedDatasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalObservedDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
