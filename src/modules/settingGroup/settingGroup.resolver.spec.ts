import { Test, TestingModule } from '@nestjs/testing';
import { SettingGroupResolver } from './settingGroup.resolver';
import { SettingGroupService } from './settingGroup.service';

describe('SettingGroupResolver', () => {
  let resolver: SettingGroupResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SettingGroupResolver, SettingGroupService],
    }).compile();

    resolver = module.get<SettingGroupResolver>(SettingGroupResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
