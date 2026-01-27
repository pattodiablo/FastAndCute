import Phaser from "phaser";
import Level1 from "./scenes/Level1";
import Level2 from "./scenes/Level2";
import Level3 from "./scenes/Level3";
import Level4 from "./scenes/Level4";
import Level5 from "./scenes/Level5";
import Level6 from "./scenes/Level6";
import Level7 from "./scenes/Level7";
import Level8 from "./scenes/Level8";
import Level9 from "./scenes/Level9";
import Level10 from "./scenes/Level10";
import TitleScene from "./scenes/TitleScene";


import Map from "./scenes/Map";
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
		backgroundColor: "#6B5CB4",
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
        
		scene: [Boot, Preload,TitleScene,BaseEscene, Map, Level1, Level2, Level3, Level4, Level5, Level6, Level7, Level8, Level9, Level10]
	});

	game.scene.start("Boot");
});