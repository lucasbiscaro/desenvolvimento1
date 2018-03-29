window.onload = function() {
  // Criando o meu mapa html e colocando-o em um variável
  var map = L.map('mymap').setView([-22.4123,-42.9664],13);

  // Carregando o Tile OpenStreetMap e colocando-o em uma variável
  var osm = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  // Carregando o Tile do Mapbox e colocando-o em uma variável
  var mb = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    id: "mapbox.satellite",
    accessToken: "pk.eyJ1IjoibHVjYXNiaXNjYXJvIiwiYSI6ImNqZjJyY2NiNDAwcTgzM2x0czlpbnA0cTkifQ.MvRGPuxzJSBW_wH_MbeY0g",
  }
);

  //Adicionar camada WMS ao meu Mapas
  var mun =  L.tileLayer.wms("http://www.geoservicos.ibge.gov.br/geoserver/CCAR/wms", {
    layers: "CCAR:BCIM_Municipio_A",
    transparent: "true",
    format: "image/png"
  });

  //Pontos
  var ponto1 = L.marker([-22.4323, -42.9864]);
      ponto2 = L.marker([-22.4923, -42.9164]);

  //linhas
  var linha1 = L.polyline([[-22.4, -42.4],[-22.8, -42.8]]);
      linha2 = L.polyline([[-26.9, -42.9],[-20.3, -42.3]]);

  //Agrupando camadas
  var pontos = L.layerGroup([ponto1, ponto2]).addTo(map);
  var linhas = L.layerGroup([linha1, linha2]).addTo(map);

  //Mapas base
  var basecarto = {
    "Base OpenStreetMap": osm,
    "Base MapBox": mb
  };

  //Feições
  var feicoes = {
    "Pontos": pontos,
    "Linhas": linhas,
    "Geoserver": mun
  };

  //Escala gráfica
  L.control.scale({position: 'bottomright'}).addTo(map)

  //Adicionar objetos ao controle de camadas
  L.control.layers(basecarto, feicoes).addTo(map);
}
