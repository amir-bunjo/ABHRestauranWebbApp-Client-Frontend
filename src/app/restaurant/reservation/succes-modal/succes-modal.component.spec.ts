import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesModalComponent } from './succes-modal.component';

describe('SuccesModalComponent', () => {
  let component: SuccesModalComponent;
  let fixture: ComponentFixture<SuccesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
