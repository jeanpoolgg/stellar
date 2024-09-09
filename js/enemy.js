// enemy.js
var Enemy = function(game, x, y) {
    this.game = game; 
    this.sprite = game.add.sprite(x, y, 'enemigo');
        // Añadir la animación
    this.sprite.animations.add('latir', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true); // Los frames 0 a 4 para la animación
    this.sprite.animations.play('latir');
    this.sprite.anchor.setTo(0.5);
    this.sprite.scale.setTo(0.15, 0.15);
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.moves = false;
    
    // Guardar una referencia al objeto Enemy dentro del propio sprite
    this.sprite.enemyRef = this;
};

Enemy.prototype.destruir = function() {
    this.sprite.kill(); // Elimina el sprite del juego
};

