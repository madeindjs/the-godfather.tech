export const repositoryMockFactory = jest.fn(() => ({ findOne: jest.fn() }));

export class RepositoryMock<Entity extends { id?: number }> {
  private rows: Set<Entity> = new Set();

  public save(entity: Entity) {
    entity.id ??= Date.now();

    this.rows.add(entity);
  }
}
