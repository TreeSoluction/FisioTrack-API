# FisioTrack Backend

API backend para o sistema de gestão de fisioterapia FisioTrack.

## Stack

- **Runtime:** Node.js 22
- **Framework:** NestJS 11
- **Database:** PostgreSQL + Prisma 6
- **Auth:** JWT (15min) + Refresh Tokens (7 dias)
- **Payments:** Mercado Pago
- **Email:** Brevo (SMTP)
- **Docs:** Swagger/OpenAPI

## Setup

```bash
# Instalar dependências
yarn install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais

# Gerar Prisma Client
npx prisma generate

# Rodar migrations
npx prisma migrate dev

# Iniciar em desenvolvimento
yarn start:dev
```

## Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `DATABASE_URL` | Sim | URL de conexão com PostgreSQL |
| `JWT_SECRET` | Sim | Segredo para assinar JWTs (mín. 32 chars) |
| `ENCRYPTION_KEY` | Sim | Chave AES-256 em hex (64 chars) |
| `MP_ACCESS_TOKEN` | Não | Token de acesso Mercado Pago |
| `MP_WEBHOOK_SECRET` | Não | Segredo para verificar webhooks |
| `SMTP_HOST` | Não | Host SMTP (Brevo) |
| `CORS_ORIGINS` | Não | Origens permitidas (separadas por vírgula) |

## Autenticação

### Fluxo de Tokens

```
Login → access_token (15min) + refresh_token (7 dias)
Refresh → novos tokens (deleta o anterior)
Logout → invalida access token (blacklist) + deleta refresh tokens
```

### Endpoints de Auth

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/login` | Login (retorna access + refresh tokens) |
| POST | `/auth/refresh` | Renovar access token |
| POST | `/auth/logout` | Logout (invalida tokens) |
| POST | `/auth/register` | Registrar novo usuário |

### Headers Requeridos

```
Authorization: Bearer <access_token>
Content-Type: application/json
```

## Segurança

- **Helmet** — Security headers (HSTS, CSP, X-Frame-Options)
- **Rate Limiting** — 100 req/min global, 5 login/min, 3 register/min
- **JWT Live Validation** — Token validado contra DB a cada request
- **Token Blacklist** — Tokens revogados são rejeitados
- **CUID Validation** — IDs de path params validados no formato CUID
- **Env Validation** — App crasha no startup se vars obrigatórias faltarem
- **Webhook Idempotência** — Webhooks duplicados são ignorados
- **XSS Prevention** — Valores de usuário escapados em emails
- **Encryption at Rest** — CPF, histórico médico, endereço criptografados com AES-256-GCM

## Endpoints Principais

### Patients
- `GET /patients` — Listar (com paginação)
- `POST /patients` — Criar
- `GET /patients/:id` — Buscar por ID
- `PUT /patients/:id` — Atualizar
- `DELETE /patients/:id` — Remover

### Treatments
- `GET /treatments` — Listar (com paginação)
- `POST /treatments` — Criar
- `GET /treatments/patient/:patientId` — Listar por paciente
- `GET /treatments/:id` — Buscar com sessões e pagamentos
- `PUT /treatments/:id` — Atualizar
- `DELETE /treatments/:id` — Remover

### Sessions
- `GET /sessions/treatment/:treatmentId` — Listar por tratamento
- `POST /sessions/:treatmentId` — Criar
- `GET /sessions/dashboard/:patientId` — Dashboard do paciente
- `GET /sessions/:id` — Buscar por ID
- `DELETE /sessions/:id` — Remover

### Billing
- `GET /billing/pricing` — Preços
- `POST /billing/checkout` — Criar checkout (mensal/anual)
- `POST /billing/checkout-onetime` — Pagamento avulso
- `GET /billing/subscription` — Status da assinatura
- `POST /billing/cancel` — Cancelar assinatura
- `POST /billing/webhook` — Webhook Mercado Pago

### Health
- `GET /health` — Health check com verificação de DB

## Testes

```bash
# Todos os testes
yarn test

# Com coverage
yarn test:cov
```

## Deploy

```bash
# Build
yarn build

# Produção
yarn start:prod
```

### Docker

```bash
# Build imagem
docker build -t fisiotrack-backend .

# Rodar
docker run -p 3000:3000 --env-file .env fisiotrack-backend
```

## Documentação da API

Em desenvolvimento, a documentação Swagger está disponível em:
```
http://localhost:3000/api
```

Em produção (`NODE_ENV=production`), o Swagger é desabilitado automaticamente.
