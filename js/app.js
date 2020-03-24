
const api = new API();
const ui = new UI();

//variables
const btnConsultar = document.querySelector('#btnConsultar');

//eventListeners
btnConsultar.addEventListener('click', (evt) => {
    evt.preventDefault();
    const selectProvincias = document.querySelector('#selectProvincias');
    const selectMostrar = document.querySelector('#selectMostrar');
    const provinciaAMostrar = selectProvincias[selectProvincias.selectedIndex].value;
    let opcionAMostrar = selectMostrar[selectMostrar.selectedIndex].value;
    const query = `https://apis.datos.gob.ar/georef/api/${opcionAMostrar}?provincia=${provinciaAMostrar}&max=3000`;
    if(opcionAMostrar==='localidades-censales'){
        opcionAMostrar = 'localidades_censales';
    }
    api.consultarAPI(query)
        .then(data => {
            const { datos } = data;
            ui.pintarMapa(datos,opcionAMostrar);
        })
        .catch(error => {
            ui.mostrarMensaje('Error al procesar la consulta','bg-danger');        
        });
});
