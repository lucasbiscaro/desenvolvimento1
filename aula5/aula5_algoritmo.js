window.onload = function() {
  //Criar classe dos simbolos
  var Simbolo = L.Icon.extend({
  options: {
  iconSize: [50, 50],
  iconAnchor: [25, 25],
  popupAnchor: [0, -30]
  }
  });

  //Instanciar um símbolo
  //COlocando todos os símbolos em um único vetor
  var simbolo = [];

  for(var i=0; i<=174; i++){
    simbolo[i] = new Simbolo({iconUrl: "simbolos/"+ i +".svg"});
  }

  // Criando a varíavel para visualização
  var mapa = L.map("meumapa",{
    center: [-25.5, -49.25],
    zoom: 11
  });

  //Base do site Leaflet Provider Demo
  var OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(mapa);

  var OpenStreetMap_France2 = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
  maxZoom: 20,
  attribution: '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  //Zoom para a posiçao do usuário
  mapa.locate({
    setView: true,
    maxZoom: 18,
    timeout: 10000
  });

  //Evento dizendo que encontrou o usuário
  // mapa.on("locationfound", function(evento) {
  //   L.marker(evento.latlng,{icon: simbolo[8]}).addTo(mapa);
  //   L.circle(evento.latlng, evento.accuracy).addTo(mapa);
  // });

  // mapa.on("locationerror", function(evento) {
  //   alert("Não foi possível obter sua localização");
  // });

  // //Adicionando um marcador aleatório
  // L.marker([-25.5,-49.25],{icon: simbolo[173]}).addTo(mapa).bindPopup("O ozado chegou!");

  //Ponto
  var pontos = [
  {
    type: "Feature",
    properties: {
      id: 1,
      descricao: "Meu primeiro ponto em GeoJSON!"
    },
    geometry: {
      type: "Point",
      coordinates: [-49.2, -25.5]
    }
  },
  {
    type: "Feature",
    properties: {
      id: 2,
      descricao: "Meu segundo ponto em GeoJSON!"
    },
    geometry: {
      type: "Point",
      coordinates: [-49.3, -25.4]
    }
  }];

  L.geoJSON(pontos, {
    pointToLayer: function(feicao,posicao) {
      if(feicao.properties.id == 1){
          return L.marker(posicao, {icon: simbolo[108]});
      } else {
          return L.marker(posicao, {icon: simbolo[102]});
      }
    },
    onEachFeature: function(feicao, camada) {
      camada.bindPopup(feicao.properties.descricao + "<br/>" + "ID: "+feicao.properties.id);
    }
  }).addTo(mapa);

  //Adicionando o arquivo GeoJSON
  L.geoJSON(bairros, {
    style: function(feicao) {
      cores = ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"]

      return {
        weight: 0.2,
        color: "#000",
        fillColor: cores[feicao.properties.CD_REGIONA-1],
        fillOpacity: 1
      }
    },
    onEachFeature: function (feicao, camada) {
      camada.bindTooltip(feicao.properties.NOME);
    }
  }).addTo(mapa);

  var MiniMap = new L.Control.MiniMap(OpenStreetMap_France2).addTo(mapa);

}
