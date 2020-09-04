import { LayoutModule } from './layout/layout.module';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

import { TestBed, waitForAsync } from '@angular/core/testing';

describe('AppComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [LayoutModule, RouterTestingModule],
        declarations: [AppComponent],
      }).compileComponents();
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render footer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('uic-footer').textContent).toContain('RVTR');
  });

  it('should render header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('uic-header').textContent).toContain('Campsite');
  });
});
