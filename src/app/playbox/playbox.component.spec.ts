import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayboxComponent } from './playbox.component';

describe('PlayboxComponent', () => {
  let component: PlayboxComponent;
  let fixture: ComponentFixture<PlayboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
