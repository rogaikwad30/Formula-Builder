import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalNewUiComponent } from './final-new-ui.component';

describe('FinalNewUiComponent', () => {
  let component: FinalNewUiComponent;
  let fixture: ComponentFixture<FinalNewUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalNewUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalNewUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
