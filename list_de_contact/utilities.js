"use strict";

/**
 * Fonction d'enregistrement de données complexes dans le local storage
 * @param storageName {string} chaine de caractère qui sera le nom de l'emplacement de stockage
 * @param datas {array} tableau qui contiens les données à stocker
 */
function setLocalStorage(storageName, datas){

    // on enregistre les données après les avoir converties en JSON
    window.localStorage.setItem(storageName, JSON.stringify(datas));
}


function getLocalStorage(storageName){
    var datas;

    // on récupère les données puis on les reconverties au format initial (JSON.parse)
    datas = JSON.parse(window.localStorage.getItem(storageName));

    return datas || [];
}



