const navegador = (function () {
    const agente = navigator.userAgent.toLowerCase();
    if (agente.indexOf('firefox') !== -1) {
        return 'firefox';
    } else if (agente.indexOf('edge') !== -1 || agente.indexOf('edg') !== -1) {
        return 'edge';
    } else if (agente.indexOf('opr') !== -1 || agente.indexOf('opera') !== -1) {
        return 'opera';
    } else if (agente.indexOf('chrome') !== -1) {
        return 'chrome';
    } else if (agente.indexOf('safari') !== -1) {
        return 'safari';
    } else {
        return 'desconocido';
    }
})();



