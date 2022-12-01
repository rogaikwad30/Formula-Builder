import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFinalComponent } from './new-final.component';

describe('NewFinalComponent', () => {
  let component: NewFinalComponent;
  let fixture: ComponentFixture<NewFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
