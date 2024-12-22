import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerformComponent } from './ownerform.component';

describe('OwnerformComponent', () => {
  let component: OwnerformComponent;
  let fixture: ComponentFixture<OwnerformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
