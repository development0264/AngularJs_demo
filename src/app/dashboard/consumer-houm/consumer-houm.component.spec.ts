import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerHoumComponent } from './consumer-houm.component';

describe('ConsumerHoumComponent', () => {
  let component: ConsumerHoumComponent;
  let fixture: ComponentFixture<ConsumerHoumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerHoumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerHoumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
