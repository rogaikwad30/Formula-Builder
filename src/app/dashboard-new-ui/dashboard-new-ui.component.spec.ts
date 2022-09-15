import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNewUiComponent } from './dashboard-new-ui.component';

describe('DashboardNewUiComponent', () => {
  let component: DashboardNewUiComponent;
  let fixture: ComponentFixture<DashboardNewUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardNewUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardNewUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
