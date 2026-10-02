function formatStartupError(error, env = process.env) {
    if (error.code === 'ER_ACCESS_DENIED_ERROR' || error.errno === 1045) {
        const source = env.DATABASE_URL
            ? 'DATABASE_URL (tem prioridade sobre DB_HOST, DB_USER e DB_PASSWORD)'
            : 'DB_HOST, DB_PORT, DB_USER, DB_PASSWORD e DB_NAME';
        return `MySQL recusou as credenciais. Confira ${source} no Environment do serviço no Render com os dados atuais do banco na Aiven e salve com novo deploy. BACKEND_URL não configura o banco. Arquivos env/.env locais não atualizam as variáveis do Render.`;
    }
    return error.message;
}

module.exports = { formatStartupError };
