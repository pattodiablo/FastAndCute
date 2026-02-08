// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class HomePlayer extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// pauseHomeBtn
		const pauseHomeBtn = scene.add.image(0, 0, "PauseHomeBtn");
		this.add(pauseHomeBtn);

		// MusicStyleText
		const musicStyleText = scene.add.text(32, -8, "", {});
		musicStyleText.text = "Loading music style . . .";
		musicStyleText.setStyle({ "fontFamily": "Arial", "fontSize": "14px" });
		this.add(musicStyleText);

		this.pauseHomeBtn = pauseHomeBtn;
		this.musicStyleText = musicStyleText;

		/* START-USER-CTR-CODE */
		// Intro tween: después de 2s, sube desde y+60 y aparece desde alpha 0
		const origY = this.musicStyleText.y;
		this.musicStyleText.setAlpha(0);
		this.musicStyleText.y = origY + 60;
		this.scene.time.delayedCall(2000, () => {
			if (!this.musicStyleText.active) return;
			this.scene.tweens.add({
				targets: this.musicStyleText,
				y: origY,
				alpha: 1,
				duration: 600,
				ease: 'Cubic.Out'
			});
		});
		// Actualiza el texto con el estilo de música actual (y solo eso)
		this._onRegChange = (_parent: any, key: string, value: string | string[]) => {
			if (key === 'RadioStyle') this.updateMusicStyleText(value as string);
		};
		this.scene.registry.events.on('changedata', this._onRegChange, this);

		// Valor inicial desde el registry o localStorage (por si el Map aún no se abrió en esta sesión)
		const initialStyle = this.scene.registry.get('RadioStyle') as string | undefined;
		if (typeof initialStyle === 'string' && initialStyle.trim().length) {
			this.updateMusicStyleText(initialStyle);
		} else {
			let stored: string | undefined;
			try { stored = localStorage.getItem('RadioStylePreset') || undefined; } catch {}
			this.updateMusicStyleText(stored);
		}

		// Limpieza al destruir
		this.once(Phaser.GameObjects.Events.DESTROY, () => {
			if (this._onRegChange) {
				this.scene.registry.events.off('changedata', this._onRegChange, this);
				this._onRegChange = undefined;
			}
		});

		    this.pauseHomeBtn.setInteractive({ useHandCursor: true });
        this.pauseHomeBtn.on('pointerdown', () => {
			console.log('PauseHomeBtn clicked');
            const paused = this.scene.registry.get('PlayerPaused') === true;
			
            const next = !paused;
            this.scene.registry.set('PlayerPaused', next);
			console.log(this.scene.registry.getAll());
            // Cambia textura si tienes íconos distintos
            this.pauseHomeBtn.setTexture(next ? 'PlayHomeBtn' : 'PauseHomeBtn');
        });
		/* END-USER-CTR-CODE */
	}

	public pauseHomeBtn: Phaser.GameObjects.Image;
	public musicStyleText: Phaser.GameObjects.Text;

	/* START-USER-CODE */
	// Write your code here.

	private _onRegChange?: (parent: any, key: string, value: any) => void;

	private updateMusicStyleText(style?: string | string[]) {
		const text = typeof style === 'string' && style.trim().length
			? style
			: "Loading music style . . .";
		this.musicStyleText.setText(text);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
