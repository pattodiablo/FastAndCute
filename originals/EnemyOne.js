(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"EnemyOne_atlas_1", frames: [[533,0,186,275],[0,0,531,531],[533,277,150,275]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_3 = function() {
	this.initialize(ss["EnemyOne_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["EnemyOne_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["EnemyOne_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.Tween3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_3();
	this.instance.setTransform(-46.4,-68.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-46.4,-68.8,93,137.5);


(lib.Tween2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#62010A").s().p("AkFFeQhsiRAAjNQAAjMBsiRQBtiRCYAAQCaAABsCRQBsCRAADMQAADNhsCRQhsCRiaAAQiYAAhtiRg");
	this.shape.setTransform(-0.025,-0.0159,1,0.7777);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37,-38.5,74,77);


(lib.Tween1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#62010A").s().p("AkFFeQhsiRAAjNQAAjMBsiRQBtiRCYAAQCaAABsCRQBsCRAADMQAADNhsCRQhsCRiaAAQiYAAhtiRg");
	this.shape.setTransform(-0.025,-0.0159,1,0.7777);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37,-38.5,74,77);


(lib.EnemyFace = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(-132.7,-132.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-132.7,-132.7,265.5,265.5);


(lib.Bullet = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#4C0002").s().p("AgPARQgHgIAAgJQAAgIAHgHQAGgHAJAAQAJAAAHAHQAHAHAAAIQAAAJgHAIQgHAGgJAAQgJAAgGgGg");
	this.shape.setTransform(-4.4,1.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#4C0002").s().p("AgOAPQgGgGAAgJQAAgIAGgGQAGgGAIAAQAJAAAFAGQAHAGAAAIQAAAJgHAGQgFAGgJAAQgIAAgGgGg");
	this.shape_1.setTransform(-4.4,4.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#4C0002").s().p("AgNAOQgFgGAAgIQAAgHAFgFQAGgGAHAAQAIAAAFAGQAGAFAAAHQAAAIgGAGQgFAFgIAAQgHAAgGgFg");
	this.shape_2.setTransform(-4.4,7.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#4C0002").s().p("AgMANQgEgGAAgHQAAgGAEgFQAGgFAGgBQAHABAFAFQAFAFAAAGQAAAHgFAGQgFAEgHAAQgGAAgGgEg");
	this.shape_3.setTransform(-4.4,10.95);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#4C0002").s().p("AgKALQgEgEAAgHQAAgFAEgFQAFgEAFAAQAGAAAFAEQAEAFAAAFQAAAHgEAEQgFAFgGgBQgFABgFgFg");
	this.shape_4.setTransform(-4.4,14.05);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#4C0002").s().p("AgIAKQgEgFAAgFQAAgEAEgFQAEgDAEgBQAGABADADQAEAFAAAEQAAAFgEAFQgDADgGABQgEgBgEgDg");
	this.shape_5.setTransform(-4.45,17.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#4C0002").s().p("AgHAJQgDgEAAgFQAAgEADgDQADgEAEAAQAFAAADAEQADADAAAEQAAAFgDAEQgDADgFAAQgEAAgDgDg");
	this.shape_6.setTransform(-4.45,20.175);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#4C0002").s().p("AgGAHQgCgDAAgEQAAgDACgDQAEgDACAAQAEAAADADQACADAAADQAAAEgCADQgDADgEAAQgCAAgEgDg");
	this.shape_7.setTransform(-4.45,23.225);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#4C0002").s().p("AgEAGQgCgDAAgDQAAgCACgDQACgCACAAQADAAACACQACADAAACQAAADgCADQgCACgDAAQgCAAgCgCg");
	this.shape_8.setTransform(-4.45,26.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},9).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[]},1).wait(6));

	// Layer_3
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#4C0002").s().p("AgQAQQgGgGAAgKQAAgIAGgHQAIgHAIAAQAJAAAHAHQAHAHAAAIQAAAKgHAGQgHAHgJAAQgIAAgIgHg");
	this.shape_9.setTransform(5.1,3.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#4C0002").s().p("AgOAQQgGgHAAgJQAAgIAGgGQAGgHAIAAQAIAAAHAHQAGAGAAAIQAAAJgGAHQgHAGgIAAQgIAAgGgGg");
	this.shape_10.setTransform(5.1,6.075);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#4C0002").s().p("AgMAQQgGgHAAgJQAAgIAGgGQAFgHAHAAQAIAAAFAHQAGAGAAAIQAAAJgGAHQgFAGgIAAQgHAAgFgGg");
	this.shape_11.setTransform(5.1,8.675);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#4C0002").s().p("AgLAPQgFgGAAgJQAAgIAFgGQAFgGAGAAQAHAAAFAGQAFAGAAAIQAAAJgFAGQgFAGgHAAQgGAAgFgGg");
	this.shape_12.setTransform(5.1,11.275);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#4C0002").s().p("AgKAOQgEgGAAgIQAAgHAEgGQAFgGAFAAQAGAAAEAGQAFAGAAAHQAAAIgFAGQgEAGgGAAQgFAAgFgGg");
	this.shape_13.setTransform(5.1,13.875);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#4C0002").s().p("AgJAOQgDgGAAgIQAAgHADgFQAEgHAFAAQAFAAAEAHQAEAFAAAHQAAAIgEAGQgEAGgFgBQgFABgEgGg");
	this.shape_14.setTransform(5.1,16.45);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#4C0002").s().p("AgHAOQgDgGAAgIQAAgHADgFQADgGAEAAQAFAAACAGQAEAFAAAHQAAAIgEAGQgCAFgFAAQgEAAgDgFg");
	this.shape_15.setTransform(5.1,19.025);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#4C0002").s().p("AgGANQgCgGAAgHQAAgGACgGQADgFADAAQAEAAADAFQACAGAAAGQAAAHgCAGQgDAFgEAAQgDAAgDgFg");
	this.shape_16.setTransform(5.1,21.625);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#4C0002").s().p("AgEANQgCgGAAgHQAAgGACgFQACgGACAAQADAAACAGQACAFAAAGQAAAHgCAGQgCAEgDAAQgCAAgCgEg");
	this.shape_17.setTransform(5.1,24.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_9}]},4).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[]},1).wait(11));

	// Layer_2
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#4C0002").s().p("AgXBXQASg6gOg1QgOg2gEggQgEgiAYAAQAWAAARArQARAqAAA7QAAA8gRArQgRAqgWAAQgYAAASg6g");
	this.shape_18.setTransform(1.9273,10.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#4C0002").s().p("AgOBhQAIgxgUg8QgUg9AEgcQADgdAXgHQAWgHATAkQATAjAAA5QAAA4gPAvQgQAvgRAFIgDABQgOAAAHgrg");
	this.shape_19.setTransform(0.9489,10.5463);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#4C0002").s().p("AgEBqQgCgngZhDQgahFAKgYQALgXAWgOQAWgPAWAdQAUAcABA2QAAA1gOA0QgOA0gNALQgDACgCAAQgIAAgBgeg");
	this.shape_20.setTransform(-0.165,10.568);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#4C0002").s().p("AAGB0IgqhpQgghLARgTQASgTAWgVQAWgVAXAVQAXAVABAzQAAAzgNA4QgNA5gHAQQgDAGgDAAQgGAAgHgTg");
	this.shape_21.setTransform(-1.3135,10.5261);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#4C0002").s().p("AAMB/QgQgTgdhCQgchBAKglQAKglAYgXQAXgXAZAPQAaAOgCAtQgBAtgPA3QgOA3ACAeQACATgGAAQgEAAgHgIg");
	this.shape_22.setTransform(-1.7007,10.363);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#4C0002").s().p("AATCJQgXgKgZg3Qgag4ADg2QADg4AZgYQAYgZAcAHQAcAHgDAoQgDAngQA1QgRA3ANAsQAKAkgOAAIgHgBg");
	this.shape_23.setTransform(-2.1054,10.3828);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#4C0002").s().p("AgYBkQgXgugEhIQgFhJAbgbQAbgaAdAAQAeAAgFAhQgFAhgSA2QgSA1AXA6QAXA6geAAIAAAAQgdAAgWgtg");
	this.shape_24.setTransform(-2.6881,10.5);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#4C0002").s().p("AAPCJQgXgKgUguQgVgugEg/QgDhBAZgYQAZgZAcAFQAdAGADAXQACAYgVBEQgVBEAMAwQAKAngOAAIgHgCg");
	this.shape_25.setTransform(-1.4331,10.3374);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#4C0002").s().p("AABCBQgPgUgTgvQgUgwgCg2QgDg4AYgXQAYgXAaALQAbALAKAOQAKAOgYBTQgYBSABAmQABAZgHAAQgDAAgGgHg");
	this.shape_26.setTransform(-0.0446,10.2949);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#4C0002").s().p("AgMB2QgKgegRgwQgSgvgCguQgCgvAXgVQAXgVAYAQQAaAQASAEQARAFgbBiQgcBhgJAbQgFANgDAAQgFAAgFgQg");
	this.shape_27.setTransform(1.4029,10.3505);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#4C0002").s().p("AgSBtQAAgogQgyQgRgwgCgqQgDgrAXgOQAXgOAaAQQAbARAJAdQAJAcgaBSQgZBSgNASQgFAGgDAAQgHAAAAgbg");
	this.shape_28.setTransform(1.7549,10.3426);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#4C0002").s().p("AgYBiQAJgxgPgyQgPg0gEgmQgDgmAYgHQAXgHAbARQAcARAAA1QAAA1gWBBQgYBDgRAJIgGABQgMAAAHgpg");
	this.shape_29.setTransform(2.183,10.3934);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#4C0002").s().p("AghBXQASg6gOg1QgOg2gEggQgDgiAXAAQAYAAAcARQAeARgJBNQgJBNgUAzQgUAygYAAQgXAAARg6g");
	this.shape_30.setTransform(2.8509,10.5);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#4C0002").s().p("AgVBlQAJgugQg0QgPgzgEgqQgEgpAYgFQAYgFAcANQAeAOgIBFQgIBDgUAzQgTAzgOAMQgDADgCAAQgIAAAGgmg");
	this.shape_31.setTransform(1.7631,10.2214);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#4C0002").s().p("AgJByQgBgjgRgyQgRgxgEgyQgDgyAYgKQAYgKAdAKQAdALgHA8QgHA7gTAzQgUA0gEAXQgCAKgCAAQgCAAgBgWg");
	this.shape_32.setTransform(0.6952,10.056);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#4C0002").s().p("AACB/QgKgYgTgxQgSgwgEg5QgDg7AYgPQAZgOAcAHQAeAGgGAzQgHAzgTA0QgTA0AFAjQACAVgDAAQgCAAgEgJg");
	this.shape_33.setTransform(-0.391,10.0421);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#4C0002").s().p("AAOCJQgUgMgUgvQgUgvgDhCQgDhDAYgTQAZgUAdAEQAdADgFAqQgGAqgSA0QgTA1AOAvQAKAlgLAAQgCAAgEgCg");
	this.shape_34.setTransform(-1.4551,10.1874);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#4C0002").s().p("AgZBjQgWgtgDhKQgDhLAZgYQAYgZAdAAQAeAAgEAhQgFAhgSA2QgSA1AXA6QAWA6geAAQgdAAgVgug");
	this.shape_35.setTransform(-2.5458,10.5);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#4C0002").s().p("AANCJQgVgKgUguQgVgvgChAQgDhCAYgXQAYgYAbAHQAbAHAEAdQAEAdgWA8QgVA7ALAxQAJApgOAAIgGgBg");
	this.shape_36.setTransform(-1.3669,10.3718);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#4C0002").s().p("AAACAQgOgTgTgwQgTgvgDg3QgCg4AXgWQAYgXAYAPQAaAOAMAYQALAYgYBBQgYBCgBApQgBAbgGAAQgDAAgEgGg");
	this.shape_37.setTransform(-0.0467,10.2828);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#4C0002").s().p("AgPB2QgGgdgSgwQgRgvgCguQgCgvAWgVQAXgWAWAWIAsAoQAUAUgcBIIgoBoQgFAQgFAAQgFAAgDgOg");
	this.shape_38.setTransform(1.3623,10.2821);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#4C0002").s().p("AgVBtQACgngQgyQgQgxgDgqQgCgqAWgOQAXgPAYAXQAXAXAOAhQAOAggbBEQgbBEgQAVQgGAIgDAAQgHAAABgZg");
	this.shape_39.setTransform(1.8236,10.2653);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#4C0002").s().p("AgaBiQAKgwgQgzQgPg0gDglQgDgmAXgHQAXgHAYAYQAZAZAIAtQAHAtgbBAQgbBBgTAKQgDACgDAAQgMAAAIgog");
	this.shape_40.setTransform(2.3062,10.3407);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#4C0002").s().p("AgbCRQgXAAARg6QASg6gOg1QgOg2gEggQgDgiAXAAQAYAAAYAaQAaAaABA6QABA5gbA9QgZA9gYAAIAAAAg");
	this.shape_41.setTransform(2.8794,10.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_18}]}).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).wait(1));

	// Layer_1
	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#4C0002").s().p("AgyA/QgWgaABglQgBgkAWgaQAVgaAdAAQAeAAAVAaQAVAaABAkQgBAlgVAaQgVAageAAQgdAAgVgag");
	this.shape_42.setTransform(0.1,4.9);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#4C0002").s().p("AgyA3QgWgXABggQgBgfAWgWQAVgXAdAAQAeAAAVAXQAVAWABAfQgBAggVAXQgVAWgeAAQgdAAgVgWg");
	this.shape_43.setTransform(0.1,3.575);
	this.shape_43._off = true;

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#4C0002").s().p("AgyAvQgWgUABgbQgBgaAWgTQAVgUAdAAQAeAAAVAUQAVATABAaQgBAbgVAUQgVATgeAAQgdAAgVgTg");
	this.shape_44.setTransform(0.1,2.225);
	this.shape_44._off = true;

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#4C0002").s().p("AgyAnQgWgQABgXQgBgVAWgQQAVgQAdAAQAeAAAVAQQAVAQABAVQgBAXgVAQQgVAPgeAAQgdAAgVgPg");
	this.shape_45.setTransform(0.1,0.9);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#4C0002").s().p("AgyAzQgWgVABgeQgBgdAWgUQAVgWAdABQAegBAVAWQAVAUABAdQgBAegVAVQgVAUgeABQgdgBgVgUg");
	this.shape_46.setTransform(0.1,2.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_42}]}).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_42}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_42).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).to({_off:true},1).wait(4).to({_off:false},0).to({_off:true},1).wait(5).to({_off:false},0).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_43).wait(1).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(4).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_44).wait(2).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(3).to({_off:false},0).to({_off:true},1).wait(4).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.9,-4.5,15.600000000000001,31.6);


(lib.EnemyCannon = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Pipe
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(-37.4,-104.35,0.5,0.5);

	this.instance_1 = new lib.Tween3("synched",0);
	this.instance_1.setTransform(0.05,-35.55);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},19).to({state:[{t:this.instance_1}]},4).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(19).to({_off:false},0).to({scaleX:0.8705},4).wait(1));

	// Shadow
	this.instance_2 = new lib.Tween1("synched",0);
	this.instance_2.setTransform(-0.35,38.5);

	this.instance_3 = new lib.Tween2("synched",0);
	this.instance_3.setTransform(-0.35,-83.7,1,0.4545);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},7).to({state:[{t:this.instance_2}]},10).to({state:[{t:this.instance_3}]},4).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({y:71.75},2).to({scaleY:1.4935,y:-12},7).to({scaleY:0.4661,y:-55.85},10).to({_off:true,scaleY:0.4545,y:-83.7},4).wait(1));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.004)").s().p("AkJMaQhshxAAifQAAigBshxIACgBIAAsEIgOAAQgoAAgcgcQgcgcAAgoIAAi+QAAgoAcgcQAcgcAoAAIIrAAQAoAAAcAcQAcAcAAAoIAAC+QAAAogcAcQgcAcgoAAIgOAAIAAMMQBnBvgBCbQABCfhtBxQhsBxiZAAQiZAAhthxg");
	this.shape.setTransform(0,-13.675);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(24));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-46.3,-104.3,93,214.6);


(lib.Enemy1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.EnemyFace("synched",0);
	this.instance.setTransform(0,54.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:59.9},11).to({y:54.9},12).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#F7708E","#EC0034"],[0,1],0,-145.2,0,169.4).s().p("Ao8VOQkJhwjMjMQjNjMhvkJQh0kRAAksQAAkrB0kRQBwkJDMjMQDMjMEJhwQERh0ErAAQEsAAERB0QEJBvDMDNQDNDMBvEJQB0ERAAErQAAEsh0ERQhvEJjNDMQjLDMkKBwQkRB0ksAAQkrAAkRh0g");
	this.shape.setTransform(0,54.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#F7708E","#EC0034"],[0,1],0,-145.2,0,169.4).s().p("Ao8VOQkJhwjMjMQjNjMhvkJQh0kRAAksQAAkrB5kMQB2kEDMjMQDNjMEEh1QEKh5ErAAQEsAAERB0QEJBvDMDNQDNDMBvEJQB0ERAAErQAAEsiAELQh7EDjFDQQjGDPkEBzQkMB2ksAAQkrAAkRh0g");
	this.shape_1.setTransform(0,54.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#F7708E","#EC0034"],[0,1],0,-145.2,0,169.4).s().p("Ao8VOQkJhwjMjMQjNjMhvkJQh0kRAAksQAAkrB+kHQB7kBDOjKQDOjLD9h7QEEh+ErAAQEsAAERB0QEJBvDMDNQDNDMBvEJQB0ERAAErQAAEsiLEFQiID+i+DTQi+DTkAB1QkHB4ksAAQkrAAkRh0g");
	this.shape_2.setTransform(0,54.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["#F7708E","#EC0034"],[0,1],0,-145.2,0,169.4).s().p("Ao8VOQkJhwjMjMQjNjMhvkJQh0kRAAksQAAkrCDkBQCCj9DOjKQDOjKD4iBQD9iDErAAQEsAAERB0QEJBvDMDNQDNDMBvEJQB0ERAAErQAAEsiWD+QiUD5i3DXQi3DWj9B4QkBB6ksAAQkrAAkRh0g");
	this.shape_3.setTransform(0,54.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.lf(["#F7708E","#EC0034"],[0,1],0,-145.2,0,169.4).s().p("Ao8VOQkJhwjMjMQjNjMhvkJQh0kRAAksQAAkrCJj8QCHj5DPjJQDPjKDziGQD1iIErAAQEsAAERB0QEJBvDMDNQDNDMBvEJQB0ERAAErQAAEsiiD3QigD0iwDaQiwDaj5B6Qj7B9ksAAQkrAAkRh0g");
	this.shape_4.setTransform(0,54.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.lf(["#F7708E","#EC0034"],[0,1],0,-145.2,0,169.4).s().p("Ao8VOQkJhwjMjMQjNjMhvkJQh0kRAAksQAAkrCNj2QCNj1DQjJQDRjJDtiMQDuiNErAAQEsAAERB0QEJBvDMDNQDNDMBvEJQB0ERAAErQAAEsitDxQitDuipDeQipDdj1B9Qj1B/ksAAQkrAAkRh0g");
	this.shape_5.setTransform(0,54.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.lf(["#F7708E","#EC0034"],[0,1],0,-145.2,0,169.4).s().p("Ao8VOQkJhvjMjNQjNjMhvkJQh0kRAAksQAAkrCTjxQCSjxDRjIQDRjIDniSQDoiSErAAQEsAAERB0QEJBvDMDNQDNDMBvEJQB0ERAAErQAAEsi4DqQi5DpijDhQiiDhjwCBQjwCAksAAQkrAAkRh0g");
	this.shape_6.setTransform(0,54.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.lf(["#F7708E","#EC0034"],[0,1],0,-145.2,0,169.4).s().p("AoiUzQjxiLjkiyQjliyhwkIQh1kQAAksQAAkrCMj3QCMj2DQjJQDQjJDuiLQDwiMErAAQEsAAEJCFQECCCDTC7QDUC7BwEJQB0EQAAErQAAEsirDyQiqDwirDdQiqDcj2B9Qj2B+ksAAQkrAAj3iPg");
	this.shape_7.setTransform(0,54.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.lf(["#F7708E","#EC0034"],[0,1],0,-145.2,0,169.4).s().p("AoIUZQjZimj8iZQj8iYhzkIQh1kOAAksQAAkrCHj+QCEj6DPjKQDPjKD1iEQD4iGErAAQEsAAEACWQD7CTDcCrQDbCqBwEJQB0EPAAErQAAEsidD6QibD1izDaQi0DYj5B6Qj+B7ksAAQkrAAjdipg");
	this.shape_8.setTransform(0,54.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.lf(["#F7708E","#EC0034"],[0,1],0,-145.2,0,169.4).s().p("AnvT/QjAjDkUh9QkVh/hzkIQh2kMAAksQAAkrCAkFQB+j/DOjKQDOjKD8h+QEAiAErAAQEsAAD3CnIHYE/QDiCaBxEJQB0ENAAErQAAEsiQEBQiMD9i7DUQi8DVj/B2QkEB5ksAAQkrAAjEjDg");
	this.shape_9.setTransform(0,54.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.lf(["#F7708E","#EC0034"],[0,1],0,-145.2,0,169.4).s().p("AnVTkQinjdkthkQkthlh1kIQh2kKAAksQAAkrB6kLQB3kEDNjLQDNjLECh3QEJh6ErAAQEsAADvC4QDtC2DrCKQDqCJByEJQBzEMAAErQAAEsiBEJQh/EDjEDQQjDDRkEByQkLB3ksAAQkrAAiqjeg");
	this.shape_10.setTransform(0,54.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.lf(["#F7708E","#EC0034"],[0,1],0,-145.2,0,169.4).s().p("Am7TJQiPj4lFhLQlFhKh2kIQh3kIAAksQAAkrB0kRQBwkJDMjMQDMjMEJhwQERh0ErAAQEsAADmDJQDnDIDxB5QDyB4BzEKQBzEKAAErQAAEsh0ERQhvEJjNDMQjLDMkKBwQkRB0ksAAQkrAAiQj5g");
	this.shape_11.setTransform(0,54.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.lf(["#F7708E","#EC0034"],[0,1],-0.7,-144.5,-0.7,170.1).s().p("AnbTdQipjPkshkQkthlhikIQhikIABksQABkrBfkRQBckLDMjMQDMjMEHhoQEPhsEqAKQEoALDzClQDyClDqCJQDqCJBrELQBrEKgKErQgKEshiERQheEJjMDNQjMDMkKBWQkQBbkrAKIgdABQkYAAigjFg");
	this.shape_12.setTransform(0.7422,54.1788);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.lf(["#F7708E","#EC0034"],[0,1],-1.5,-143.7,-1.5,170.9).s().p("An8TxQjCimkVh+QkVh+hNkIQhOkIACksQADkrBKkSQBHkMDMjMQDMjMEHhhQEMhkEnAVQEmAUD/CCQD+CCDjCaQDiCZBjEMQBiELgUErQgUEshPEPQhMELjMDMQjMDMkLA+QkQBBkrAVQgiACggAAQj/AAisiSg");
	this.shape_13.setTransform(1.5649,53.4434);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.lf(["#F7708E","#EC0034"],[0,1],-2.4,-143,-2.4,171.6).s().p("AofUEQjbh8j8iYQj8iYg6kIQg5kJADkrQAEkrA1kSQAzkODMjMQDMjMEGhaQEJhbElAfQEkAfEKBeQEKBeDcCrQDbCqBaEMQBaEMgeErQgdEsg9EPQg7ELjMDMQjMDMkMAlQkPAnkrAgQg9AGg5AAQjiAAivhig");
	this.shape_14.setTransform(2.4541,52.7278);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.lf(["#F7708E","#EC0034"],[0,1],-3.4,-142.4,-3.4,172.2).s().p("ApBUWQj0hSjkiyQjliyglkIQglkJAFkrQAFkrAgkSQAfkQDMjMQDMjMEFhSQEGhTEjApQEhApEWA7QEWA6DUC8QDUC7BSEMQBRENgnErQgoEsgqEOQgqEMjMDMQjMDMkMANQkOANkrAqQhmAOhgAAQi5AAihg2g");
	this.shape_15.setTransform(3.4153,52.1363);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.lf(["#F7708E","#EC0034"],[0,1],-4.4,-142.1,-4.4,172.5).s().p("ApkUlQkNgojMjMQjNjMgQkJQgRkIAGkrQAGkrALkSQALkSDMjMQDMjMEEhLQEEhLEgA0QEfAzEiAXQEiAXDMDNQDMDMBKENQBJENgxErQgyEsgYENQgYENjMDMQjMDMkNgMQkNgNkrA1QiqAdihAAQh6AAh0gRg");
	this.shape_16.setTransform(4.4165,51.8366);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.lf(["#F7708E","#EC0034"],[0,1],-3.7,-142.5,-3.7,172.1).s().p("ApeUsQkMgyjMjMQjNjNgekIQgfkKAFkrQAFkrAakSQAakRDMjMQDMjMEEhQQEGhQEiAsQEhAsEfAkQEfAkDMDMQDMDMBPENQBQENgrErIhPI6QglEMjMDNQjMDMkMAFQkOAGkrAtQiNAViGAAQiXAAiQgbg");
	this.shape_17.setTransform(3.7055,52.1772);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.lf(["#F7708E","#EC0034"],[0,1],-3,-142.9,-3,171.7).s().p("ApYUyQkLg8jMjMQjNjNgrkIQgukLAFksQAEkqApkSQAokQDMjMQDMjMEFhVQEIhXEjAlQEjAlEdAxQEbAxDMDMQDMDMBVEMQBVEOgjErQgjEsgzEPQgxELjMDNQjMDMkMAXQkOAYkrAlQhyAPhtAAQizAAipgng");
	this.shape_18.setTransform(3.0005,52.5582);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.lf(["#F7708E","#EC0034"],[0,1],-2.3,-143.3,-2.3,171.3).s().p("ApRU4QkLhGjMjMQjNjNg5kIQg7kMADksQADkrA4kSQA3kODMjMQDMjMEGhaQEJhdEmAeQEkAdEbA/QEXA9DMDMQDMDMBaELQBcEPgdErQgcEsg/EPQg+ELjMDNQjMDMkLAoQkPArkrAeQhYAIhVAAQjPAAi/gzg");
	this.shape_19.setTransform(2.3287,52.9824);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.lf(["#F7708E","#EC0034"],[0,1],-1.6,-143.7,-1.6,170.9).s().p("ApLU+QkLhRjMjMQjMjMhHkJQhKkNADksQADkrBHkRQBEkNDMjMQDMjMEHhgQEMhjEmAWQEmAXEZBMQETBJDNDNQDMDMBfEKQBiEQgVErQgWEshMEPQhKELjMDMQjMDMkLA7QkQA9krAWQg/AFg/AAQjnAAjWhCg");
	this.shape_20.setTransform(1.6812,53.438);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.lf(["#F7708E","#EC0034"],[0,1],-1,-144.2,-1,170.4).s().p("ApGVDQkKhbjMjMQjMjMhVkJQhXkPABkrQACkrBWkSQBTkLDMjMQDMjMEHhmQEOhoEpAPQEnAPEWBZQEQBWDNDNQDMDMBkEKQBoEQgOErQgOEshaEQQhWEKjMDMQjMDMkKBMQkRBQkrAPQgpACgpAAQj/AAjrhSg");
	this.shape_21.setTransform(1.0818,53.914);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.lf(["#F7708E","#EC0034"],[0,1],-0.5,-144.7,-0.5,169.9).s().p("ApBVJQkJhmjMjMQjNjMhikJQhmkQABksQABkrBlkRQBikKDMjMQDMjMEIhrQEPhuEqAHQEqAIEUBmQEMBjDMDNQDMDMBqEJQBuERgHErQgHEshnERQhjEJjMDMQjMDMkJBeQkRBikrAHIgoABQkWAAj/hig");
	this.shape_22.setTransform(0.5205,54.4012);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-147.4,-92.5,294.8,294.8);


// stage content:
(lib.EnemyOne = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bullet();
	this.instance.setTransform(268.3,103.8);

	this.EnemyCannon = new lib.EnemyCannon();
	this.EnemyCannon.name = "EnemyCannon";
	this.EnemyCannon.setTransform(204.05,115.05,0.3048,0.3048);

	this.EnemyFace = new lib.Enemy1();
	this.EnemyFace.name = "EnemyFace";
	this.EnemyFace.setTransform(116.45,90.05,0.3319,0.3319);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.EnemyFace},{t:this.EnemyCannon},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(467.6,359.4,-191.90000000000003,-202.2);
// library properties:
lib.properties = {
	id: '3DCDDEA1D2914CC6A6E02C27C46A02BC',
	width: 800,
	height: 600,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/EnemyOne_atlas_1.png?1762466159060", id:"EnemyOne_atlas_1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['3DCDDEA1D2914CC6A6E02C27C46A02BC'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;