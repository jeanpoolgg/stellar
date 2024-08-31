// main.js
var juego;

window.onload = function() {
    juego = new Phaser.Game(370, 667, Phaser.CANVAS, 'bloque_juego');

    // Añadir estados
    juego.state.add('preload', PreloadState);
    juego.state.add('menu', MenuState);
    // No es necesario añadir 'game' ahora, solo asegúrate de que 'menu' funcione primero

    // Iniciar el primer estado
    juego.state.start('preload');
};
