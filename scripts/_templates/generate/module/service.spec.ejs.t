---
to: ../src/modules/<%= h.inflection.camelize(name, true) %>/<%= h.inflection.camelize(name, true) %>.service.spec.ts
---
import { Test, TestingModule } from '@nestjs/testing';
import { <%= h.inflection.camelize(name) %>Service } from './<%= h.inflection.camelize(name, true) %>.service';

describe('<%= h.inflection.camelize(name) %>Service', () => {
  let service: <%= h.inflection.camelize(name) %>Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [<%= h.inflection.camelize(name) %>Service],
    }).compile();

    service = module.get<<%= h.inflection.camelize(name) %>Service>(<%= h.inflection.camelize(name) %>Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
