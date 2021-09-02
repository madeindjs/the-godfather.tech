export interface MockedRepository {
  findOneOrFail: jest.Mock;
  findOne: jest.Mock;
  save: jest.Mock;
  delete: jest.Mock;
}

export function getMockedRepository(): MockedRepository {
  return {
    findOneOrFail: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };
}
