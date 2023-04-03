const lang_html = document.querySelector('html').lang
const lang = lang_html.toLowerCase().trim().slice(0, 2);
const utmAux = window.location.href

/************************************************************************************
 * @var docJob es el documento json para empezar el sistema (CSV o JSON)
 * @var elementosPorPagina número de tarjetas que se mostrará en pantalla
 * @var scrollElement elemento elegido para hacer scrollTop con boton de páginas o hubs
 * @var hubStart para recoger el primer HUB activo en pantalla / data-hubactivo
 *************************************************************************************/
const docJob = document.querySelector('#productos').dataset.document
const elementosPorPagina = parseInt(document.querySelector('#productos').dataset.numpagina)
const hubStart = document.querySelector('#productos').dataset.hubactivo
const scrollElement = document.querySelector('#column-programs')

/*********************************************************************************** 
 * @function infoProducts retorna la información en pantalla de los HUBs 
 * encontrados y acciona los activados de HUBS según filtro
 * @param arrayObjetos es el arreglo de objetos ya filtrados 
 * @param tagProgram es el hubs del programa elegido
 ********************************************************************************** */
function infoProducts(arrayObjetos, tagProgram) {

    /** activación del botón de HUB si se ha clicado en el elemento*/
    var allIndicator = document.querySelectorAll('.hub-prog')
    allIndicator.forEach(item => {
        if (item.id == tagProgram) {
            item.classList.add('activo');
        } else {
            item.classList.remove('activo');
        }
    })

    /**recorrido de arreglo de objetos filtrados */
    arrayObjetos.then(arrayObj => {
        /** función para construir tarjetas por páginas*/
        paginacionObjetos(arrayObj)
    })
}

/*****************************************************************************************
 * Se inicializa la pantalla con la @function infoProducts para mostrar el primer
 * resultado según la @var hubStart y el resultado de la busqueda por HUBs.
 * Se usará una función u otra dependiendo del documento a trabajar:
 *      documento CSV : resultadoHubCsv(docCSV, [hub a buscar])
 *      documento JSON: resultadoHubJson(docjson, [hub a buscar])
 * 
 * @function clicksIdsHubs es la función que añade evento click a todos
 * los IDs de hubs que existan en el DOM - HTML
 * @param docJob  / se pasa documento a trabajar para su filtrado (CSV o JSON) y 
 * dentro de esta función se añadirán eventos click para llamar a @function infoProducts
 ****************************************************************************************/

if (docJob.includes('.json')) {
    infoProducts(resultadoHubJson(docJob, hubStart), hubStart)
} else if (docJob.includes('.csv')) {
    infoProducts(resultadoHubCsv(docJob, hubStart), hubStart)
}
clicksIdsHubs(docJob)

