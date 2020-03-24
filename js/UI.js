class UI {
    constructor() {
        this.mapa = this.inicializarMapa();
        this.cargarSelectProvincias();
        this.markers = new L.LayerGroup();
    }

    inicializarMapa() {
         const map = L.map('mapa').setView([-34.6703447, -58.5628491], 10);
         const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
         L.tileLayer(
             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; ' + enlaceMapa + ' Contributors',
             maxZoom: 18,
             }).addTo(map);
         return map;
    }

    cargarSelectProvincias(){
        const selectProvincias = document.querySelector('#selectProvincias');
        api.obtenerProvincias()
            .then(data => {
                data.datos.provincias.forEach(provincia => {
                   const opcion = document.createElement('option');
                   opcion.value = provincia.id;
                   opcion.appendChild(document.createTextNode(provincia.nombre));
                   selectProvincias.appendChild(opcion); 
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    pintarMapa(datos,opcionAMostrar){
        // limpio los pines de la consulta anterior
        this.markers.clearLayers();
        datos[opcionAMostrar].forEach(ubicacion => {
            const { centroide, nombre } = ubicacion;
            this.dibujarPin(centroide,nombre);
        })
        this.markers.addTo(this.mapa);
    }

    dibujarPin(centroide, nombre){
        const { lat, lon } = centroide;
        const marker = new L.marker([lat,lon]);
        this.markers.addLayer(marker);
    }

}