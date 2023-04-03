function createCard(obj, $template, $fragment) {
    var typeCourse, bgTypeCourse, textColor, textBtn, newProgram;
    switch (obj.type_course) {
        case 'exm':
            bgTypeCourse = 'bg-exm'
            textColor = 'text-white'
            break;
        case 'cxo':
            bgTypeCourse = 'bg-cxo'
            textColor = 'text-white'
            break;
        case 'pe':
            bgTypeCourse = 'bg-pe'
            textColor = 'text-white'
            break;
        case 'pcp':
            bgTypeCourse = 'bg-pcp'
            textColor = 'text-white'
            break;
        case 'op':
            bgTypeCourse = 'bg-op'
            textColor = 'text-black'
            break;
    }
    switch (lang) {
        case 'es':
            newProgram = "Nuevo"
            textBtn = "Ver Programa"
            if (obj.type_course === 'exm') {
                typeCourse = 'Executive Master'
            } else if (obj.type_course === 'cxo') {
                typeCourse = 'Programa de Alta Dirección'
            } else if (obj.type_course === 'pe') {
                typeCourse = 'Programa de Especialización'
            } else if (obj.type_course === 'pcp') {
                typeCourse = 'Certificado Profesional';
            } else if (obj.type_course === 'op') {
                typeCourse = 'Programa Online';
            }
            break;
    }

    /*================================*/
    /*	SEGUIMIENTO DE LAS UTMS
    /*================================*/
    // var utmAux = window.location.href

    if (utmAux.includes('?utm')) {
        var utmAdded = utmAux.split('?utm_')[1]
        obj.ulr_pay = obj.ulr_pay + '?utm_' + utmAdded
        obj.url_landing = obj.url_landing + '?utm_' + utmAdded
    }
    /*****************************************************
     * Cambia el formato de imágenes de WEBP a JPG si el
     * navegador es SAFARI, debido a que causa problemas
     * en la visualización de imaágenes WEBP
     ****************************************************/
    obj.img_home = navegador.includes(typeBrowser) && obj.img_home.includes('.webp') ? obj.img_home.replace('.webp', '.jpg') : obj.img_home;

    /*================================*/
    /*	DECLARAR ETIQUETA NUEVO AL ITEM
    /*================================*/
    // var nuevo_programa;
    if (obj.hubs.includes('new_prog')) {
        $template.querySelector('.new-pgr').classList.remove('display-none')
        $template.querySelector('.new-pgr').innerHTML = newProgram
    } else {
        $template.querySelector('.new-pgr').classList.add('display-none')
        $template.querySelector('.new-pgr').innerHTML = ''
    }

    // $template.querySelector('img').dataset.src = obj.img_home
    $template.querySelector('img').dataset.src = obj.img_home
    $template.querySelector('img').alt = typeCourse + ' | ' + obj.program + ' ' + obj.subtitle
    $template.querySelector('h2').innerText = obj.program
    $template.querySelector('h3').innerText = obj.subtitle
    $template.querySelector('.type-course').innerText = typeCourse
    $template.querySelector('.type-course').className = 'type-course ' + bgTypeCourse + ' ' + textColor
    if (obj.type_course === 'exm') {
        if (obj.durationPre == '') {
            $template.querySelector('.text-courses').innerHTML = 'Semipesencial: ' + obj.durationSem
        } else if (obj.durationSem == '') {
            $template.querySelector('.text-courses').innerHTML = 'Presencial: ' + obj.durationSem
        } else {
            $template.querySelector('.text-courses').innerHTML = 'Presencial: ' + obj.durationPre +
                '<br>Semipesencial: ' + obj.durationSem
        }
    } else if (obj.type_course == 'cxo') {
        $template.querySelector('.text-courses').innerHTML = 'Semipesencial: ' + obj.durationSem
    } else {
        $template.querySelector('.text-courses').innerHTML = 'Online: ' + obj.durationPre
    }
    $template.querySelector('.btn-item-pgr').href = obj.url_landing
    $template.querySelector('.btn-item-pgr').innerText = textBtn
    // $template.querySelector('.clickadmi').href = url_pay

    let $clone = document.importNode($template, true);
    $fragment.appendChild($clone);
}