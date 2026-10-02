const { test } = require('node:test');
const assert = require('node:assert/strict');
const { formatStartupError } = require('../src/config/startup-error');

test('falha de autenticação indica a configuração efetiva sem expor a URL privada', () => {
    const secret = 'mysql://avnadmin:private-password@private-host/defaultdb';
    const message = formatStartupError({ code: 'ER_ACCESS_DENIED_ERROR', message: secret }, { DATABASE_URL: secret });
    assert.match(message, /DATABASE_URL.*prioridade/);
    assert.ok(!message.includes(secret));
    assert.ok(!message.includes('private-password'));
});

test('erro 1045 orienta corrigir as variáveis no serviço do Render', () => {
    const message = formatStartupError({ errno: 1045 }, {});
    assert.match(message, /DB_PASSWORD/);
    assert.match(message, /Environment/);
});

test('outros erros de inicialização preservam a mensagem', () => {
    assert.equal(formatStartupError(new Error('Connection timeout'), {}), 'Connection timeout');
});
