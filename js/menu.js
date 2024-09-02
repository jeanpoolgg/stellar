// menu.js
const MenuState = {
    create: function() {
        // Establecer el fondo en negro
        juego.stage.backgroundColor = '#g1g1b9';

        // Dibujar un rectángulo en el centro como fondo del menú
        const graphics = juego.add.graphics(0, 0);
        graphics.beginFill(0x1d5d9d); // Color gris oscuro
        graphics.drawRect(juego.world.centerX - 200, juego.world.centerY - 350, 400, 700);
        graphics.endFill();

        // Añadir el título del juego
        const titulo = juego.add.text(juego.world.centerX, juego.world.centerY - 150, 'Stellar', { font: '40px Arial', fill: '#ffffff' });
        titulo.anchor.setTo(0.5);

        // Añadir el botón de iniciar el juego
        const botonIniciar = juego.add.text(juego.world.centerX, juego.world.centerY, 'Iniciar Juego', { font: '30px Arial', fill: '#ffffff' });
        botonIniciar.anchor.setTo(0.5);
        botonIniciar.inputEnabled = true;
        botonIniciar.events.onInputDown.add(this.iniciarJuego, this);

        // Añadir el texto de instrucciones
        const instrucciones = juego.add.text(juego.world.centerX, juego.world.centerY + 100, 'Usa las flechas para moverte', { font: '20px Arial', fill: '#ffffff' });
        instrucciones.anchor.setTo(0.5);

        // Añadir el texto de la tecla Enter
        const textoEnter = juego.add.text(juego.world.centerX, juego.world.centerY + 150, 'Presiona Enter para iniciar', { font: '20px Arial', fill: '#ffffff' });
        textoEnter.anchor.setTo(0.5);

        // Detectar la tecla Enter
        const enterKey = juego.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.addOnce(this.iniciarJuego, this);
    },

    iniciarJuego: function() {
        // Cambia al estado de juego
        juego.state.start('game');
    }
};
