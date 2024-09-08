var GameState = {
    level: 1, // Nivel inicial
    maxLevels: 2, // Número máximo de niveles en el juego

    create: function() {
        // Establecer el fondo del juego
        this.background = juego.add.tileSprite(0, 0, juego.width, juego.height, 'fondo');

        // Pedir el nombre del jugador
        var playerName = prompt("Ingresa tu nombre:");

        // Crear el jugador usando la clase Player
        this.player = new Player(juego, juego.world.centerX, juego.height - 120, playerName);

        // Inicializar puntos y vida completa
        this.player.puntos = 0;
        this.player.vida = 100; // Establecer la vida completa

        // Crear un grupo para almacenar todos los enemigos
        this.enemigos = juego.add.group();

        // Generar los enemigos en una cuadrícula según el nivel
        this.crearEnemigos(this.level);

        // Instanciar el manejador de colisiones
        this.collisionHandler = new CollisionHandler(juego, this.player, this.enemigos);

        // Escuchar la tecla "Enter" para reiniciar el juego
        var enterKey = juego.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.add(this.reiniciarJuego, this);

        // Añadir el texto del nivel en la esquina superior izquierda
        this.textoNivel = juego.add.text(10, 10, 'Nivel: ' + this.level, { font: '20px Arial', fill: '#ffffff' });
    },

    update: function() {
        // Mover y disparar el jugador
        this.player.mover();
        this.player.disparar();

        // Actualizar las colisiones
        this.collisionHandler.updateCollisions();

        // Verificar si todos los enemigos han sido eliminados
        if (this.enemigos.countLiving() === 0) {
            if (this.level < this.maxLevels) {
                this.level++; // Incrementar el nivel
                this.textoNivel.setText('Nivel: ' + this.level); // Actualizar el texto del nivel
                this.pasarAlSiguienteNivel(); // Ir al siguiente nivel
            } else {
                // Juego ganado después de derrotar a todos los enemigos del nivel final
                VictoryHandler.juegoGanar(juego); // Mostrar pantalla de victoria
            }
        }
    },

    crearEnemigos: function(nivel) {
        var enemigosPorFila = 3 + nivel; // Aumentar enemigos según el nivel
        var anchoEnemigo = 48; // Ancho de cada enemigo
        var espacioEntreEnemigos = 10; // Espacio entre enemigos
        var anchoTotal = (enemigosPorFila * anchoEnemigo) + ((enemigosPorFila - 1) * espacioEntreEnemigos);

        var posicionInicialX = (this.game.width - anchoTotal - 40) / 2; // Centra los enemigos

        for (var y = 0; y < 3 + nivel; y++) { // Aumentar filas según el nivel
            for (var x = 0; x < enemigosPorFila; x++) {
                var enemigo = new Enemy(juego, posicionInicialX + x * (anchoEnemigo + espacioEntreEnemigos), y * 50);
                this.enemigos.add(enemigo.sprite); // Añadir el sprite del enemigo al grupo de enemigos
            }
        }

        // Posicionar los enemigos
        this.enemigos.x = posicionInicialX;
        this.enemigos.y = 50;

        // Crear el tween para mover los enemigos de izquierda a derecha
        var tween = juego.add.tween(this.enemigos)
            .to({ x: this.game.width - anchoTotal - posicionInicialX }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);

        // Añadir la función para que bajen cada vez que lleguen al borde
        tween.onRepeat.add(this.descenderEnemigos, this);
    },

    descenderEnemigos: function() {
        this.enemigos.y += 2; // Desciende todos los enemigos
    },

    pasarAlSiguienteNivel: function() {
        // Limpiar enemigos actuales
        this.enemigos.removeAll(true);

        // Generar nuevos enemigos para el siguiente nivel
        this.crearEnemigos(this.level);
    },

    reiniciarJuego: function() {
        // Ocultar la pantalla de victoria si está visible
        VictoryHandler.ocultarPantallaVictoria();

        // Reiniciar todos los valores
        this.level = 1; // Reiniciar el nivel a 1
        this.textoNivel.setText('Nivel: ' + this.level); // Actualizar el texto del nivel
        this.player.puntos = 0; // Reiniciar los puntos del jugador
        this.player.vida = 100; // Restaurar la vida completa

        // Limpiar enemigos y volver a crear para el nivel 1
        this.enemigos.removeAll(true);
        this.crearEnemigos(this.level);
    }
};
