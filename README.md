# Cambridge Writing Lab

App web pessoal para treinar **Cambridge Writing Part 1 (essay)** nos níveis **C1 Advanced** e **C2 Proficiency**.

## O que faz (MVP)

- Seletor **C1 / C2**
- Banco seed de temas (~15 por nível) + geração por IA + “tema atual” (LLM, sem web ainda)
- Modos **Practice** e **Exam** (timer + word count)
- Correção com bands (0–5), anotações no texto, model answer e explicações em PT
- Histórico no **localStorage** (sem login)

## Setup

```bash
npm install
cp .env.example .env.local
# preencha OPENAI_API_KEY ou ANTHROPIC_API_KEY + LLM_PROVIDER
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

| Variável | Descrição |
|----------|-----------|
| `LLM_PROVIDER` | `openai` (default) ou `anthropic` |
| `OPENAI_API_KEY` / `OPENAI_MODEL` | quando provider = openai |
| `ANTHROPIC_API_KEY` / `ANTHROPIC_MODEL` | quando provider = anthropic |

A key fica só no servidor (API routes). O histórico do aluno fica no browser.

## Roadmap

1. Writing Part 2  
2. Pesquisa web real para temas atuais  
3. Mobile / PWA  

## Aviso

As notas da IA são **prática**, não equivalem a uma nota oficial Cambridge.
