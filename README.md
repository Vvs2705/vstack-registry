# vstack-registry

Registry [shadcn](https://ui.shadcn.com/docs/registry/github) da **V-STACK Solutions** — distribui o design system unificado (tokens, tipografia e convencoes) para todos os produtos da V-STACK a partir de uma unica fonte da verdade.

> Objetivo: o "primario laranja" e o mesmo em todo lugar. Nenhum repo reinventa UI nem inventa cor literal.

## Itens disponiveis

| Item | Tipo | Descricao | Instalar |
|---|---|---|---|
| `design-conventions` | `registry:item` | `DESIGN.md` na raiz do projeto consumidor (`~/DESIGN.md`) — brief de restricoes de design: tokens semanticos (accent `#e05e18`), tipografia Syne/Geist/JetBrains Mono, regras de raio/sombra/motion e o guia de prompt para agentes. | `npx shadcn@latest add Vvs2705/vstack-registry/design-conventions` |
| `theme-base` | `registry:theme` | **Instale primeiro.** Injeta os design tokens da V-STACK (`--bg*`, `--accent*` incl. `--accent-muted`, `--text-1..3`, `--border*`, `--radius-*`, sombras e tokens de estado `success`/`warning`/`danger`/`info`) em **light e dark**, mais as utilities que os `registry:ui` assumem (`.eyebrow`, `.btn-primary`/`.btn-secondary`/`.btn-outline`, `.card-vstack`, `.gradient-text`, `font-display`, `font-mono`) e o keyframe `tech-scroll`. Fecha a lacuna: sem ele, os componentes ficam sem cor/raio/sombra. | `npx shadcn@latest add Vvs2705/vstack-registry/theme-base` |
| `currency-input` | `registry:ui` | Input de moeda BRL com mascara automatica (acumulador de centavos); value canonico com ponto decimal, pronto para `parseFloat`/API e react-hook-form. Sem estilo proprio. | `npx shadcn@latest add Vvs2705/vstack-registry/currency-input` |
| `empty-state` | `registry:ui` | Estado vazio padrao V-STACK: icone (Lottie opcional ou SVG), titulo em `font-display`, descricao e acao — so tokens semanticos shadcn. Requer `tailwindcss-animate`. | `npx shadcn@latest add Vvs2705/vstack-registry/empty-state` |
| `container` | `registry:ui` | Container centralizado com gutters responsivos e largura maxima por prop (`md`/`lg`/`xl`). | `npx shadcn@latest add Vvs2705/vstack-registry/container` |
| `section` | `registry:ui` | Secao de pagina com tom de fundo (`default`/`muted`/`deep`) e ritmo vertical (`md`/`lg`/`xl`) pelos tokens. | `npx shadcn@latest add Vvs2705/vstack-registry/section` |
| `section-header` | `registry:ui` | Eyebrow + titulo + descricao no padrao V-STACK, alinhamento `left`/`center`. | `npx shadcn@latest add Vvs2705/vstack-registry/section-header` |
| `surface` | `registry:ui` | Card/superficie elevada com borda, raio e sombra por token; hover de elevacao opcional (`interactive`); polimorfico via `as`. | `npx shadcn@latest add Vvs2705/vstack-registry/surface` |
| `cta-section` | `registry:ui` | Secao final de CTA com entrada animada on-scroll, glow radial e ate dois botoes — toda a copy vem por props. Puxa `container` e `section` automaticamente. Requer Next.js. | `npx shadcn@latest add Vvs2705/vstack-registry/cta-section` |
| `animations` | `registry:ui` | Primitivos de animacao on-scroll (framer-motion): `FadeInUp`, `SlideIn`, `StaggerContainer`/`StaggerItem`, `PulseLabel`, `CountUp`, `AnimatedSection` + variants. | `npx shadcn@latest add Vvs2705/vstack-registry/animations` |
| `toast` | `registry:ui` | Toast leve sem provider: `toast()` via event bus + `ToastContainer`, tipos `success`/`error`/`info` nos tokens de estado. | `npx shadcn@latest add Vvs2705/vstack-registry/toast` |
| `spinner` | `registry:ui` | Indicador de carregamento circular (border-spin) sem dependencias; aro na cor `primary`, trilha neutra, tamanhos `sm`/`md`/`lg`. | `npx shadcn@latest add Vvs2705/vstack-registry/spinner` |
| `progress-ring` | `registry:ui` | Anel de progresso/score em SVG (0–100) sem dependencias; cor por faixa (emerald/sky/amber/red), trilha no token `border`, valor central opcional. | `npx shadcn@latest add Vvs2705/vstack-registry/progress-ring` |
| `timeline` | `registry:ui` | Linha do tempo vertical data-driven: itens via prop (title/description/timestamp/icon/status), ponto colorido por status. Sem dependencias, copy do consumidor. | `npx shadcn@latest add Vvs2705/vstack-registry/timeline` |
| `search-input` | `registry:ui` | Campo de busca com icone, botao limpar e debounce (`onSearch`); foco no token `primary`. Placeholder por prop. Requer `lucide-react`. | `npx shadcn@latest add Vvs2705/vstack-registry/search-input` |
| `otp-input` | `registry:ui` | Caixas de codigo OTP (default 6) sem dependencias: auto-foco, backspace inteligente e paste; so digitos. Ideal para MFA/verificacao. | `npx shadcn@latest add Vvs2705/vstack-registry/otp-input` |
| `alert-card` | `registry:ui` | Cartao de alerta com severidade (`critical`/`warning`/`success`/`info`), icone, acao e dismiss opcionais — toda a copy por props. Requer `lucide-react`. | `npx shadcn@latest add Vvs2705/vstack-registry/alert-card` |

### Pre-requisitos dos componentes `registry:ui`

- Projeto com **shadcn inicializado** (`components.json` + alias `@/lib/utils` com o helper `cn`) — os itens que usam `cn` declaram o registryDependency padrao `utils`, entao o shadcn resolve sozinho.
- **Tokens + utilities da V-STACK instalados via `theme-base`.** Os componentes `registry:ui` assumem as custom properties (`--bg`, `--bg-card`, `--bg-deep`, `--text-1..3`, `--border`, `--border-hover`, `--radius-card`, `--shadow`, `--shadow-sm`, `--accent-muted`, tokens de estado `success`/`warning`/`danger`/`info`) e as utilities `.eyebrow`, `.btn-primary`, `.btn-outline`, `font-display`. O item **`theme-base`** injeta tudo isso direto no seu CSS global — instale-o **antes (ou junto)** dos componentes:

  ```bash
  # sempre primeiro: a fundacao de tokens + utilities (light + dark)
  npx shadcn@latest add Vvs2705/vstack-registry/theme-base
  # depois os componentes que dependem dela
  npx shadcn@latest add Vvs2705/vstack-registry/surface
  ```

  O `design-conventions` (`DESIGN.md`) continua sendo o **brief de restricoes** para agentes; o `theme-base` e a **fundacao executavel** que aterrissa os mesmos tokens no CSS.
- `cta-section` usa `next/link` — apenas para produtos Next.js.

## Como consumir (qualquer produto V-STACK)

Este repositorio e um **GitHub registry** do shadcn: qualquer repo publico com um `registry.json` valido na raiz vira um registry. Nao precisa de servidor nem de configuracao em `components.json` — o item e enderecado direto por `<owner>/<repo>/<item>`:

```bash
# npm
npx shadcn@latest add Vvs2705/vstack-registry/design-conventions

# pnpm
pnpm dlx shadcn@latest add Vvs2705/vstack-registry/design-conventions
```

Isso copia o `DESIGN.md` para a **raiz do projeto** (na convencao shadcn, `target: "~/DESIGN.md"` significa a raiz do projeto consumidor).

Comandos uteis de descoberta/validacao:

```bash
npx shadcn@latest list Vvs2705/vstack-registry               # lista os itens
npx shadcn@latest view Vvs2705/vstack-registry/design-conventions
npx shadcn@latest registry validate Vvs2705/vstack-registry  # valida o registry
```

### Fluxo recomendado em cada produto

1. Instale o item de convencoes: `npx shadcn@latest add Vvs2705/vstack-registry/design-conventions`.
2. Nos prompts de agente (Claude Code etc.), referencie `@DESIGN.md` como brief de restricoes.
3. Detalhes especificos do repo ficam no `AJUSTES-DESIGN.md` local de cada produto (nao distribuido por aqui).

## Como adicionar um novo componente (`registry:ui`)

Os primitivos compartilhados vivem em `registry/ui/*.tsx`, um arquivo por item, com imports nos aliases padrao do shadcn (`@/lib/utils`, `@/components/ui/...`) para o `add` resolver em qualquer produto.

Padrao para adicionar um componente:

1. Crie o arquivo em `registry/ui/<componente>.tsx` neste repo.
2. Adicione um item ao `registry.json`:

```json
{
  "name": "section-header",
  "type": "registry:ui",
  "title": "SectionHeader",
  "description": "Eyebrow + titulo + descricao no padrao V-STACK.",
  "dependencies": ["framer-motion"],
  "registryDependencies": ["utils", "Vvs2705/vstack-registry/section"],
  "files": [
    { "path": "registry/ui/section-header.tsx", "type": "registry:ui" }
  ]
}
```

Regras de dependencia: pacotes npm vao em `dependencies`; `registryDependencies` usa o nome bare para itens built-in do shadcn (`utils` = helper `cn`) e o endereco completo `Vvs2705/vstack-registry/<item>` para itens deste proprio repo.

3. Valide (`npx shadcn@latest registry validate Vvs2705/vstack-registry`) e publique. Consumo: `npx shadcn@latest add Vvs2705/vstack-registry/section-header` (itens `registry:ui` sao instalados no diretorio de componentes configurado no `components.json` do consumidor — nao precisam de `target`).

## Regras deste repositorio

- Fonte da verdade do design: `DESIGN.md` (accent **laranja** `#e05e18` — qualquer residuo ciano e divida a limpar, nao propagar).
- So sobe aqui o que e distribuivel pelo registry: `registry.json`, arquivos referenciados pelos itens e este README. Nenhum segredo, nenhum doc de processo, nada de codigo de produto.
- Toda mudanca em `registry.json` deve passar por `npx shadcn@latest registry validate` antes do push.
