import { Component, Input, Inject } from '@angular/core';
import { Profile } from '../../../data/profile.model';
import { Account } from '../../../data/account.model';
import { GenericEditingService } from '../../../services/editable/generic-editing.service';
import { ACCOUNT_EDITING_SERVICE } from '../../account/account-editing.token';
import { AccountService } from 'services/account/account.service';

@Component({
  selector: 'uic-profile',
  templateUrl: './profile.component.html',
})
/**
 * Class representing a user's profile information
 */
export class ProfileComponent {
  @Input() profiles!: Profile[];

  editMode = false;
  titleEdit = 'Click To Edit Your Profile';
  titleAdd = 'Click To Add Profile';
  titleDelete = 'Click To Delete Your Profile';

  /**
   * Represents the _Profile Component_ 'constructor' method
   * @param editingService AccountEditingService
   */
  constructor(
    @Inject(ACCOUNT_EDITING_SERVICE)
    private readonly editingService: GenericEditingService<Partial<Account>>,
    private readonly accountService: AccountService
  ) {}

  /**
   * Updates the _Editing Service_ with the new profile information
   */
  edited(): void {
    this.editingService.update({ profiles: this.profiles });
  }
  add(length: number): boolean {
    if (length > 4) {
      return false;
    }

    const profile: Profile = {
      id: 0,
      email: 'mock@mock.com',
      givenName: 'New',
      familyName: 'New',
      type: 'adult',
      phone: '123-123-1234',
      editMode: true,
    };
    this.profiles.push(profile);
    return true;
  }

  remove(index: number, id: number): boolean {
    console.log(index);
    console.log(id);
    this.profiles.splice(index, 1);
    this.accountService.deleteProfile(id).subscribe((p) => console.log(p));
    return true;
  }
}
