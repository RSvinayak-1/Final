import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseSettingComponent } from './expense-setting.component';

describe('ExpenseSettingComponent', () => {
  let component: ExpenseSettingComponent;
  let fixture: ComponentFixture<ExpenseSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExpenseSettingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
