// You can write more code here

/* START OF COMPILED CODE */

import { SpineGameObject } from "@esotericsoftware/spine-phaser";
import { SpinePlugin } from "@esotericsoftware/spine-phaser";
import { SpineGameObjectBoundsProvider } from "@esotericsoftware/spine-phaser";
import { SkinsAndAnimationBoundsProvider } from "@esotericsoftware/spine-phaser";
/* START-USER-IMPORTS */
import BubblePop from "./BubblePop";
/* END-USER-IMPORTS */

export default interface SpinePlayer {

	 body: Phaser.Physics.Arcade.Body;
}

export default class SpinePlayer extends SpineGameObject {

	constructor(scene: Phaser.Scene, plugin: SpinePlugin, x: number, y: number, dataKey?: string, atlasKey?: string, skin?: string, boundsProvider?: SpineGameObjectBoundsProvider, xargs?: any) {
		super(scene, plugin, x ?? 0, y ?? 0, dataKey ?? "KittenPlayer", atlasKey ?? "KittenPlayer-atlas", boundsProvider ?? new SkinsAndAnimationBoundsProvider("Idle", ["default"]));

		this.setInteractive(new Phaser.Geom.Circle(34, 34, 40), Phaser.Geom.Circle.Contains);
		this.skeleton.setSkinByName(skin ?? "default");
		scene.physics.add.existing(this, false);
		this.body.friction.x = 0;
		this.body.friction.y = 1;
		this.body.bounce.x = 0.1;
		this.body.bounce.y = 0.1;
		this.body.collideWorldBounds = true;
		this.body.setCircle(35);

		/* START-USER-CTR-CODE */
		// this.scene.input.enableDebug(this);
		const speedY = 200;

		this.OriginalX = this.x;
		this.OriginalY = this.y;
		this.OriginalMoveSpeed = this.moveSpeed;
		this.animationState.setAnimation(0, "Idle", true);
		this.setVisible(false);

		this.setInteractive(); // asegúrate de que el gato sea interactivo
		this.floatFX = this.scene.sound.add("sound8");
		(this.scene as any).addFx(this.floatFX);

		this.explodeFx = this.scene.sound.add("click4");
		(this.scene as any).addFx(this.explodeFx);

		this.on('pointerdown', (pointer: Phaser.Input.Pointer) => {

			this.setScale(1.1, 1.1);



			this.scene.time.delayedCall(100, () => {

				this.setScale(1, 1);
			});


			if (!this.gravityTimerActive && this.CanMove) {


				this.gravityTimerActive = true;
				this.body.setVelocity(0, 0);
				this.moveSpeed = 0;


				this.scene.time.delayedCall(this.gravityRestoreDelay, () => {

					this.body.setVelocity(0, 0);
					this.body.setGravityY(this.originalGravityY);
					this.gravityTimerActive = false;

				});
			}
		});


		scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			// En Player.ts (constructor)

			this.floatFX.play();
			this.targetPos = new Phaser.Math.Vector2(pointer.x, pointer.y);
			this.lastMoveTime = this.scene.time.now; // <-- Actualiza aquí también
			if (!this.gravityTimerActive) {
				this.moveSpeed = this.OriginalMoveSpeed;
				this.body.setVelocityY(speedY);
			}


			this.followParticles = this.scene.add.particles(0, 0, 'BubbleParticle', {
				x: this.x,
				y: this.y,
				speed: { min: 0, max: 0 },
				angle: { min: 0, max: 360 },
				lifespan: { min: 1000, max: 2500 },
				scale: { start: 0, end: 1 },
				quantity: 1,
				maxParticles: 1,
				frequency: 100,
				gravityY: -100

			});
			// Emite solo unas pocas burbujas y destruye el sistema después
			this.scene.time.delayedCall(400, () => {
				this.followParticles?.stop();
				this.scene.time.delayedCall(1200, () => {
					this.followParticles?.destroy();
				});
			});

		});
		/* END-USER-CTR-CODE */
	}

	public targetPos: any = null;;
	public moveSpeed: number = 200;
	public originalGravityY: number = -300;
	public reducedGravityY: number = -50;
	public gravityRestoreDelay: number = 1000;
	public gravityTimerActive: boolean = false;
	public OriginalMoveSpeed: number = 0;
	public CanMove: boolean = false;
	public IsDead: boolean = false;
	public OriginalX: number = 0;
	public followParticles!: any;
	public dieParticles!: any;
	public OriginalY: number = 0;
	public lastMoveTime!: any;
	public floatFX!: any;
	public explodeFx!: any;

	/* START-USER-CODE */

	private blinkTimer?: Phaser.Time.TimerEvent;

	public startMoving() {
		console.log("Player starts moving");
		this.setVisible(true);
		this.CanMove = true;
		this.body.setGravityY(this.originalGravityY);
		this.moveSpeed = this.OriginalMoveSpeed;
		this.body.collideWorldBounds = true;
		this.skeleton.setAttachment("Bubble", "Bubble");
		//this.CanMove = true;
		this.moveSpeed = this.OriginalMoveSpeed;
		this.setActive(true);
		this.IsDead = false;
		this.body.setGravityY(this.originalGravityY);
		this.animationState.setAnimation(0, "Idle", true);

	}
	private startBlinkLoop() {
		// Si ya hay un timer, no crees otro
		if (this.blinkTimer) return;

		const scheduleBlink = () => {
			if (this.IsDead) {
				// Si está muerto, fuerza la animación "Cry" y no programa más parpadeos
				this.animationState.setAnimation(0, "Cry", true);
				return;
			}
			// Solo parpadea si está en Idle
			if (this.animationState.getCurrent(0)?.animation?.name === "Idle") {
				this.animationState.setAnimation(0, "Blink", false);
				this.animationState.addAnimation(0, "Idle", true, 0);
			}
			// Programa el siguiente blink con un tiempo aleatorio entre 2 y 5 segundos
			this.blinkTimer = this.scene.time.delayedCall(
				Phaser.Math.Between(2000, 5000),
				scheduleBlink,
				[],
				this
			);
		};

		scheduleBlink();
	}

	preUpdate(time: number, delta: number) {
		super.preUpdate(time, delta);

		const maxTilt = 0.25;

		if (this.targetPos && this.CanMove) {
			const toTarget = new Phaser.Math.Vector2(
				this.targetPos.x - this.x,
			);
			const distance = toTarget.length();

			if (distance < 5) {
				this.targetPos = null;
				this.lastMoveTime = time; // Marca el tiempo en que terminó de moverse
			} else {
				toTarget.normalize();
				if (!this.gravityTimerActive) {
					this.body.setVelocityX(toTarget.x * this.moveSpeed);
				}
				if (Math.abs(toTarget.x) > 0.1) {
					this.rotation = Phaser.Math.Linear(this.rotation, maxTilt * Math.sign(toTarget.x), 0.2);
				}
				this.lastMoveTime = time; // Actualiza el tiempo de último movimiento
			}
		} else {
			// Si han pasado más de 0.5 segundos desde el último movimiento, vuelve a rotación 0
			if (!this.lastMoveTime || time - this.lastMoveTime > 500) {
				this.rotation = Phaser.Math.Linear(this.rotation, 0, 0.1);
			}
		}

		this.startBlinkLoop();
	}

	Die() {
		if (this.IsDead) return; // Evita múltiples muertes
		this.IsDead = true;
		this.CanMove = false;
		this.body.setVelocity(0, 0);

		// Detén el loop de parpadeo
		if (this.blinkTimer) {
			this.blinkTimer.remove();
			this.blinkTimer = undefined;
		}

		console.log("Player has died");
		this.body.collideWorldBounds = false;
		this.setActive(false);
		this.rotation = 0;
		this.skeleton.setAttachment("Bubble", "");

		this.scene.tweens.add({
			targets: this,
			y: this.y - 60, // Sube 60 píxeles (ajusta a gusto)
			duration: 500,
			ease: 'Quad.Out',
			onComplete: () => {
				this.body.setGravityY(1000); // Aplica gravedad fuerte después del tween
			}
		});
		//this.animationState.setAnimation(0, "Cry", true);
		const bubblePop = this.scene.add.existing(
			new BubblePop(this.scene, this.x, this.y)
		);
		bubblePop.setRotation(Math.random() * Math.PI * 2);

		this.explodeFx.play();

		// --- SISTEMA DE PARTICULAS DE BURBUJAS ---


		this.dieParticles = this.scene.add.particles(0, 0, 'BubbleParticle', {
			x: this.x,
			y: this.y,
			speed: { min: 0, max: -1000 },
			angle: { min: 0, max: 360 },
			lifespan: { min: 500, max: 1500 },
			scale: { start: 0.5, end: 0 },
			quantity: 5,
			maxParticles: 5,
			frequency: 100,
			gravityY: -3000

		});
		// Emite solo unas pocas burbujas y destruye el sistema después
		this.scene.time.delayedCall(400, () => {
			this.dieParticles?.stop();
			this.scene.time.delayedCall(1200, () => {
				this.resetPlayer();
				this.dieParticles?.destroy();
			});
		});



		// Lógica para la muerte del jugador
	}

	resetPlayer() {
		(this.scene as any).chest.resetChest(); // Llama al método resetChest del cofre
		this.setVisible(false);



		this.scene.tweens.add({
			targets: this,
			y: this.OriginalY, // Sube 60 píxeles (ajusta a gusto)
			x: this.OriginalX,
			duration: 500,
			ease: 'Quad.Out',
			onComplete: () => {
				//this.body.setGravityY(1000); // Aplica gravedad fuerte después del tween
			}
		});
	}

	public CompleteLevel(xdoor: number, ydoor: number) {
		this.CanMove = false;
		this.body.setVelocity(0, 0);
		this.body.setGravityY(0); // Aplica gravedad fuerte

		this.scene.tweens.add({
			targets: this,
			x: xdoor,
			y: ydoor,
			duration: 1000,
			ease: 'Quad.Out',
			onComplete: () => {
				this.scene.time.delayedCall(1000, () => {
					(this.scene as any).closeCurtains();
					this.scene.tweens.add({
						targets: this.skeleton.color,
						a: 0,
						duration: 500,
						ease: 'Quad.Out'
					});
				});
			}
		});

	}



	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
