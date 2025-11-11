// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MusicBtn extends Phaser.GameObjects.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "MusicON", frame);

		/* START-USER-CTR-CODE */
		this.setInteractive({ useHandCursor: true });

		this.isMuted = false; // Estado del botón

		this.on('pointerdown', () => {
			this.isMuted = !this.isMuted;

			// Cambia la textura del botón
			this.setTexture(this.isMuted ? "MusicOff" : "MusicON");

			// Mutea/desmutea toda la música
			const music = (this.scene as any).music;
			if (music) {

				music.setMute(this.isMuted);
			} try {
				localStorage.setItem("musicMuted", String(!!this.isMuted));
			} catch {
				console.warn("No se pudo guardar la preferencia de FX muteados");
				// Si localStorage no está disponible (p. ej. modo privado), ignorar
			}
		});
		/* END-USER-CTR-CODE */
	}

	public isMuted: boolean = false;

	/* START-USER-CODE */

	public setMuted(muted: boolean) {

		this.isMuted = muted;
		this.setTexture(this.isMuted ? "FxOff" : "FxON");
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
