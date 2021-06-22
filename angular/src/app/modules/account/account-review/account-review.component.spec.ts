import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { AccountReviewComponent } from './account-review.component';

describe('AccountReviewComponent', () => {
  const review = {
    accountId: 1,
    comment: '',
    dateCreated: '2020-08-01',
    rating: 0,
    lodgingModelId: 1,
  };
  let component: AccountReviewComponent;
  let fixture: ComponentFixture<AccountReviewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AccountReviewComponent],
        providers: [FormBuilder],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountReviewComponent);
    component = fixture.componentInstance;
    component.review = review;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
