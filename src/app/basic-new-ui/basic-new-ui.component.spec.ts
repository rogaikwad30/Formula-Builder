import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicNewUiComponent } from './basic-new-ui.component';

describe('BasicNewUiComponent', () => {
  let component: BasicNewUiComponent;
  let fixture: ComponentFixture<BasicNewUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicNewUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicNewUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
