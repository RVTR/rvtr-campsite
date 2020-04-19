import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AccountService } from './account.service';
import { Account } from '../../data/account/account.model';

import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Configuration } from './config';
import { Hash } from 'crypto';

const mockAccounts = require('./data.json') as Account[]; // read an array of mock Accounts from JSON file

describe('Account Service Testing', () => {

  let accountService: AccountService;
  // let mockAccounts: Account[];
  let mockAccount: Account;
  let mockId: Hash;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let config: Configuration

  let injector: TestBed;
  // let service: GithubApiService;
  let httpMock: HttpTestingController;

    beforeEach(() => {
      // Configure Testing Module
      TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
          providers: [
            AccountService,
            Configuration
          ]
      });

      injector = getTestBed();
      accountService = injector.get(AccountService);
      httpMock = injector.get(HttpTestingController);


      // Setup Mock Accounts and get the Account Service from the test bed

      // this.mockAccounts = mockAccounts;
      // this.mockAccount = this.mockAccounts[0];
      // this.mockId = this.mockAccount.id;

      
    });
    // accountService = TestBed.get(AccountService);

    // Verify after each test
    // afterEach(() => {
    //   httpTestingController.verify();
    // });

    // Test that the Account Service is actually being created
    it('should be created', () => {
      expect(accountService).toBeTruthy(); // THIS TEST IS FAILING
    });
    
    // Now begin Account Service Test Suites...
    // Get Accounts -----------------------------------------------
    describe('getAccounts', () => {
      it('should return mock accounts', () => {
        
        // let mockAccounts = mockAccounts;
        // console.log(typeof mockAccounts);
        let mockAccount = mockAccounts[0] as Account;
        let mockId = mockAccount.accountID;
        console.log(typeof mockAccount, JSON.stringify(mockAccount));
        console.log(typeof accountService, JSON.stringify(accountService));

        accountService.getAccounts().subscribe(
          accounts => expect(accounts.length).toEqual(mockAccounts.length),
          fail
        );
        // console.log(JSON.stringify(this,mockAccounts[0])); // This is giving an error.....
        // Receive GET request
        const req = httpMock.expectOne({method: 'GET', url: accountService.accountsUrl}); 
        expect(req.request.method).toEqual('GET');
        // Respond with the mock heroes
        req.flush(mockAccounts);
      });
    });

    // Add Accounts ------------------------------------------------
    describe('addAccount', () => {

      it('should add a single Account', () => {
        // spyOn(accountService, 'handleError').and.callThrough();
        // spyOn(accountService, 'log').and.callThrough();
  
        accountService.addAccount(mockAccount).subscribe(
          response => expect(response).toEqual(mockAccount),
          fail
        );
        // Receive GET request
        const req = httpMock.expectOne(`${accountService.accountsUrl}`);
        expect(req.request.method).toEqual('POST');
        // Respond with the mock heroes
        req.flush(mockAccount); // convert to raw JSON??

        expect(accountService.log).toHaveBeenCalledTimes(1);
      });
  
      it('should fail gracefully on error', () => {
        // spyOn(accountService, 'handleError').and.callThrough();
        // spyOn(accountService, 'log').and.callThrough();
  
        accountService.addAccount(mockAccount).subscribe( // HERE
          response => expect(response).toBeUndefined(),
          fail
        );
        // Receive GET request
        const req = httpMock.expectOne(`${accountService.accountsUrl}`);
        expect(req.request.method).toEqual('POST');
        // Respond with the mock heroes
        req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });
  
        expect(accountService.handleError).toHaveBeenCalledTimes(1);
        expect(accountService.log).toHaveBeenCalledTimes(1);
      });
    });
  
  });



    ///  uh-huh
  //   httpTestingController = TestBed.get(HttpTestingController);
  //   // this.mockHeroes = [...mockData];
  //   // this.mockHero = this.mockHeroes[0];
  //   // this.mockId = this.mockHero.id;
    
  //   // Inject the http service and test controller for each test
  //   accountService = TestBed.inject(AccountService);
  //   httpClient = TestBed.inject(HttpClient);
  //   httpTestingController = TestBed.inject(HttpTestingController);
  //   config = TestBed.inject(Configuration);
  // });

  

  // it('can test AccountService.get', () => {
    
  //   //const mockData = ACCOUNT;
  //   //const testData: Data = {name: 'Test Data'};
  //   // const testAccount = ACCOUNT;
  //   let url = './data.json';

    

    // httpClient.get<Account>(url).subscribe(data => expect(data));
    
    // service.get().subscribe(data => expect(data));
    // console.log(JSON.stringify(accounts));
    
    // // const req = httpTestingController.expectOne(req => req.method === 'GET' && req.url === 'http://example.org');
    // const req = httpTestingController.expectOne('/data'); 
    // console.log(req.request.url+ ' HERREEEEEEEEEEEEEEEEEEE!!!!!!!!!!');


    

    //expect(req.request.method).toEqual('GET');

    //req.flush(testData)

    //httpTestingController.verify();    
    
    //expect(service).toBeTruthy();
  // });
// });



