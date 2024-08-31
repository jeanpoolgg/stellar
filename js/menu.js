// menu.js
var MenuState = {
    create: function() {
        // Establecer el fondo en negro
        juego.stage.backgroundColor = '#000000';

        // Dibujar un rectángulo en el centro como fondo del menú
        var graphics = juego.add.graphics(0, 0);
        graphics.beginFill(0x1d1d1d); // Color gris oscuro
        graphics.drawRect(juego.world.centerX - 150, juego.world.centerY - 200, 300, 400);
        graphics.endFill();

        // Añadir el título del juego
        var titulo = juego.add.text(juego.world.centerX, juego.world.centerY - 150, 'Stellar', { font: '40px Arial', fill: '#ffffff' });
        titulo.anchor.setTo(0.5);

        // Añadir el botón de iniciar el juego
        var botonIniciar = juego.add.text(juego.world.centerX, juego.world.centerY, 'Iniciar Juego', { font: '30px Arial', fill: '#ffffff' });
        botonIniciar.anchor.setTo(0.5);
        botonIniciar.inputEnabled = true;
        botonIniciar.events.onInputDown.add(this.iniciarJuego, this);

        // Añadir el texto de instrucciones
        var instrucciones = juego.add.text(juego.world.centerX, juego.world.centerY + 100, 'Usa las flechas', { font: '20px Arial', fill: '#ffffff' });
        instrucciones.anchor.setTo(0.5);
    },

    iniciarJuego: function() {
        // Cambia al estado de juego
        juego.state.start('game');
    }
};
