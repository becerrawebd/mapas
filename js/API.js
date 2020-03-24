class API {


    async consultarAPI(url){
        const respuesta = await fetch(`${url}`);
        const datos = await respuesta.json();
        return {
            datos
        }
    }

    obtenerProvincias(){
        const urlProvincias = 'https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre';
        return this.consultarAPI(urlProvincias);
    }

    obtenerOpcionesAMostrar(){
        const urlOpciones = 'https://apis.datos.gob.ar/georef/api/';
        return this.consultarAPI(urlOpciones);  
    }

}