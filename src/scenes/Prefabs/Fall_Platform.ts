// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface Fall_Platform {

	 body: Phaser.Physics.Arcade.Body;
}

export default class Fall_Platform extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "Block3", frame);

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

	private swayTween?: Phaser.Tweens.Tween;
	private originalX: number = 0;
	private originalY: number = 0;
	private originalTexture: string = "";
	private playerCollider?: Phaser.Physics.Arcade.Collider;
	private regenerating: boolean = false;
	private carryEnabled: boolean = false;
	private pendingDespawn: boolean = false;

	create() {
		// Collider con el player
		this.fitBodyToTexture();

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
			this.setTexture("Block2");

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
			platBody.setGravityY(800);
			// Tomar la dirección/velocidad horizontal del jugador al iniciar la caída
			//platBody.setVelocity(pBody.velocity.x, 0);
			platBody.setMaxVelocity(100, 400);
		//	platBody.setBounce(0.85, 0.9); // más rebote para hacer "cabecitas"

			// Dar velocidad angular según lado del golpe
			const playerCenterX = pBody.center?.x ?? (pBody.x + pBody.width * 0.5);
			const platformCenterX = platBody.center?.x ?? this.x;
			const hitDir = playerCenterX < platformCenterX ? 1 : -1; // golpe por izquierda => gira horario
			platBody.setAngularVelocity(hitDir * 100);
			platBody.setAngularDrag(180);



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

		// Si la otra plataforma es de cristal, destruirla
		if (otherPlatform && otherPlatform.IsCristalPlatform) {
			console.log("Fall_Platform: golpeó plataforma de cristal, destruyéndola");
			if (typeof otherPlatform.destroyByCrush === 'function') {
				otherPlatform.destroyByCrush();
			}
			// Seguir cayendo; liberar el flag para permitir nuevas colisiones
			this.pendingDespawn = false;
			return;
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
				x: this.originalX + 5,
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
		this.regenerating = true;
		
		// Hacer invisible inmediatamente
		this.setVisible(false);
		this.setActive(false);
		
		// Desactivar física temporalmente
		this.body.enable = false;
		
		console.log("Fall_Platform: programando regeneración en 3 segundos");
		
		// Regenerar después de 3 segundos
		this.scene.time.delayedCall(3000, () => {
			this.regenerate();
		});
	}

	private regenerate() {
		console.log("Fall_Platform: regenerando en posición original");
		
		// Restaurar posición original (sprite y body)
		this.x = this.originalX;
		this.y = this.originalY;
		
		// Restaurar textura original
		this.setTexture(this.originalTexture);
		
		// Restaurar estado de caída
		this.isFalling = false;
		this.carryEnabled = false;
		this.regenerating = false;
		this.pendingDespawn = false;

		// Comenzar desde escala 0
		this.setScale(0);

		// Restaurar física estática antes de mostrar
		const platBody = this.body as Phaser.Physics.Arcade.Body;
		platBody.enable = true;
		platBody.reset(this.originalX, this.originalY);
		platBody.setImmovable(true);
		platBody.moves = false;
		platBody.pushable = false;
		platBody.allowGravity = false;
		platBody.allowRotation = false;
		platBody.setVelocity(0, 0);
		platBody.setGravityY(0);
		platBody.setBounce(0, 0);
		platBody.setAngularVelocity(0);
		platBody.setAngularDrag(0);
		this.setRotation(0);
		platBody.setMaxVelocity(100, 800);

		// Hacer visible nuevamente
		this.setVisible(true);
		this.setActive(true);
		
		// Re-agregar al grupo de plataformas
		const base = this.scene as any;
		if (base.plataformas && !base.plataformas.contains(this)) {
			base.plataformas.add(this);
		}
		
		// Recrear collider con el player
		if (!this.playerCollider) {
			this.playerCollider = base.physics.add.collider((this.scene as any).player, this, this.handlePlayerHit, undefined, this);
		}
		
		// Efecto de escalado suave desde 0 hasta 1
		this.scene.tweens.add({
			targets: this,
			scale: 1,
			duration: 500,
			ease: 'Back.Out',
			onComplete: () => {
				// Reiniciar movimiento de balanceo después de la animación
				this.startSwayMotion();
			}
		});
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
