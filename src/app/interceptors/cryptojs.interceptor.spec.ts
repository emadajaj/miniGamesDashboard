import { TestBed } from '@angular/core/testing';

import { CryptojsInterceptor } from './cryptojs.interceptor';

describe('CryptojsInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [CryptojsInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: CryptojsInterceptor =
      TestBed.inject(CryptojsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
