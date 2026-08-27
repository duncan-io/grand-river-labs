import * as migration_20260826_184847_initial from './20260826_184847_initial';
import * as migration_20260826_191412_authors from './20260826_191412_authors';
import * as migration_20260827_014428_api_keys from './20260827_014428_api_keys';

export const migrations = [
  {
    up: migration_20260826_184847_initial.up,
    down: migration_20260826_184847_initial.down,
    name: '20260826_184847_initial',
  },
  {
    up: migration_20260826_191412_authors.up,
    down: migration_20260826_191412_authors.down,
    name: '20260826_191412_authors',
  },
  {
    up: migration_20260827_014428_api_keys.up,
    down: migration_20260827_014428_api_keys.down,
    name: '20260827_014428_api_keys'
  },
];
