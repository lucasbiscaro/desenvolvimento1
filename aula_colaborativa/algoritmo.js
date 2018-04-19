window.onload = function() {
	

  //1 - Mapa centrado em Curitiba
	var map = L.map("meumapa", {
		center: [-25.45, -49.25],
		zoom: 12,
		zoomSnap: 0.5,
		zoomDelta: 0.5,
		minZoom: 4.5,
		maxZoom: 18
	});
  
  //2 - Camadas base
	
	var osmColorido = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  
  
}