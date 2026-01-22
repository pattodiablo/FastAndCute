// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface CatTrack {

	 body: Phaser.Physics.Arcade.Body;
}

export default class CatTrack extends Phaser.GameObjects.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "CatTrack", frame);

		scene.physics.add.existing(this, false);
		this.body.setSize(58, 54, false);

		/* START-USER-CTR-CODE */
		scene.physics.add.existing(this, false);
		this.body.moves = false;
		this.body.allowGravity = false;
		this.body.allowDrag = false;
		this.body.allowRotation = false;
		this.body.pushable = false;
		this.body.immovable = true;
		this.body.setSize(40, 40, false);

				this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);

		/* END-USER-CTR-CODE */
	}

	public TrackToUnlock: string = "Unlock1";

	/* START-USER-CODE */

	private bobTween?: Phaser.Tweens.Tween;
	private collected: boolean = false;

	create() {
	this.scene.physics.add.overlap((this.scene as any).player, this, this.collectBy, undefined, this);
	}

	createBob() {
	    // Guardar posición original para oscilar alrededor
	    const baseY = this.y;

	    // Tween de “easing” suave arriba/abajo en bucle
	    this.bobTween = this.scene.tweens.add({
	        targets: this,
	        y: baseY - 12,              // amplitud hacia arriba
	        duration: 900,
	        ease: 'Sine.InOut',
	        yoyo: true,
	        repeat: -1
	    });
	}

	// Llamar cuando el player lo colecciona (por overlap o click)
	collectBy(player: any, star: any) {
        if (this.collected) return;
        this.collected = true;

        if (this.body) this.body.enable = false;

        const gameReg = this.scene.game.registry;
        gameReg.set('HasNewTrack', true);

		// Persistencia de UnlockedTracks (lista) en localStorage y registry
		try {
			const key = 'UnlockedTracks';
			const raw = localStorage.getItem(key);
			const list: string[] = raw ? JSON.parse(raw) : [];
			// Añadir si no existe (dedupe)
			if (!list.includes(this.TrackToUnlock)) {
				list.push(this.TrackToUnlock);
				localStorage.setItem(key, JSON.stringify(list));
				// Reflejar en registry para que Map/otros puedan leerlo al vuelo
				gameReg.set(key, list);
			}
		} catch (e) {
			// Si falla localStorage, al menos emite en registry
			const listReg = (gameReg.get('UnlockedTracks') as string[]) || [];
			if (!listReg.includes(this.TrackToUnlock)) {
				listReg.push(this.TrackToUnlock);
				gameReg.set('UnlockedTracks', listReg);
			}
		}

        // Detener bob
        this.bobTween?.stop();
        this.bobTween = undefined;

		// Sparks al recoger
		const sparks = this.scene.add.particles(0, 0, 'starParticle',{
			x: this.x,
			y: this.y,
			speed: { min: 120, max: 260 },
			angle: { min: 0, max: 360 },
			scale: { start: 1, end: 0 },
			alpha: { start: 1, end: 0 },
			lifespan: { min: 250, max: 500 },
			quantity: 20,
			gravityY: -50
		}); // usa tu textura de spark
	
		// Emitir una vez y limpiar
		sparks.explode(20, this.x, this.y);
		this.scene.time.delayedCall(600, () => {
			sparks.destroy();
		});

        this.scene.tweens.add({
            targets: this,
            y: -100,
            duration: 1200,
            ease: 'Quad.Out',
            onComplete: () => {
                (player.scene as any)?.toggleMapOverlay?.();
                this.destroy();
            }
        });
    }



	// Inicializa el bob al crear el objeto (si no tienes un create, puedes llamarlo donde instancias)
	preUpdate() {
	    if (!this.collected && !this.bobTween) {
	        this.createBob();
	    }
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
