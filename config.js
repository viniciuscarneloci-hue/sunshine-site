/* Configuração do site da Sunshine.

   GOOGLE MAPS
   Cole aqui a chave da API do Google Maps (Maps JavaScript API) entre as aspas.
   Com a chave, o mapa de busca e o mapa de cada imóvel passam a ser o Google Maps.
   Sem a chave, o mapa de busca usa um mapa de ruas colorido e a página do imóvel
   mostra o mapa do Google incorporado (que não precisa de chave).

   Importante: no Google Cloud, restrinja a chave aos endereços do site
   (ex.: sunshine-site-rho.vercel.app/* e sunshine-imob.com.br/*), porque ela fica visível no navegador. */
window.SUNSHINE_CONFIG = {
  googleMapsKey: '',
};
