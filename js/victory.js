var VictoryHandler = {
    backgroundOverlay: null, // Fondo de victoria
    winText: null, // Texto de victoria

    juegoGanar: function(juego) {
        // Crear un fondo negro semitransparente
        this.backgroundOverlay = juego.add.graphics(0, 0);
        this.backgroundOverlay.beginFill(0x000000, 0.7); // Color negro con 70% de transparencia
        this.backgroundOverlay.drawRect(0, 0, juego.width, juego.height);
        this.backgroundOverlay.endFill();

        // Mostrar mensaje de victoria adaptado al ancho del juego
        this.winText = juego.add.text(juego.world.centerX, juego.world.centerY, '¡Ganaste! Presiona Enter para reiniciar.', 
            { font: '24px Arial', fill: '#ffffff', wordWrap: true, wordWrapWidth: juego.width - 40, align: 'center' });
        this.winText.anchor.setTo(0.5);

        // Desactivar la actualización del juego
        juego.paused = true;

        // Añadir un listener para el botón Enter que reinicia el juego
        var enterKey = juego.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.addOnce(function() {
            VictoryHandler.reiniciarJuego(juego); // Llamada a la función de reinicio
        }, this);
    },

    ocultarPantallaVictoria: function() {
        // Eliminar el fondo y el texto de victoria si existen
        if (this.backgroundOverlay) {
            this.backgroundOverlay.destroy(); // Eliminar fondo negro
            this.backgroundOverlay = null; // Limpiar referencia
        }
        if (this.winText) {
            this.winText.destroy(); // Eliminar texto de victoria
            this.winText = null; // Limpiar referencia
        }
    },

    reiniciarJuego: function(juego) {
        // Ocultar el mensaje de victoria
        this.ocultarPantallaVictoria();

        // Despausar el juego y reiniciar el estado del juego
        juego.paused = false;
        juego.state.start('GameState'); // Reiniciar el estado del juego desde cero
    }
};
