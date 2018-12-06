import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuxeComponent } from './chuxe.component';

describe('ChuxeComponent', () => {
  let component: ChuxeComponent;
  let fixture: ComponentFixture<ChuxeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChuxeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChuxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
