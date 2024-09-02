// main.js
let juego;

window.onload = function() {
    juego = new Phaser.Game(370, 667, Phaser.CANVAS, 'bloque_juego');

    // Añadir estados
    juego.state.add('preload', PreloadState);
    juego.state.add('menu', MenuState);
    juego.state.add('game', GameState);

    // Iniciar el primer estado
    juego.state.start('preload');
};
