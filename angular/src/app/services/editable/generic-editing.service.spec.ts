import { GenericEditingService } from './generic-editing.service';
import { Account } from '../../data/account.model';
import { account } from '../../data/Mocks/account.mock';

describe('AccountEditingService', () => {
  let service = new GenericEditingService<Partial<Account>>();
  const partial = { id: '4' };

  beforeEach(() => {
    service = new GenericEditingService<Partial<Account>>();
  });

  it('Should Initialize with the first object sent to it', () => {
    service.editUpdates.subscribe((e) => {
      expect(e).toBeTruthy();
    });
    service.update(account);
  });
  it('Should update the field of key from a partial', () => {
    service.editUpdates.subscribe((e) => {
      if (e != null) {
        expect(e.id).toEqual('4', e.id);
      }
    });
    service.update(partial);
  });
  it('Should emit a payload', () => {
    service.payloadEmitter.subscribe((e) => {
      expect(e).toBeTruthy();
    });
    service.update(partial);
  });
});
