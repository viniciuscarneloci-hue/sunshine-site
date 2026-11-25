# Sunshine Imobiliária · novo site (protótipo)

Protótipo navegável do **site do comprador** da Sunshine Imobiliária (CRECI 29988-J).
Só o site: os painéis (administrador, corretor, dashboard) ficam para um protótipo separado.

Identidade, logo, imóveis, fotos, telefones, endereço e texto "Sobre" vêm do site atual
(sunshine-imob.com.br). Cores do logo: azul-marinho `#182639` e dourado `#E6BC26`.

## Páginas
- `#/` Início: foto em tela cheia, busca, destaque, imóveis, bairros, sobre, como funciona, anuncie, simulador
- `#/comprar` e `#/alugar`: lista com filtros e ordenação
- `#/mapa`: mapa de São Paulo com a lista ao lado (Google Maps quando houver chave em `config.js`)
- `#/imovel/1262`: galeria, dados, localização, simulador, WhatsApp e agendar visita
- `#/financie`, `#/anuncie`, `#/contato`, `#/privacidade`

## Como abrir
```
python -m http.server 5173
```
e abrir http://localhost:5173

Os botões de WhatsApp abrem conversa com o número real da Sunshine, (11) 99676-6021.
Os formulários ainda não enviam nada: só mostram a confirmação.

## Google Maps
Cole a chave da Maps JavaScript API em `config.js` (`googleMapsKey`). Sem chave, o mapa de busca usa um mapa de ruas colorido e a página do imóvel usa o mapa incorporado do Google.
