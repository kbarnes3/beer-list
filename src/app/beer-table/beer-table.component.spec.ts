import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { BeerTableComponent } from './beer-table.component';

describe('BeerTableComponent', () => {
  let component: BeerTableComponent;
  let fixture: ComponentFixture<BeerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeerTableComponent, NoopAnimationsModule]
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
