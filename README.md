# Sunshine Imobiliária · protótipo do site

Protótipo navegável do **site do comprador** proposto para a Sunshine Imobiliária (CRECI 29988-J).
Só o site: os painéis (administrador, corretor, dashboard) ficam para um protótipo separado.

## Telas
- `#/` Início: busca (comprar/alugar, bairro, tipo, preço), destaques, bairros, equipe
- `#/comprar` e `#/alugar`: lista com filtros e ordenação
- `#/mapa`: busca no mapa com a lista acompanhando
- `#/imovel/1343`: página do imóvel, WhatsApp com mensagem pronta e agendar visita
- `#/contato` e `#/privacidade` (LGPD)
- "Ver no celular" na barra do topo abre a prévia em tamanho de celular

## Como abrir
```
python -m http.server 5173
```
e abrir http://localhost:5173

Imóveis, corretores e números são de exemplo. O mapa é ilustrativo.
