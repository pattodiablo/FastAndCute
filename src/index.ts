import Phaser from "phaser";
import Level from "./scenes/Level";
import Level2 from "./scenes/Level2";
import BaseEscene from "./scenes/BaseEscene";
import preloadAssetPackUrl from "../static/assets/preload-asset-pack.json";
import Preload from "./scenes/Preload";
import { SpinePlugin } from "@esotericsoftware/spine-phaser";

class Boot extends Phaser.Scene {

    constructor() {
        super("Boot");
    }

    preload() {

        this.load.pack("pack", preloadAssetPackUrl);
    }

    create() {

       this.scene.start("Preload");
    }
}

window.addEventListener('load', function () {
	
	const game = new Phaser.Game({
    type: Phaser.WEBGL,
		width: 1031,
		height: 580,
		backgroundColor: "#D7E3E7",
         roundPixels: true,         // <- importante
    antialias: true,           // puedes dejarlo en true
		scale: {
			mode: Phaser.Scale.ScaleModes.FIT,
			autoCenter: Phaser.Scale.Center.CENTER_BOTH
		},plugins: { 
            scene: [{
                key: "spine.SpinePlugin",
                plugin: SpinePlugin,
                mapping: "spine"
            }]
        },
		 physics: {
            default: 'arcade',
            arcade: {
              
                debug: false
            }
		
        },  
        fps: {
                target: 60,
                
            },
        
		scene: [Boot, Preload,BaseEscene, Level, Level2]
	});

	game.scene.start("Boot");
});