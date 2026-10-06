const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validateEnvironment } = require('../dist/config/environment');

const valid = {
  DATABASE_URL: 'postgresql://user:password@localhost:5433/devisio',
};

test('valide les paramètres et convertit le port en nombre', () => {
  const config = validateEnvironment({ ...valid, PORT: '3002' });
  assert.equal(config.PORT, 3002);
  assert.equal(config.CORS_ORIGIN, 'http://localhost:3000');
});

test('refuse les paramètres qui empêchent le démarrage', () => {
  for (const config of [
    {},
    { DATABASE_URL: 'invalid' },
    { DATABASE_URL: 'https://localhost/devisio' },
    { DATABASE_URL: 'postgresql://localhost' },
    { ...valid, PORT: 'abc' },
    { ...valid, PORT: '0' },
    { ...valid, PORT: '65536' },
    { ...valid, CORS_ORIGIN: '*' },
    { ...valid, CORS_ORIGIN: 'http://localhost:3000/path' },
  ]) {
    assert.throws(() => validateEnvironment(config));
  }
});
