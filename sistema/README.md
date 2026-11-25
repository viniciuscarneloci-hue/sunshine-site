# Sistema Sunshine: protótipo dos painéis internos

Protótipo navegável do sistema interno da Sunshine Imobiliária (administrador e corretor), feito para apresentar a proposta.
É independente do site: fica só nesta pasta e apenas lê os logos e as fotos em `../img/`.

## Como abrir

Na pasta `Sunshine` (a raiz do site):

```
python -m http.server 5173
```

Depois abra http://localhost:5173/sistema/

## O que tem

- **Login de demonstração** com dois perfis: Nelson (administrador) e Carla (corretora). O seletor no topo troca de perfil a qualquer momento.
- **Administrador**: visão geral (KPIs, mapa da carteira por status, ranking de corretores, mais vistos, contatos por semana), Imóveis (filtros, marcar vendido, pausar e reativar, sem apagar nada), Corretores, Contatos (funil em colunas, com arrastar ou setas), Vendas (a venda registrada fica aguardando confirmação), Configurações (comissão, divisão, imposto e taxas recalculando o exemplo de R$ 850.000 → R$ 23.965) e Registro de auditoria.
- **Corretor**: painel "Olá, Carla" (comissão do mês, a receber, vendas no ano, próxima visita com confirmar/remarcar, contatos novos com WhatsApp), Meus imóveis, Meus contatos, Agenda e Minhas comissões.
- **Publicar imóvel** em 3 passos, pensado para o celular: fotos (a primeira é a capa, dá para reordenar), dados (ditado por voz e "gerar anúncio com IA", ambos simulados) e revisão com o card como aparece no site.
- **Acessos e segurança**: tabela do que cada perfil pode fazer e os cuidados de segurança (senha individual, isolamento por corretor, backup diário, LGPD).

## Observações

- Tudo é simulado e fica salvo no `localStorage` do navegador. Em "Mais" (celular) há **Restaurar dados de exemplo**; no computador, basta limpar o armazenamento do site.
- Imóveis publicados aqui não vão para o site de verdade. Os números de WhatsApp dos clientes são fictícios (`(11) 90000-01xx`).
- Arquivos: `index.html`, `sistema.css`, `sistema.js`. Sem build. Usa Google Fonts (DM Serif Display e Manrope) e Leaflet 1.9.4 com mapa da Esri.
