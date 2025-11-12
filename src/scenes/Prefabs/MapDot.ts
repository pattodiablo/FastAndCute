// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MapDot extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// mapDot
		const mapDot = scene.add.image(0, 0, "MapDot");
		this.add(mapDot);

		// mapSelector
		const mapSelector = scene.add.image(0, -34, "MapSelector");
		this.add(mapSelector);

		this.mapDot = mapDot;
		this.mapSelector = mapSelector;
		// awake handler
		this.scene.events.once("scene-awake", () => this.awake());

		/* START-USER-CTR-CODE */
		this.mapDot.setTint(0x9e9e9e);
		this.setAlpha(0.4);

		this.mapSelector.setVisible(false);

		// Interactividad solo si IsDotActive es true
	

		const over = () => {
			this.mapSelector.setVisible(true);
			// efecto suave: escala y quitar tint
			this.scene.tweens.killTweensOf(this.mapDot);
			this.scene.tweens.add({
				targets: this.mapDot,
				scale: 1.08,
				duration: 150,
				ease: 'Quad.Out'
			});
			this.mapDot.clearTint();
		};

		const out = () => {
			this.mapSelector.setVisible(false);
			this.scene.tweens.killTweensOf(this.mapDot);
			this.scene.tweens.add({
				targets: this.mapDot,
				scale: 1,
				duration: 150,
				ease: 'Quad.Out'
			});
			this.mapDot.setTint(0x9e9e9e);
		};

		this.mapDot.on('pointerover', over);
		this.mapDot.on('pointerout', out);
		// en touch también mostrar al tocar
		this.mapDot.on('pointerdown', () => {
			if (!this.IsDotActive) return;

			const targetKey = "Level" + this.Level;

			// Detener cualquier música/FX sonando del nivel anterior
			this.scene.sound.stopAll();

			// (Opcional) Dormir otros niveles activos pero conservar su estado en memoria
			const mgr = this.scene.game.scene as Phaser.Scenes.SceneManager;
			const actives = (mgr.getScenes ? mgr.getScenes(true) : []) as Phaser.Scene[];
			for (const s of actives) {
				const key = (s as any)?.sys?.settings?.key as string;
				if (key && key.startsWith('Level') && key !== targetKey) {
					try { this.scene.scene.sleep(key); } catch {}
				}
			}

			// Iniciar el nivel seleccionado
			this.scene.scene.start(targetKey);
		});

		// Limpiar listeners si se destruye el container
		this.once(Phaser.GameObjects.Events.DESTROY, () => {
			this.mapDot.off('pointerover', over);
			this.mapDot.off('pointerout', out);
			this.mapDot.off('pointerdown');
		});
		/* END-USER-CTR-CODE */
	}

	public mapDot: Phaser.GameObjects.Image;
	public mapSelector: Phaser.GameObjects.Image;
	public Level: number = 1;
	public IsDotActive: boolean = false;

	/* START-USER-CODE */

	awake() {
	if (this.IsDotActive) {
			console.log("MapDot is active, enabling interactivity.");
			this.mapDot.setInteractive({ useHandCursor: true });
					this.mapDot.setTint(0xffffff);
		this.setAlpha(1);

		} else {
			console.log("MapDot is inactive, disabling interactivity.");
			this.mapDot.disableInteractive();
			this.mapSelector.setVisible(false);
		}
		// Write your code here.
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
