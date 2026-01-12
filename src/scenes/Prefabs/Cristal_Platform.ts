// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface Cristal_Platform {

	 body: Phaser.Physics.Arcade.Body;
}

export default class Cristal_Platform extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "CristalBlock", frame);

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
	public IsCristalPlatform: boolean = true;

	/* START-USER-CODE */

	create() {
		// Collider con el player
		this.fitBodyToTexture();

		// Asegurar que el body sea inamovible y estático hasta ser golpeado
		this.body.setImmovable(true);
		this.body.moves = false;
		this.body.pushable = false;
		this.body.allowGravity = false;

		// Collider permanente contra el grupo de enemigos
		const base = this.scene as any;

	base.physics.add.collider((this.scene as any).player, this, this.handlePlayerHit, undefined, this);

		// Collider con plataformas ANTES de agregarse al grupo
	//	base.physics.add.collider(base.plataformas, this, this.handlePlatformCollision, undefined, this);

		// Añadir esta plataforma al grupo de plataformas DESPUÉS de crear el collider
		if (base.plataformas) {
			base.plataformas.add(this);
		}

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
		const charged = !!player?.chargeMode;
		
		if (charged) {
			// Camera shake para indicar que no se puede destruir así
			this.scene.cameras.main.shake(200, 0.005);
			console.log("Cristal_Platform: no se puede destruir con golpe del jugador");
		}
	}

	private handlePlatformCollision(platform1: any, platform2: any) {
		// Determinar cuál es la otra plataforma (la que NO es this)
		const otherPlatform = platform1 === this ? platform2 : platform1;
		console.log("plataforma con la que colisiona Cristal_Platform:", otherPlatform);
		// Si la otra plataforma es de tipo Fall_Platform, destruir esta plataforma de cristal
		if (otherPlatform.IsFallingPlatform) {
			console.log("Cristal_Platform: golpeada por plataforma cayendo, destruyéndose");

			// Desactivar física inmediatamente
			this.body.enable = false;

			// Generar burst de burbujas
			this.spawnBubbleBurst();

			// Hacer invisible y destruir
			this.setVisible(false);
			this.setActive(false);

			// Remover del grupo de plataformas
			const base = this.scene as any;
			if (base.plataformas) {
				base.plataformas.remove(this, false, false);
			}

			// Destruir después de un breve delay
			this.scene.time.delayedCall(300, () => this.destroy());
		}
	}

	public destroyByCrush() {
		console.log("Cristal_Platform: siendo destruida por aplastamiento");
		
		// Desactivar física inmediatamente
		this.body.enable = false;
		
		// Generar burst de burbujas
		this.spawnBubbleBurst();
		
		// Hacer invisible y destruir
		this.setVisible(false);
		this.setActive(false);
		
		// Remover del grupo de plataformas
		const base = this.scene as any;
		if (base.plataformas) {
			base.plataformas.remove(this, false, false);
		}
		
		// Destruir después de un breve delay
		this.scene.time.delayedCall(300, () => this.destroy());
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
