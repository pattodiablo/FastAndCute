// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface Platform2 {

	 body: Phaser.Physics.Arcade.Body;
}

export default class Platform2 extends Phaser.GameObjects.Sprite {

	private hasBurst = false;
	private heartbeatTween?: Phaser.Tweens.Tween;

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "Platform2", frame);

		scene.physics.add.existing(this, false);
		this.body.moves = false;
		this.body.allowGravity = false;
		this.body.allowDrag = false;
		this.body.allowRotation = false;
		this.body.pushable = false;
		this.body.setSize(261, 154, false);

		/* START-USER-CTR-CODE */
			this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);

				this.explodeFx = this.scene.sound.add("realPop");
		(this.scene as any).addFx(this.explodeFx);
		//this.scene.events.on("update", () => this.update())
		/* END-USER-CTR-CODE */
	}
public explodeFx!: any;
	/* START-USER-CODE */

	create() {
		// Collider con el player
		this.scene.physics.add.collider((this.scene as any).player, this, this.handlePlayerHit, undefined, this);
		this.fitBodyToTexture();
		this.startHeartbeat();

		// Asegurar que el body sea inamovable (mejor respuesta de colisión)
		this.body.setImmovable(true);

		// Collider permanente contra el grupo de enemigos
		const base = this.scene as any;

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

		// Calcular radio del círculo y centrarlo
		const diameter = this.displayHeight;
		const radius = diameter / 1.5;
		
		// setCircle automáticamente centra el círculo, solo necesitamos offset para ajustar al sprite
		const offsetX = width / 2 - radius;
		const offsetY = 0;
		
		body.setCircle(radius, offsetX, offsetY);
	}

	private startHeartbeat() {
		// Suave latido visual para destacar la plataforma
		this.heartbeatTween = this.scene.tweens.add({
			targets: this,
			scale: { from: this.scale, to: this.scale * 1.05 },
			duration: 2000,
			yoyo: true,
			repeat: -1,
			ease: "Sine.easeInOut"
		});

		this.once(Phaser.GameObjects.Events.DESTROY, () => this.heartbeatTween?.stop());
	}

	private handlePlayerHit(player: any, _platform: any) {

		const pBody = player?.body as Phaser.Physics.Arcade.Body | undefined;
		const platBody = this.body as Phaser.Physics.Arcade.Body;
			
		if (!pBody || this.hasBurst) return;

		const charged = !!player?.chargeMode;
		console.log(`Plataforma2: jugador hit. Charged: ${charged}`);
		if (charged) {
			console.log("Plataforma2: jugador cargado, plataforma movible");
			platBody.pushable = true;
			platBody.setImmovable(false);
			this.hasBurst = true;
			platBody.enable = false;
			this.spawnBubbleBurst();
			this.setVisible(false);
			this.setActive(false);
			this.scene.time.delayedCall(300, () => this.destroy());
		} else {
			platBody.pushable = false;
			platBody.setImmovable(true);
		}
	}

	private spawnBubbleBurst() {
					this.explodeFx.play();
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
