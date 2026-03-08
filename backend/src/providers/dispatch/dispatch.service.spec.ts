import { Test, TestingModule } from '@nestjs/testing';
import { DispatchManagerService } from './dispatch.service';
import { DhlDispatchStrategy } from './strategies/dhl-dispatch.strategy';
import { FedexDispatchStrategy } from './strategies/fedex-dispatch.strategy';
import { GigDispatchStrategy } from './strategies/gig-dispatch.strategy';

describe('DispatchManagerService', () => {
  let service: DispatchManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DispatchManagerService,
        { provide: DhlDispatchStrategy, useValue: {} },
        { provide: FedexDispatchStrategy, useValue: {} },
        { provide: GigDispatchStrategy, useValue: {} },
      ],
    }).compile();

    service = module.get<DispatchManagerService>(DispatchManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
