import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSwitchComponent } from './icon-switch.component';

describe('IconSwitchComponent', () => {
  let component: IconSwitchComponent;
  let fixture: ComponentFixture<IconSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
