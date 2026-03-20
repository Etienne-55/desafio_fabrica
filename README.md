# Teste DevOps 1 — Workshop 2026.1

## Conexão

Conectar via SSH no servidor:

| Campo | Valor |
|-------|-------|
| Host  | `bulbasaur@omarchy.local` |
| Senha | `desafio` |

---

## Instruções

1. Entrar na pasta `desafio_workshop`
2. Criar uma branch com seu nome — **essa branch será avaliada**
3. Você tem **45 minutos**

---

## Desafio

O único container já funcional é o do **nginx**.

Sua tarefa é criar os outros containers:

### Containers Obrigatórios

| Container | Tecnologia | Porta |
|-----------|------------|-------|
| Backend   | Django     | `8080` |
| Frontend  | Next.js    | `3000` |

### Container Bônus

| Container      | Tecnologia |
|----------------|------------|
| Banco de dados | PostgreSQL |

---

## Requisitos

- As credenciais do banco de dados estão no arquivo `.env` — não esqueça de usá-las
- Adicione o `.env` ao `.gitignore`
- Configure o `nginx.conf` para fazer o **proxy reverso** corretamente:
  - Frontend → `localhost:3000`
  - Backend → `localhost:8080`
  - O server name do nginx deve ser `localhost`

---

## Conclusão

O desafio termina quando o trabalho estiver **commitado na branch com seu nome**.

---

> ⚠️ **FUNDAMENTAL PARA A CORREÇÃO**
> Não esqueça de fazer o commit na **branch correta com o seu nome**.
