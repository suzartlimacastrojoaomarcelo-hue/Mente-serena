# Render: Access denied e saída com status 1

A API conecta ao MySQL antes de abrir o servidor. Se o MySQL rejeitar as
credenciais, o processo termina com status 1. Publicar os arquivos do site
na Cloudflare não realiza essa conexão e pode funcionar mesmo com a API indisponível.

1. Na Aiven, abra o serviço MySQL correto e consulte os dados de conexão atuais.
2. No Render, abra o serviço que falhou e sua seção Environment.
3. Confira DB_HOST, DB_PORT, DB_USER, DB_PASSWORD e DB_NAME com os dados da Aiven.
   Insira os valores diretamente nos campos, sem o prefixo `DB_PASSWORD=`.
   Para a Aiven, configure DB_SSL=true.
4. Se DATABASE_URL estiver definida, ela tem prioridade sobre as variáveis DB_*.
   Atualize a URL completa ou remova-a para usar DB_*. Senhas em URLs precisam
   de codificação adequada dos caracteres especiais.
5. Use Save and deploy e confira se o log mostra Servidor iniciado.

BACKEND_URL apenas informa ao proxy o endereço da API. Os arquivos locais `env`
e `.env` são ignorados pelo Git; o servidor lê `.env` localmente, mas alterações
nesses arquivos não atualizam o Environment do Render. Variáveis com `sync: false`
no render.yaml precisam ser preenchidas manualmente em serviços já existentes.

Referências: https://render.com/docs/configure-environment-variables,
https://render.com/docs/blueprint-spec,
https://aiven.io/docs/products/mysql/howto/connect-from-cli.
