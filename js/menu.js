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

        // Crear un gráfico de fondo para el botón
        const botonFondo = juego.add.graphics();
        botonFondo.beginFill(0x000000); // Color de fondo negro
        botonFondo.lineStyle(2, 0xffffff); // Borde blanco
        botonFondo.drawRoundedRect(juego.world.centerX - 120, juego.world.centerY - 25, 240, 50, 10); // Rectángulo redondeado

        // Añadir el texto de "Iniciar Juego" centrado en el botón
        const botonIniciar = juego.add.text(juego.world.centerX, juego.world.centerY, 'Iniciar Juego', { font: '30px Arial', fill: '#ffffff' });
        botonIniciar.anchor.setTo(0.5);

        // Habilitar la interactividad
        botonIniciar.inputEnabled = true;
        botonIniciar.events.onInputDown.add(this.iniciarJuego, this);

        // Cambiar el estilo cuando el mouse pasa por encima
        botonIniciar.events.onInputOver.add(function() {
            botonIniciar.fill = '#ffcc00'; // Cambiar el color del texto cuando el mouse esté sobre él
            botonFondo.tint = 0xffcc00; // Cambiar el color del fondo también
        }, this);

        // Restaurar el estilo cuando el mouse sale del botón
        botonIniciar.events.onInputOut.add(function() {
            botonIniciar.fill = '#ffffff'; // Restablecer el color original del texto
            botonFondo.tint = 0xffffff; // Restablecer el color original del fondo
        }, this);


        // Añadir el texto de instrucciones
        const instrucciones = juego.add.text(juego.world.centerX, juego.world.centerY + 100, 'Usa las flechas para moverte', { font: '16px Arial', fill: '#ffffff' });
        instrucciones.anchor.setTo(0.5);

        // Añadir el texto de la tecla Enter
        const textoEnter = juego.add.text(juego.world.centerX, juego.world.centerY + 130, 'Presiona Enter para iniciar', { font: '16px Arial', fill: '#ffffff' });
        textoEnter.anchor.setTo(0.5);

        // Autor
        const autor = juego.add.text(juego.world.centerX, juego.world.centerY + 200, 'Jean Pool Gutierrez Gutierrez', { font: '20px Arial', fill: '#ffffff' });
        autor.anchor.setTo(0.5);

        // Detectar la tecla Enter
        const enterKey = juego.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.addOnce(this.iniciarJuego, this);
    },

    iniciarJuego: function() {
        // Cambia al estado de juego
        juego.state.start('game');
    }
};
