import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewList } from './view-list';

describe('ViewList', () => {
  let component: ViewList;
  let fixture: ComponentFixture<ViewList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
