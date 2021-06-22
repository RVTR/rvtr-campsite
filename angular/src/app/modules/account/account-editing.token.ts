import { GenericEditingService } from '../../services/editable/generic-editing.service';
import { InjectionToken } from '@angular/core';
import { Account } from 'data/account.model';

export const ACCOUNT_EDITING_SERVICE = new InjectionToken<GenericEditingService<Partial<Account>>>(
  'AccountEditingService'
);
