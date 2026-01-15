// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface Fall_Platform {

	 body: Phaser.Physics.Arcade.Body;
}

export default class Fall_Platform extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "BlockRockl", frame);
		this.hostScene = scene;

		this.setInteractive(new Phaser.Geom.Rectangle(0, 0, 202, 155), Phaser.Geom.Rectangle.Contains);
		scene.physics.add.existing(this, false);
		this.body.allowGravity = false;
		this.body.allowDrag = false;
		this.body.allowRotation = false;
		this.body.collideWorldBounds = true;
		this.body.setCircle(64);

		/* START-USER-CTR-CODE */
			this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);

		//this.scene.events.on("update", () => this.update())
		/* END-USER-CTR-CODE */
	}

	public isFalling: boolean = false;
	public IsFallingPlatform: boolean = true;

	/* START-USER-CODE */

	private swayTween?: Phaser.Tweens.Tween;
	private originalX: number = 0;
	private originalY: number = 0;
	private originalTexture: string = "";
	private playerCollider?: Phaser.Physics.Arcade.Collider;
	private regenerating: boolean = false;
	private carryEnabled: boolean = false;
	private pendingDespawn: boolean = false;
	private respawnTimer?: Phaser.Time.TimerEvent;
	private blinkTween?: Phaser.Tweens.Tween;
	private hostScene: Phaser.Scene;
	private playerCollisionDisabled: boolean = false;

	create() {
		this.startSpawnScale();

		// Asegurar que el body sea inamovable y estático hasta ser golpeado
		this.body.setImmovable(true);
		this.body.moves = false;
		this.body.pushable = false;
		this.body.allowGravity = false;

		// Guardar posición original y comenzar movimiento de balanceo
		this.originalX = this.x;
		this.originalY = this.y;
		this.originalTexture = this.texture.key;
		this.startSwayMotion();

		// Collider permanente contra el grupo de enemigos
		const base = this.scene as any;

		// Añadir esta plataforma al grupo de plataformas
		if (base.plataformas) {
			base.plataformas.add(this);
		}

	this.playerCollider = base.physics.add.collider((this.scene as any).player, this, this.handlePlayerHit, undefined, this);

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

	private startSpawnScale() {
		// Arranca deshabilitado y sin escala para animar su entrada
		this.body.enable = false;
		this.setScale(0);

		this.scene.tweens.add({
			targets: this,
			scale: 1,
			duration: 250,
			ease: 'Back.Out',
			onComplete: () => {
				this.fitBodyToTexture();
				this.body.enable = true;
			}
		});
	}



	private fitBodyToTexture() {
		const body = this.body as Phaser.Physics.Arcade.Body | undefined;

		if (!body) return;

		// Usar las dimensiones visuales del sprite (ya incluyen escala)
		const width = this.displayWidth;
		const height = this.displayHeight;

		// Collider circular centrado
		const radius = Math.min(width, height) * 0.5;
		const offsetX = width * 0.5 - radius;
		const offsetY = height * 0.5 - radius;
		body.setCircle(radius, offsetX, offsetY);
	}



	private handlePlayerHit(player: any, _platform: any) {

		const pBody = player?.body as Phaser.Physics.Arcade.Body | undefined;
		const platBody = this.body as Phaser.Physics.Arcade.Body;

		if (!pBody) return;

		// Si ya está cayendo, no hacer nada aquí (se maneja en preUpdate)
		if (this.isFalling) return;

		// Solo procesar inicio de caída si no está cayendo aún
		const charged = !!player?.chargeMode;
		console.log(`Fall_Platform: jugador hit. Charged: ${charged}`);
		if (charged) {
			console.log("Fall_Platform: jugador cargado, plataforma cae");
			this.isFalling = true;
			this.carryEnabled = true;

			// Cambiar textura
			//this.setTexture("Block2");

			// Detener el movimiento de balanceo
			this.stopSwayMotion();

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
			platBody.allowRotation = true;
			platBody.setGravityY(0);
			// Tomar la dirección/velocidad horizontal del jugador al iniciar la caída
			//platBody.setVelocity(pBody.velocity.x, 0);
			platBody.setMaxVelocity(100, 400);
			platBody.setBounce(0.2, 0.7); // más rebote para hacer "cabecitas"

			// Dar velocidad angular según lado del golpe
			const playerCenterX = pBody.center?.x ?? (pBody.x + pBody.width * 0.5);
			const platformCenterX = platBody.center?.x ?? this.x;
			const hitDir = playerCenterX < platformCenterX ? 1 : -1; // golpe por izquierda => gira horario
			platBody.setAngularVelocity(hitDir * 20);
			platBody.setAngularDrag(10);



			this.spawnBubbleBurst();

		} else {
			platBody.pushable = false;
			platBody.setImmovable(true);
		}
	}

	private handlePlatformCollision(platform1: any, platform2: any) {
		// Solo procesar si ya está cayendo
		if (!this.isFalling || this.regenerating || this.pendingDespawn) return;
		this.pendingDespawn = true;

		// Determinar cuál es la otra plataforma (la que NO es this)
		const otherPlatform = platform1 === this ? platform2 : platform1;
		const otherBody = otherPlatform?.body as Phaser.Physics.Arcade.Body | undefined;
		const platBody = this.body as Phaser.Physics.Arcade.Body;

		// Si es un BtnPresion, ejecutar su handler y salir
		if (otherPlatform && otherPlatform.IsBtnPresion && typeof otherPlatform.handlePlatformCollision === 'function') {
			otherPlatform.handlePlatformCollision(otherPlatform, this);
			this.pendingDespawn = false;
			return;
		}

		// Si es cristal, romperla siempre (sin checar desde dónde llegó)
		if (otherPlatform && otherPlatform.IsCristalPlatform) {
			console.log("Fall_Platform: golpeó plataforma de cristal, destruyéndola");
			if (typeof otherPlatform.destroyByCrush === 'function') {
				otherPlatform.destroyByCrush();
			}
			this.pendingDespawn = false;
			return;
		}

		// Solo considerar impacto desde arriba
		if (!otherBody) {
			this.pendingDespawn = false;
			return;
		}
		const landingTolerance = 10;
		const landedFromAbove = platBody.bottom <= otherBody.top + landingTolerance && platBody.velocity.y >= 0;
		if (!landedFromAbove) {
			this.pendingDespawn = false;
			return; // ignorar choques laterales
		}

		// Detener la caída y programar regeneración
		platBody.moves = false;
		platBody.pushable = false;
		platBody.allowGravity = false;
		platBody.setDrag(0);

		this.isFalling = false;

		console.log("Fall_Platform: detenida al colisionar, titileo diferido antes de regenerar");
		// Esperar 2s, luego titilar ~4s antes de desaparecer
		this.scene.time.delayedCall(2000, () => {
			this.disablePlayerCollisionDuringBlink();
			const flicker = this.scene.tweens.add({
				targets: this,
				alpha: 0.3,
				yoyo: true,
				duration: 120,
				repeat: -1
			});

			this.scene.time.delayedCall(4000, () => {
				flicker.stop();
				this.setAlpha(1);
				this.spawnStarBurst();
				this.scheduleRegeneration();
			});
		});
	}

	private startSwayMotion() {
		// Evitar crear múltiples tweens
		if (this.swayTween) return;

		// Sacudida rápida cada 3 segundos
		const shake = () => {
			this.scene.tweens.add({
				targets: this,
				x: this.originalX + 2,
				duration: 50,
				ease: 'Linear',
				yoyo: true,
				repeat: 3, // Se sacude 4 veces (ida y vuelta)
				onComplete: () => {
					this.x = this.originalX; // Asegurar que vuelva a la posición original
				}
			});
		};

		// Ejecutar la primera sacudida inmediatamente
		shake();

		// Repetir cada 3 segundos
		this.swayTween = this.scene.time.addEvent({
			delay: 3000,
			callback: shake,
			loop: true
		}) as any;
	}

	private stopSwayMotion() {
		if (this.swayTween) {
			if (typeof this.swayTween.remove === 'function') {
				this.swayTween.remove();
			} else if (typeof this.swayTween.stop === 'function') {
				this.swayTween.stop();
			}
			this.swayTween = undefined;
		}
		// Asegurar que vuelva a la posición original
		this.x = this.originalX;
	}

	private scheduleRegeneration() {
		const scene = this.hostScene || this.scene;
		if (!scene) return;
		this.regenerating = true;
		this.pendingDespawn = true;

		// Hacer invisible inmediatamente
		this.setVisible(false);
		this.setActive(false);

		// Desactivar física temporalmente
		const body = this.body as Phaser.Physics.Arcade.Body | undefined;
		if (body) {
			body.enable = false;
		}

		console.log("Fall_Platform: programando regeneración en 3 segundos");


		// Programar reemplazo nuevo después de 3 segundos
		this.respawnTimer = scene.time.delayedCall(3000, () => {
			this.spawnReplacement();
		});
	}

	public blinkThenRegenerate(blinkDuration: number = 1200) {
		const scene = this.hostScene || this.scene;
		if (!scene) return;
		if (this.regenerating) return;
		this.disablePlayerCollisionDuringBlink();

		// Evitar múltiples parpadeos simultáneos
		if (this.blinkTween) {
			this.blinkTween.stop();
			this.blinkTween = undefined;
		}

		this.isFalling = false;
		this.pendingDespawn = true;

		this.blinkTween = scene.tweens.add({
			targets: this,
			alpha: 0.3,
			yoyo: true,
			duration: 100,
			repeat: -1
		});

		scene.time.delayedCall(blinkDuration, () => {
			this.blinkTween?.stop();
			this.blinkTween = undefined;
			this.setAlpha(1);
			this.scheduleRegeneration();
		});
	}

	private disablePlayerCollisionDuringBlink() {
		if (this.playerCollisionDisabled) return;
		if (this.playerCollider) {
			this.playerCollider.active = false;
		}
		this.playerCollisionDisabled = true;
	}

	public destroy(fromScene?: boolean) {
		this.blinkTween?.stop();
		this.blinkTween = undefined;
		this.respawnTimer?.remove(false);
		this.respawnTimer = undefined;
		super.destroy(fromScene);
	}

	private spawnReplacement() {
		const scene = this.hostScene || this.scene;
		if (!scene || !(scene as any).sys) {
			return;
		}
		const base = scene as any;
		// Crear nueva instancia en la posición original
		const fresh = new Fall_Platform(scene, this.originalX, this.originalY, this.originalTexture);
		scene.add.existing(fresh);
		if (base.plataformas) {
			base.plataformas.add(fresh);
		}
		// Limpiar timers/tweens y destruir esta instancia
		if (this.respawnTimer) {
			this.respawnTimer.remove(false);
			this.respawnTimer = undefined;
		}
		this.destroy();
	}

	preUpdate(time: number, delta: number) {
		super.preUpdate(time, delta);

		// Si está cayendo, verificar si el player está debajo transportándola
		if (this.isFalling && this.carryEnabled && !this.regenerating) {
			const player = (this.scene as any).player;
			const platBody = this.body as Phaser.Physics.Arcade.Body;

			if (player && player.body) {
				const pBody = player.body as Phaser.Physics.Arcade.Body;
				// Mantener giro mientras se transporta: dirección según lado del player
				const playerCenterX = pBody.center?.x ?? (pBody.x + pBody.width * 0.5);
				const platformCenterX = platBody.center?.x ?? this.x;
				const dir = playerCenterX < platformCenterX ? 1 : -1;
				const targetAngular = dir * 220;
				platBody.setAngularVelocity(Phaser.Math.Linear(platBody.angularVelocity, targetAngular, 0.1));
				// Usar la rotación para empujar en X
				const pushX = Phaser.Math.Clamp(platBody.angularVelocity * 0.2, -300, 300);
				platBody.setVelocityX(pushX);
			}

			// Regenerar si salió de la pantalla
			if (this.y > this.scene.scale.height + 200) {
				this.scheduleRegeneration();
			}
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

	private spawnStarBurst() {

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
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
