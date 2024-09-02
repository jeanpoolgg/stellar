// game.js
var GameState = {
    create: function() {
        // Establecer el fondo del juego
        this.background = juego.add.tileSprite(0, 0, juego.width, juego.height, 'fondo');

        // Pedir el nombre del jugador
        var playerName = prompt("Ingresa tu nombre:");

        // Crear el jugador usando la clase Player
        this.player = new Player(juego, juego.world.centerX, juego.height - 120, playerName);

        // Crear un grupo para almacenar todos los enemigos
        this.enemigos = juego.add.group();

        // Generar los enemigos en una cuadrícula
        this.crearEnemigos();

        // Instanciar el manejador de colisiones
        this.collisionHandler = new CollisionHandler(juego, this.player, this.enemigos);
    },

    update: function() {
        // Mover y disparar el jugador
        this.player.mover();
        this.player.disparar();

        // Actualizar las colisiones
        this.collisionHandler.updateCollisions();

        // Verificar si todos los enemigos han sido eliminados
        if (this.enemigos.countLiving() === 0) {
            VictoryHandler.juegoGanar(juego); // Llamar a la función para manejar la victoria
        }

  
    },

    crearEnemigos: function() {
        var enemigosPorFila = 5;
        var anchoEnemigo = 48; // Ancho de cada enemigo
        var espacioEntreEnemigos = 10; // Espacio entre enemigos
        var anchoTotal = (enemigosPorFila * anchoEnemigo) + ((enemigosPorFila - 1) * espacioEntreEnemigos);

        var posicionInicialX = (this.game.width - anchoTotal - 40) / 2; // Centra los enemigos

        for (var y = 0; y < 4; y++) {
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
        this.enemigos.y += 2; // Desciende todos los enemigos 20 píxeles
    }

    
};
