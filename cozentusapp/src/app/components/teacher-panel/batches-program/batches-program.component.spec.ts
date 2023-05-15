import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchesProgramComponent } from './batches-program.component';

describe('BatchesProgramComponent', () => {
  let component: BatchesProgramComponent;
  let fixture: ComponentFixture<BatchesProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchesProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchesProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
