import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfrimationComponent } from './delete-confrimation.component';

describe('DeleteConfrimationComponent', () => {
  let component: DeleteConfrimationComponent;
  let fixture: ComponentFixture<DeleteConfrimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteConfrimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConfrimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
