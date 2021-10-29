import { TestBed } from '@angular/core/testing';

import { GcodeViewerService } from './gcode-viewer.service';

describe('GcodeViewerService', () => {
  let service: GcodeViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GcodeViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
