// player.js
const Player = function(game, x, y, playerName) {
    this.game = game;
    this.sprite = game.add.sprite(x, y, 'nave');
    this.sprite.anchor.setTo(0.5);
    this.sprite.scale.setTo(0.40, 0.40)

    // Añadir la animación
    this.sprite.animations.add('volar', [0, 1, 2], 10, true); // Frames 0, 1, 2 para la animación
    this.sprite.animations.play('volar');

    this.sprite.anchor.setTo(0.5);
    this.sprite.anchor.setTo(0.5);
    this.sprite.animations.play('volar');
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;

    // Nombre del jugador
    this.nombre = playerName;

    // Controles
    this.cursors = game.input.keyboard.createCursorKeys();
    this.botonDisparo = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // Atributos del jugador
    this.vida = 100;
    this.puntos = 0;

    // Grupo de balas
    this.balas = game.add.group();
    this.balas.enableBody = true;
    this.balas.physicsBodyType = Phaser.Physics.ARCADE;
    this.balas.createMultiple(20, 'laser');
    this.balas.setAll('anchor.x', 0.5);
    this.balas.setAll('anchor.y', 1);
    this.balas.setAll('outOfBoundsKill', true);
    this.balas.setAll('checkWorldBounds', true);

    // Tiempo entre disparos
    this.tiempoBala = 0;


    // Cargar sonido de disparo
    this.sonidoDisparo = this.game.add.audio('disparo');

    // Crear la barra de opciones en la parte inferior
    this.barHeight = 60; 
    this.barBackground = game.add.graphics();
    this.barBackground.beginFill(0x040050); // Fondo azul oscuro para la barra de opciones
    this.barBackground.drawRect(0, game.height - this.barHeight, game.width, this.barHeight);
    this.barBackground.endFill();

    // Crear el texto de puntaje y nombre del jugador en la parte inferior izquierda
    this.textoNombreYPuntos = game.add.text(20, game.height - this.barHeight + 20, `${this.nombre} - Puntos: 0`, { font: '16px Arial', fill: '#ffffff' });


    // Crear la barra de vida en la parte inferior derecha
    this.barraVida = game.add.graphics(0, 0);
    this.actualizarBarraVida();
};

Player.prototype.mover = function() {
    if (this.cursors.left.isDown) {
        this.sprite.body.velocity.x = -200;
    } else if (this.cursors.right.isDown) {
        this.sprite.body.velocity.x = 200;
    } else {
        this.sprite.body.velocity.x = 0;
    }

    if (this.cursors.up.isDown) {
        this.sprite.body.velocity.y = -200;
    } else if (this.cursors.down.isDown) {
        this.sprite.body.velocity.y = 200;
    } else {
        this.sprite.body.velocity.y = 0;
    }

    // Limitar la nave para que no baje más allá de la barra inferior
    if (this.sprite.y > this.game.height - this.barHeight - this.sprite.height / 2) {
        this.sprite.y = this.game.height - this.barHeight - this.sprite.height / 2;
    }

    // Limitar la nave para que no suba más allá de la parte superior
    if (this.sprite.y < this.sprite.height / 2) {
        this.sprite.y = this.sprite.height / 2;
    }
};


// Método para disparar
// player.js
Player.prototype.disparar = function() {
    if (this.botonDisparo.isDown) {
        if (this.game.time.now > this.tiempoBala) {
            var bala = this.balas.getFirstExists(false);
            if (bala) {
                bala.reset(this.sprite.x - 7, this.sprite.y - 40);
                bala.body.velocity.y = -300; // Reducir la velocidad de la bala para mejorar la detección
                bala.angle = 90;
                bala.scale.setTo(0.10, 0.10);
                this.tiempoBala = this.game.time.now + 400;

                // Reproducir sonido de disparo
                this.sonidoDisparo.play();
            }
        }
    }
};


Player.prototype.actualizarBarraVida = function() {
    this.barraVida.clear();
    this.barraVida.beginFill(0x00ff00); // Color verde para la barra de vida
    var barWidth = 150; // Ancho máximo de la barra de vida
    var barX = this.game.width - barWidth - 20; // Posición en el lado derecho
    this.barraVida.drawRect(barX, this.game.height - this.barHeight + 20, (this.vida / 100) * barWidth, 20);
    this.barraVida.endFill();
};

Player.prototype.reducirVida = function(damage) {
    this.vida -= damage;
    this.actualizarBarraVida();
    if (this.vida <= 0) {
        console.log('Game Over');
    }
};

Player.prototype.actualizarPuntos = function(puntos) {
    this.puntos += puntos;
    this.textoNombreYPuntos.text = `${this.nombre} - Puntos: ${this.puntos}`; // Actualiza el texto con el nombre y puntaje
};
