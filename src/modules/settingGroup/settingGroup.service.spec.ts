import { Test, TestingModule } from '@nestjs/testing';
import { SettingGroupService } from './settingGroup.service';

describe('SettingGroupService', () => {
  let service: SettingGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SettingGroupService],
    }).compile();

    service = module.get<SettingGroupService>(SettingGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
