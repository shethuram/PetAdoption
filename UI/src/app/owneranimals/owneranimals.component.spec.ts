import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwneranimalsComponent } from './owneranimals.component';

describe('OwneranimalsComponent', () => {
  let component: OwneranimalsComponent;
  let fixture: ComponentFixture<OwneranimalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwneranimalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwneranimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
