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
    }
		});
		/* END-USER-CTR-CODE */
	}

	public isMuted: boolean = false;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
