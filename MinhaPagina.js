window.onload = function() {
  //ciração do mapa
  var mapa = L.map('meumapa').setView([-25.45,-49.27],11);

  //OpenStreetMap - Tile
  var osm = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapa);

  //Mapbox - Tile
  var mapbox = L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    id: "mapbox.satellite",
    accessToken: "pk.eyJ1IjoibHVjYXNiaXNjYXJvIiwiYSI6ImNqZjJyY2NiNDAwcTgzM2x0czlpbnA0cTkifQ.MvRGPuxzJSBW_wH_MbeY0g",
  }
);

//Adicionar camada WMS ao mapa
var usastates = L.tileLayer.wms('http://localhost:8082/geoserver/wms', {
layers: 'topp:states',
transparent: 'true',
format: 'image/png'
}).addTo(mapa);

  //Pontos
  var ponto1 = L.marker([-25.45, -49.27]);
      ponto2 = L.marker([-25.43, -49.29]);

  //Linhas
  var linha1 = L.polyline([[-25.4, -49.2], [-25.5, -49.1]]);
      linha2 = L.polyline([[-25.4, -49.1], [-25.5, -49.2]]);

  //Agrupar camadas
  var pontos = L.layerGroup([ponto1, ponto2]).addTo(mapa);
  var linhas = L.layerGroup([linha1, linha2]).addTo(mapa);
  // var combinacao = L.layerGroup([ponto1, ponto2, linha1, linha2, osm]).addTo(mapa);

  //Polígono
  var poligono = L.polygon([
    [-25.5, -49.3],
    [-25.5, -49.5],
    [-25.6, -49.3]
    ],{
      color: 'yellow',
      fillColor: '000',
      fillOpacity: 0.8
    }).addTo(mapa);

  //Círculo
  var circulo = L.circle(
    [-25.45, -49.35],
    {
      color: 'blue',
      fillColor: 'green',
      fillOpacity: 0.5,
      radius: 5000
    }
  ).addTo(mapa);

  //Mapas base
  var baseCartografica = {
    "Base OpenStreetMap": osm,
    "Base Mapbox": mapbox
  }

  //Mapas de sobreposiçao
  var informacaoTematica = {
    "Pontos": pontos,
    "Linhas": linhas,
    "Poligono": poligono,
    "Geoserver": usastates
  }

  //Escala gráfica
  L.control.scale({position: 'bottomright'}).addTo(mapa);

  //Adicionar objetos ao controle de camadas
  L.control.layers(baseCartografica, informacaoTematica).addTo(mapa);



//ponto.bindPopup("Eu sou o Neymar!");
//linha.bindPopup("Eu sou uma linha!");
//poligono.bindPopup("Eu sou um polígono!");
// circulo.bindPopup("Eu sou um círculo");

//Abrir popus
// ponto.openPopup();
// linha.openPopup();
// poligono.openPopup();
// circulo.openPopup();
//
// //Popup em local específico do mapa
// var popup = L.popup()
// .setLatLng([-25.44, -49.51])
// .setContent("Eu sou uma popup!")
// .openOn(mapa);
//
// //Evento disparado após o clique do usuário
// mapa.on('dblclick', function (evento) {
// alert("Você clicou em: " + evento.latlng);
// });

//Adicionar legenda WMS
var uri = 'http://localhost:8082/geoserver/wms?REQUEST=GetLegendGraphic&FORMAT=image/jpeg&LAYER=topp:states';

document.getElementById('legenda').src = uri;


}
