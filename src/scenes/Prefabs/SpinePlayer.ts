// You can write more code here

/* START OF COMPILED CODE */

import { SpineGameObject } from "@esotericsoftware/spine-phaser";
import { SpinePlugin } from "@esotericsoftware/spine-phaser";
import { SpineGameObjectBoundsProvider } from "@esotericsoftware/spine-phaser";
import { SkinsAndAnimationBoundsProvider } from "@esotericsoftware/spine-phaser";
/* START-USER-IMPORTS */
import BubblePop from "./BubblePop";
import RingTimer from "./RingTimer";
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
			this.floatFX1 = this.scene.sound.add("meow1");
			this.floatFX2 = this.scene.sound.add("meow2");
			this.floatFX3 = this.scene.sound.add("meow3");
			this.floatFX4 = this.scene.sound.add("meow4");
				(this.scene as any).addFx(this.floatFX1);
				(this.scene as any).addFx(this.floatFX2);
				(this.scene as any).addFx(this.floatFX3);
				(this.scene as any).addFx(this.floatFX4);		

		this.floatFX = this.scene.sound.add("sound8");
		(this.scene as any).addFx(this.floatFX);

		this.explodeFx = this.scene.sound.add("realPop");
		(this.scene as any).addFx(this.explodeFx);

		this.ChargingSound = this.scene.sound.add("ChargingSound");
		(this.scene as any).addFx(this.ChargingSound);

		this.on('pointerup', () => this.cancelLongPress());
		this.on('pointerout', () => this.cancelLongPress());
		this.scene.input.on('pointerup', () => this.cancelLongPress());


		this.on('pointerdown', (pointer: Phaser.Input.Pointer) => {

		this.clickingOnPlayer = true;
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



			this.on('pointerup', () => {
				this.clickingOnPlayer = false;
				this.cancelLongPress();
			});

			this.on('pointerout', () => {
				this.clickingOnPlayer = false;
				this.cancelLongPress();
			});


		scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			// En Player.ts (constructor)

		// Cada click arranca sin charge; si se usa boost se marcará true
		this.chargeMode = false;
		this.scene.registry?.set('chargeMode', false);

		this.startLongPressCountdown();
			if (this.clickingOnPlayer) return; // Ignora si el click fue sobre el jugador
			// BOOST si hay Ring activo (antes de fijar targetPos)
			if (this.currentRing && this.currentRing.active) {
				this.currentRing.destroy();
				this.currentRing = undefined;
				this.nextClickBoost = true; // habilita boost SOLO para el siguiente click de movimiento
			}

			if (!this.MovementLinear) {


				this.addFloatingSound();

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
			} else {

				this.decelTween?.stop();
				this.scene.tweens.add({
					targets: this,

					scale: 1.1,
					ease: 'Quad.Out',
					duration: 100,
					onComplete: () => {
						this.scene.time.delayedCall(100, () => {

							this.scene.tweens.add({
								targets: this,
								scale: 1,
								duration: 100,
								ease: 'Quad.Out'
							});
						});
					}
				});



				this.targetPos = new Phaser.Math.Vector2(pointer.x, pointer.y);
				this.lastMoveTime = this.scene.time.now;
				this.addFloatingSound();

				// Consumir boost (si está activo) y fijar moveSpeed
				if (this.nextClickBoost) {
					this.moveSpeed = this.OriginalMoveSpeed * 2.5;
					this.nextClickBoost = false; // se consume aquí; siguiente click ya normal
					this.chargeMode = true;
					this.scene.registry?.set('chargeMode', true);
				} else {
					this.moveSpeed = this.OriginalMoveSpeed;
				}

				this.startBubbleTrail();
			}


		});
		/* END-USER-CTR-CODE */
	}

	public targetPos: any = null;;
	public moveSpeed: number = 175;
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
	public MovementLinear: boolean = true;
	public idleFloatPhase: number = 0;
	public bubbleTrail!: any;
	public meowFxs!: any;
	public floatFX1!: any;
	public floatFX2!: any;
	public floatFX3!: any;
	public floatFX4!: any;

	/* START-USER-CODE */

	private blinkTimer?: Phaser.Time.TimerEvent;
	decelTween?: Phaser.Tweens.Tween;
	private longPressTimer?: Phaser.Time.TimerEvent;
	private isPressing: boolean = false;
	public LONG_PRESS_THRESHOLD = 500; // ms
	private currentRing?: RingTimer;
	private clickingOnPlayer: boolean = false;
	private nextClickBoost: boolean = false;
	public chargeMode: boolean = false;
	private ChargingSound?: Phaser.Sound.BaseSound;

	public impulseStrength: number = 420;   // fuerza base del click
	public boostMultiplier: number = 2.0;   // multiplicador si usas powerups
	public airDragX: number = 30;          // “rozamiento con el aire” en X
	public airDragY: number = 30;          // “rozamiento con el aire” en Y
	public bounceDamping: number = 0.55;    // rebote en colisiones
	public maxSpeed: number = 460;          // velocidad tope
	public minSpeedCutoff: number = 12;     // velocidad mínima antes de parar

	// Estela de burbujas

	private startLongPressCountdown() {
		// Si ya hay ring activo, no iniciar otro long press
		if (this.currentRing && this.currentRing.active) return;

		this.cancelLongPress();
		this.isPressing = true;

		this.longPressTimer = this.scene.time.delayedCall(this.LONG_PRESS_THRESHOLD, () => {
			if (this.isPressing && (!this.currentRing || !this.currentRing.active)) {
				this.onLongPress();
				this.emit('longpress');
				this.ChargingSound?.play();
			}
		});
	}

	private cancelLongPress() {
		this.isPressing = false;
		if (this.longPressTimer) {
			this.longPressTimer.remove(false);
			this.longPressTimer = undefined;
		}
	}

	protected onLongPress() {
		// Si ya existe, no crear otro
		if (this.currentRing && this.currentRing.active) return;

		const ring = new RingTimer(this.scene, this.x, this.y);
		this.scene.add.existing(ring);
		ring.attachTo(this, 0.18);
		ring.setDepth(this.depth + 1);
		this.currentRing = ring;

		ring.once(Phaser.GameObjects.Events.DESTROY, () => {
			if (this.currentRing === ring) this.currentRing = undefined;
		});

		this.scene.tweens.add({
			targets: this,
			scale: 1.2,
			duration: 120,
			yoyo: true,
			ease: 'Quad.Out'
		});
	}


	// Arranca (o reactiva) la estela
	private startBubbleTrail() {

		this.bubbleTrail = this.scene.add.particles(0, 0, 'BubbleParticle', {
			x: this.x,
			y: this.y,
			speed: { min: 0, max: -100 },
			angle: { min: 0, max: 360 },
			lifespan: { min: 500, max: 2000 },
			scale: { start: 0.5, end: 0 },
			quantity: 5,
			maxParticles: 5,
			frequency: 100,
			gravityY: -300

		});

	}



	// Dispara la estela por un tiempo; si se vuelve a hacer click, reinicia el contador

	addFloatingSound() {
        // 20% de probabilidad de sonar (si no, salir)
        if (Phaser.Math.FloatBetween(0, 1) < 0.20){
			const rand = Phaser.Math.Between(1, 4);
					switch (rand) {
						case 1: this.floatFX1.play(); break;
						case 2: this.floatFX2.play(); break;
						case 3: this.floatFX3.play(); break;
						case 4: this.floatFX4.play(); break;
					}
		}else{
			this.floatFX.play()
		}


    }
	public startMoving() {

		if (!this.MovementLinear) {
			console.log("Player starts moving");
			this.setVisible(true);
			this.CanMove = true;
			this.body.checkCollision.none = false;
			this.body.enable = true;
			this.body.setGravityY(this.originalGravityY);
			this.moveSpeed = this.OriginalMoveSpeed;
			this.body.collideWorldBounds = true;
			this.skeleton.setAttachment("Bubble", "Bubble");
			//this.CanMove = true;
			this.moveSpeed = this.OriginalMoveSpeed;
			this.setActive(true);
			this.IsDead = false;
			this.animationState.setAnimation(0, "Idle", true);

		} else {

			this.body.collideWorldBounds = true;
			this.body.checkCollision.none = false;
			this.body.enable = true;
			this.body.setAllowGravity(false); // Desactivar gravedad en modo linear
			this.body.setGravityY(0);
			this.CanMove = true;
			this.setVisible(true);
			this.skeleton.setAttachment("Bubble", "Bubble");
			this.animationState.setAnimation(0, "Idle", true);
			this.IsDead = false;
			this.setActive(true);

		}


	}

	public SetOriginalPosition(x: number, y: number) {
		this.OriginalX = x;
		this.OriginalY = y;
	}
	private startBlinkLoop() {
        // Si ya hay un timer activo no crear otro
        if (this.blinkTimer) return;

        const scheduleBlink = () => {
            // Solo pestañea si NO está muerto
			if (!this.IsDead && this.visible && this.active) {
				// Reproduce Blink una vez y vuelve a Idle
				this.animationState.setAnimation(0, "Blink", false);
				this.animationState.addAnimation(0, "Idle", true, 0);
			}
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

		// Si está muerto, no procesar movimiento ni inputs; deja solo la física caer
		if (this.IsDead) {
			return;
		}


		if (!this.MovementLinear) {
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
		} else {

            const body = this.body as Phaser.Physics.Arcade.Body;

            if (this.CanMove && this.targetPos) {
                const dir = new Phaser.Math.Vector2(
                    this.targetPos.x - this.x,
                    this.targetPos.y - this.y
                );
                const dist = dir.length();

                // Consumir el destino en un solo impulso
                this.targetPos = null;

                if (dist >= 4) {
                    dir.scale(1 / dist);

                    // Impulso momentáneo hacia el click
                    body.setVelocity(dir.x * this.moveSpeed, dir.y * this.moveSpeed);

                    // Tilt ligero
                    const maxTilt = 0.25;
                    if (Math.abs(dir.x) > 0.05) {
                        this.rotation = Phaser.Math.Linear(this.rotation, maxTilt * Math.sign(dir.x), 0.15);
                    }
                }

                this.lastMoveTime = time;
            } else {
                // Deja que el drag lo frene; si ya casi está detenido, cortamos velocidad y hacemos un idle suave
                const vx = body.velocity.x || 0;
                const vy = body.velocity.y || 0;
                const speed = Math.hypot(vx, vy);

                if (speed < this.minSpeedCutoff) {
                    body.setVelocity(0, 0);
                    this.idleFloatPhase += delta * 0.0025;
                    const vyFloat = Math.sin(this.idleFloatPhase) * 25;
                    body.setVelocityY(vyFloat);
                }

                // Relajar rotación progresivamente
                this.rotation = Phaser.Math.Linear(this.rotation, 0, 0.08);
            }

        }

		// Activar/desactivar la estela según se esté moviendo realmente
		const vx = this.body.velocity.x || 0;
		const vy = this.body.velocity.y || 0;
		const speed = Math.hypot(vx, vy);


		this.startBlinkLoop();
	}

	Die() {
		if (this.IsDead) return; // Evita múltiples muertes
		this.IsDead = true;
		this.CanMove = false;
		// Deshabilitar física e interacciones
		this.body.setVelocity(0, 0);
		this.body.setGravity(0, 0);
		this.body.setBounce(0, 0);
		this.body.setDrag(0, 0);
		this.body.checkCollision.none = true;
		this.body.enable = false; // solo tween visual
		// Detén el loop de parpadeo
		if (this.blinkTimer) {
			this.blinkTimer.remove();
			this.blinkTimer = undefined;
		}

		console.log("Player has died");
		this.body.collideWorldBounds = false;
		this.setActive(true); // mantiene el GameObject vivo para el tween
		this.rotation = 0;
		this.skeleton.setAttachment("Bubble", "");

		const offscreenY = this.scene.scale.height + 200;
		const landingX = this.x; // conserva el X donde muere
		const hopHeight = 70;

		this.scene.tweens.add({
			targets: this,
			x: landingX,
			y: this.y - hopHeight,
			duration: 220,
			ease: 'Quad.Out',
			onComplete: () => {
				this.scene.tweens.add({
					targets: this,
					x: landingX,
					y: offscreenY,
					duration: 780,
					ease: 'Cubic.In'
				});
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


		this.cancelLongPress();
		if (this.currentRing && this.currentRing.active) {
			this.currentRing.destroy();
			this.currentRing = undefined;
		}
		// Lógica para la muerte del jugador
	}

	resetPlayer() {
		(this.scene as any).chest.resetChest(); // Llama al método resetChest del cofre
		this.setVisible(false);
		this.body.checkCollision.none = true;
		this.body.enable = false;




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

		this.cancelLongPress();
		if (this.currentRing && this.currentRing.active) {
			this.currentRing.destroy();
			this.currentRing = undefined;
		}


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
