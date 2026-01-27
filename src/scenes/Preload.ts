
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import assetPackUrl from "../../static/assets/asset-pack.json";
/* END-USER-IMPORTS */

export default class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

		editorCreate(): void {

		const centerX = this.scale.width * 0.5;
		const centerY = this.scale.height * 0.5;
		const barWidth = Math.min(this.scale.width * 0.55, 360);
		const barHeight = 28;
		const borderColor = 0x6b4ea5;
		const fillColor = 0xc982c4;

		// progressBarBg (borde)
		const progressBarBg = this.add.rectangle(centerX, centerY, barWidth, barHeight);
		progressBarBg.setOrigin(0.5, 0.5);
		progressBarBg.isFilled = true;
		progressBarBg.fillColor = 0x000000;
		progressBarBg.fillAlpha = 0.15;
		progressBarBg.isStroked = true;
		progressBarBg.strokeColor = borderColor;
		progressBarBg.lineWidth = 4;

		// progressBar (relleno)
		const progressBar = this.add.rectangle(centerX - barWidth * 0.5, centerY, barWidth, barHeight);
		progressBar.setOrigin(0, 0.5);
		progressBar.isFilled = true;
		progressBar.fillColor = fillColor;
		progressBar.isStroked = true;
		progressBar.strokeColor = borderColor;
		progressBar.lineWidth = 2;

		// loadingText
		const loadingText = this.add.text(centerX, centerY - 40, "", {});
		loadingText.text = "Loading...";
		loadingText.setOrigin(0.5, 0.5);
		loadingText.setStyle({ "color": "#e0e0e0", "fontFamily": "arial", "fontSize": "22px", "fontStyle": "bold" });

		this.progressBar = progressBar;
		this.progressBarBg = progressBarBg;
		this.loadingText = loadingText;

		this.events.emit("scene-awake");
	}

	private progressBar!: Phaser.GameObjects.Rectangle;
	private progressBarBg!: Phaser.GameObjects.Rectangle;
	private loadingText!: Phaser.GameObjects.Text;

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.load.pack("asset-pack", assetPackUrl);

		const width = this.progressBar.width;

		this.load.on("progress", (value: number) => {
			this.progressBar.width = width * value;
		});
	}

	create() {

		if (process.env.NODE_ENV === "development") {

			const start = new URLSearchParams(location.search).get("start");

			if (start) {

				console.log(`Development: jump to ${start}`);
				this.scene.start(start);

				return;
			}
		}

		this.scene.start("TitleScene");
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
