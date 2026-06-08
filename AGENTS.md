# AGENTS.md — Password Generator App

Progetto statico (HTML + Tailwind CLI + vanilla JS), **non** un template. Le regole globali in `~/.config/opencode/AGENTS.md` si applicano sempre.

## Stack

| Strumento      | Note                                                          |
| -------------- | ------------------------------------------------------------- |
| pnpm           | `9.14.2` (`packageManager` in `package.json`)                 |
| Tailwind v3    | CLI standalone (`tailwindcss`), nessun bundler                |
| Prettier       | Solo plugin Tailwind in `.prettierrc` (nessun override stile) |
| JetBrains Mono | Font locale in `fonts/`                                       |

## Comandi

```bash
pnpm dev       # Tailwind watch: src/input.css → src/output.css
```

Non c'è un dev server — apri `index.html` direttamente nel browser.

Formattazione (se serve):

```bash
pnpm format:check    # verifica
pnpm format:fix      # applica
```

## Architettura

- `index.html` — entry point unico, carica `output.css` e `script.js`
- `src/script.js` — tutta la logica (generazione password, strength, clipboard)
- `src/input.css` — direttive Tailwind + override slider `/` strength bar
- `src/output.css` — generato da Tailwind, **committato**
- `assets/` — immagini (favicon, icone)
- `fonts/` — JetBrains Mono (variabile weight)

## Config stale / morta (da ignorare)

| File               | Perché è morto                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| `eslint.config.js` | eslint **non installato** (`package.json` non lo elenca) — React blocks inclusi ma inutilizzati |
| `tsconfig*.json`   | TypeScript e Vite **non installati** — refuso da template                                       |
| `.prettierignore`  | Riferisce `routeTree.gen.ts`, `CHANGELOG.md` ecc. — non presenti o irrilevanti                  |

Nessun test framework configurato.

## Convenzioni

- Conventional Commits in italiano, solo prefisso senza scope (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`)
- Release Please su push a `main` (workflow in `.github/workflows/release-please.yml`)
- PR: squash merge, history lineare, auto-delete branches
- Issue/PR template in `.github/` — leggi prima di creare
- `gh issue` / `gh pr` → usa `bash -c '...'` (evita escaping PowerShell coi backtick)
