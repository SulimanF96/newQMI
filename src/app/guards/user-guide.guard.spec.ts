import { TestBed, async, inject } from '@angular/core/testing';

import { UserGuideGuard } from './user-guide.guard';

describe('UserGuideGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserGuideGuard]
    });
  });

  it('should ...', inject([UserGuideGuard], (guard: UserGuideGuard) => {
    expect(guard).toBeTruthy();
  }));
});
