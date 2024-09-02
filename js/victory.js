// victory.js

var VictoryHandler = {
    juegoGanar: function(juego) {
        // Crear un fondo negro semitransparente
        var backgroundOverlay = juego.add.graphics(0, 0);
        backgroundOverlay.beginFill(0x000000, 0.7); // Color negro con 70% de transparencia
        backgroundOverlay.drawRect(0, 0, juego.width, juego.height);
        backgroundOverlay.endFill();

        // Mostrar mensaje de victoria adaptado al ancho del juego
        var winText = juego.add.text(juego.world.centerX, juego.world.centerY, '¡Ganaste! Presiona Enter para reiniciar.', 
            { font: '24px Arial', fill: '#ffffff', wordWrap: true, wordWrapWidth: juego.width - 40, align: 'center' });
        winText.anchor.setTo(0.5);

        // Desactivar la actualización del juego
        juego.paused = true;

        // Añadir un listener para el botón Enter que reinicia el juego
        var enterKey = juego.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.addOnce(function() {
            VictoryHandler.reiniciarJuego(juego);
        }, this);
    },

    reiniciarJuego: function(juego) {
        // Reiniciar el estado del juego y despausar
        juego.paused = false;
        juego.state.start('GameState'); // Reiniciar el estado del juego
    }
};
