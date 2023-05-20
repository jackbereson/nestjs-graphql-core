import { Test, TestingModule } from '@nestjs/testing';
import { SettingResolver } from './setting.resolver';
import { SettingService } from './setting.service';

describe('SettingResolver', () => {
  let resolver: SettingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SettingResolver, SettingService],
    }).compile();

    resolver = module.get<SettingResolver>(SettingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
