# vstack-registry

Registry [shadcn](https://ui.shadcn.com/docs/registry/github) da **V-STACK Solutions** — distribui o design system unificado (tokens, tipografia e convencoes) para todos os produtos da V-STACK a partir de uma unica fonte da verdade.

> Objetivo: o "primario laranja" e o mesmo em todo lugar. Nenhum repo reinventa UI nem inventa cor literal.

## Itens disponiveis

| Item | Tipo | O que instala |
|---|---|---|
| `design-conventions` | `registry:item` | `DESIGN.md` na raiz do projeto consumidor (`~/DESIGN.md`) — brief de restricoes de design: tokens semanticos (accent `#e05e18`), tipografia Syne/Geist/JetBrains Mono, regras de raio/sombra/motion e o guia de prompt para agentes. |

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

## Roadmap: componentes compartilhados (`registry:ui`)

A estrutura ja esta pronta para distribuir os primitivos da V-STACK como itens `registry:ui` — ex.: `Container`, `Section`, `SectionHeader`, `Surface`, `CTASection` e os botoes `.btn-primary` / `.btn-secondary` / `.btn-outline` mapeados aos tokens.

Padrao para adicionar um componente:

1. Crie o arquivo em `registry/ui/<componente>.tsx` neste repo.
2. Adicione um item ao `registry.json`:

```json
{
  "name": "section-header",
  "type": "registry:ui",
  "title": "SectionHeader",
  "description": "Eyebrow + titulo + descricao no padrao V-STACK.",
  "files": [
    { "path": "registry/ui/section-header.tsx", "type": "registry:ui" }
  ]
}
```

3. Valide (`npx shadcn@latest registry validate Vvs2705/vstack-registry`) e publique. Consumo: `npx shadcn@latest add Vvs2705/vstack-registry/section-header` (itens `registry:ui` sao instalados no diretorio de componentes configurado no `components.json` do consumidor — nao precisam de `target`).

## Regras deste repositorio

- Fonte da verdade do design: `DESIGN.md` (accent **laranja** `#e05e18` — qualquer residuo ciano e divida a limpar, nao propagar).
- So sobe aqui o que e distribuivel pelo registry: `registry.json`, arquivos referenciados pelos itens e este README. Nenhum segredo, nenhum doc de processo, nada de codigo de produto.
- Toda mudanca em `registry.json` deve passar por `npx shadcn@latest registry validate` antes do push.
