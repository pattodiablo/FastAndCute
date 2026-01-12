// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface Fall_Platform {

	 body: Phaser.Physics.Arcade.Body;
}

export default class Fall_Platform extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "Block2", frame);

		this.setInteractive(new Phaser.Geom.Rectangle(0, 0, 202, 155), Phaser.Geom.Rectangle.Contains);
		scene.physics.add.existing(this, false);
		this.body.allowGravity = false;
		this.body.allowDrag = false;
		this.body.allowRotation = false;
		this.body.collideWorldBounds = true;
		this.body.setSize(80, 80, false);

		/* START-USER-CTR-CODE */
			this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);

		//this.scene.events.on("update", () => this.update())
		/* END-USER-CTR-CODE */
	}

	public isFalling: boolean = false;
	public IsFallingPlatform: boolean = true;

	/* START-USER-CODE */

	create() {
		// Collider con el player
		this.fitBodyToTexture();

		// Asegurar que el body sea inamovable y estático hasta ser golpeado
		this.body.setImmovable(true);
		this.body.moves = false;
		this.body.pushable = false;
		this.body.allowGravity = false;

		// Collider permanente contra el grupo de enemigos
		const base = this.scene as any;

		// Añadir esta plataforma al grupo de plataformas
		if (base.plataformas) {
			base.plataformas.add(this);
		}

	base.physics.add.collider((this.scene as any).player, this, this.handlePlayerHit, undefined, this);

		// Collider con plataformas que detiene la caída
		base.physics.add.collider(base.plataformas, this, this.handlePlatformCollision, undefined, this);

		const attachEnemiesCollider = () => {
			const group = base.enemiesGroup as Phaser.Physics.Arcade.Group | undefined;
			if (group) {
				this.scene.physics.add.collider(group, this);
				return true;
			}
			return false;
		};

		// Intento inmediato
		if (!attachEnemiesCollider()) {
			// Reintentar algunas veces hasta que el grupo exista
			const retry = this.scene.time.addEvent({
				delay: 100,
				repeat: 30,
				callback: () => {
					if (attachEnemiesCollider()) retry.remove(false);
				}
			});
		}
	}



	private fitBodyToTexture() {
		const body = this.body as Phaser.Physics.Arcade.Body | undefined;

		if (!body) return;

		// Usar las dimensiones visuales del sprite (ya incluyen escala)
		const width = this.displayWidth;
		const height = this.displayHeight;

		// Ajusta el collider al bounding box rectangular de la textura actual
		body.setSize(width, height, true);
	}



	private handlePlayerHit(player: any, _platform: any) {

		const pBody = player?.body as Phaser.Physics.Arcade.Body | undefined;
		const platBody = this.body as Phaser.Physics.Arcade.Body;

		// Prevenir múltiples golpes - solo procesar si no está cayendo aún
		if (!pBody || this.isFalling) return;

		const charged = !!player?.chargeMode;
		console.log(`Fall_Platform: jugador hit. Charged: ${charged}`);
		if (charged) {
			console.log("Fall_Platform: jugador cargado, plataforma cae");
			this.isFalling = true;

			const base = this.scene as any;

			// Remover del grupo estático antes de hacerla dinámica
			if (base.plataformas) {
				base.plataformas.remove(this, false, false);
			}

			// Hacer que la plataforma caiga con gravedad
			platBody.setImmovable(false);
			platBody.pushable = true;
			platBody.moves = true;
			platBody.allowGravity = true;
			platBody.setGravityY(1200);
			platBody.setVelocity(0, 0);
			platBody.setMaxVelocity(0, 800);
			platBody.setBounce(0.3, 0.3);



			this.spawnBubbleBurst();

		} else {
			platBody.pushable = false;
			platBody.setImmovable(true);
		}
	}

	private handlePlatformCollision(platform1: any, platform2: any) {
		// Solo procesar si ya está cayendo
		if (!this.isFalling) return;

		// Determinar cuál es la otra plataforma (la que NO es this)
		const otherPlatform = platform1 === this ? platform2 : platform1;

		// Si la otra plataforma es de cristal, destruirla
		if (otherPlatform && otherPlatform.IsCristalPlatform) {
			console.log("Fall_Platform: golpeó plataforma de cristal, destruyéndola");
			if (typeof otherPlatform.destroyByCrush === 'function') {
				otherPlatform.destroyByCrush();
			}
			return;
		}

		const platBody = this.body as Phaser.Physics.Arcade.Body;

		// Detener la caída cuando colisiona con otra plataforma
		platBody.moves = false;
		platBody.pushable = false;
		platBody.allowGravity = false;
		platBody.setVelocity(0, 0);
		platBody.setImmovable(true);

		console.log("Fall_Platform: detenida al colisionar con otra plataforma");
	}

	preUpdate(time: number, delta: number) {
		super.preUpdate(time, delta);

		// Destruir solo si está cayendo y salió de la pantalla
		if (this.isFalling && this.y > this.scene.scale.height + 200) {
			this.destroy();
		}
	}

	private spawnBubbleBurst() {

		const particles = this.scene.add.particles(0, 0, "BubbleParticle", {
			x: this.x,
			y: this.y,
			speed: { min: 120, max: 300 },
			angle: { min: 0, max: 360 },
			lifespan: { min: 500, max: 1200 },
			scale: { start: 0.8, end: 0 },
			quantity: 20,
			maxParticles: 20,
			frequency: 0,
			gravityY: -120
		});

		this.scene.time.delayedCall(1500, () => particles.destroy());
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
