// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class EnemyBullet extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "EnemyBullet", frame ?? "Bullet0001.png");

		this.play("EnemyBullet");

		/* START-USER-CTR-CODE */
        scene.add.existing(this);
        scene.physics.add.existing(this);

        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setAllowGravity(false);
        body.setCollideWorldBounds(true);
        body.onWorldBounds = true;
		body.setCircle(10, 0	, 5);
        // Auto-destruir al salir del mundo
        scene.physics.world.on("worldbounds", (b: Phaser.Physics.Arcade.Body) => {
            if (b.gameObject === this) this.destroy();
        });

        // Auto-destruir después de 10 segundos
        scene.time.delayedCall(10000, () => {
            if (this.active) this.destroy();
        });
				this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
        /* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	create() {
	
		this.scene.physics.add.overlap((this.scene as any).player, this, this.killPlayer, undefined, this);
		this.scene.physics.add.collider((this.scene as any).plataformas, this, this.killBullet, undefined, this);
        		
	}

	killPlayer(player: any, spike: any) {
		(player as any).Die();
	}

	killBullet(platform: any, bullet: any) {
		// Efecto de partículas de estrellas antes de destruir
		const sparks = this.scene.add.particles(0, 0, 'starParticle', {
			x: this.x,
			y: this.y,
			speed: { min: 120, max: 260 },
			angle: { min: 0, max: 360 },
			scale: { start: 1, end: 0 },
			alpha: { start: 1, end: 0 },
			lifespan: { min: 250, max: 500 },
			quantity: 20,
			gravityY: -50
		});
		
		// Emitir una vez y limpiar
		sparks.explode(5, this.x, this.y);
		this.scene.time.delayedCall(600, () => {
			sparks.destroy();
		});
		
		// Destruir la bala (this)
		this.destroy();
	}

    // Dispara desde un cañón, usando su posición/rotación en el mundo, con offset opcional
    fireFrom(cannon: Phaser.GameObjects.GameObject, speed: number = 10, angleOffsetRad: number = -90 * (Math.PI / 180)) {
        const body = this.body as Phaser.Physics.Arcade.Body;

        let wx = (cannon as any).x ?? 0;
        let wy = (cannon as any).y ?? 0;
        let angle = (cannon as any).rotation ?? 0; // radianes

        const getWTM = (cannon as any).getWorldTransformMatrix?.bind(cannon);
        if (getWTM) {
            const m = getWTM();
            const p = new Phaser.Math.Vector2();
            m.transformPoint(0, 0, p);
            wx = p.x;
            wy = p.y;
            angle = Math.atan2(m.b, m.a);
        }

        angle += angleOffsetRad;

        this.setPosition(wx, wy);
        this.setRotation(angle + 90 * (Math.PI / 180));

        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        body.setVelocity(vx, vy);

        // Render detrás del cañón si ambos están en la escena (mismo padre)
        
    }
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
