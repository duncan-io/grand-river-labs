import * as migration_20260826_184847_initial from './20260826_184847_initial';
import * as migration_20260826_191412_authors from './20260826_191412_authors';

export const migrations = [
  {
    up: migration_20260826_184847_initial.up,
    down: migration_20260826_184847_initial.down,
    name: '20260826_184847_initial',
  },
  {
    up: migration_20260826_191412_authors.up,
    down: migration_20260826_191412_authors.down,
    name: '20260826_191412_authors'
  },
];
