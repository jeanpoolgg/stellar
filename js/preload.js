// preload.js
var PreloadState = {
    preload: function() {
        // Aquí solo cargamos lo esencial, por ejemplo, podrías omitir cargar cualquier recurso para esta prueba
    },

    create: function() {
        // Cambia al estado del menú inmediatamente después de la precarga
        juego.state.start('menu');
    }
};
