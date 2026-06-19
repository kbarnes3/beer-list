import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerTableComponent } from './beer-table.component';

describe('BeerTableComponent', () => {
  let component: BeerTableComponent;
  let fixture: ComponentFixture<BeerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeerTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
