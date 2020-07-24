
		<!--  Third-party frameworks and scaffolds.  -->

	


		<div id="cubeHasTwistsQueued"></div>
		<div id="cubeIsTweening"></div>
		<div id="twist"></div>
		<div id="captions"></div>
		<div id="container"></div>
		<div id="controlsOpen">
			<div class="pad">
				<a href="." onclick="$('#controls').fadeIn( 500 );$('#controlsOpen').fadeOut( 500 );return false">Cube Control</a>
			</div>
		</div>
		<div id="controls">
			<div class="pad">

				<a id="controlsClose" class="key" href="." onclick="$('#controls').fadeOut( 500 );$('#controlsOpen').fadeIn( 500 );return false">&uarr;</a>




				<div id="presets">
					<h2>Presets</h2>
					<a href="javascript:cube.presetNormal()">Normal</a>
					<a href="javascript:cube.presetText()">Text</a>
					<a href="javascript:cube.presetWireframe()">Wireframe</a>
					<a href="javascript:cube.presetPurty()">Purty colors</a>
					<a href="javascript:cube.presetHighlightCore()">Highlight core</a>
					<a href="javascript:cube.presetHighlightCenters()">Highlight centers</a>
					<a href="javascript:cube.presetHighlightEdges()">Highlight edges</a>
					<a href="javascript:cube.presetHighlightCorners()">Highlight corners</a>
					<a href="javascript:cube.presetHighlightWhite()">Highlight white</a>
				</div>




				<div id="attributes">
					<h2>Attributes</h2>				
					<label><input type="checkbox" id="attributeFaceLabels" checked>Cube face labels</label>
					<label><input type="checkbox" id="attributePlastics"   checked>Plastic surfaces</label>
					<label><input type="checkbox" id="attributeIntroverts" checked>Introvert surfaces</label>
					<label><input type="checkbox" id="attributeStickers"   checked>Color stickers</label>
					<label><input type="checkbox" id="attributeIds"        checked>Cubelet Ids</label>
					<label><input type="checkbox" id="attributeTexts"      checked>Texts</label>
					<label><input type="checkbox" id="attributeWireframes" checked>Wireframes</label>
				</div>




				<div id="actions">
					<h2>Actions</h2>
					<a href="javascript:cube.presetDemo()">Start demo mode</a>
					<a href="javascript:cube.presetDemoStop()">Stop demo mode</a>
					<a href="javascript:cube.isShuffling=true;cube.isRotating=true;updateControls()">Start shuffle &amp; rotate</a>
					<a href="javascript:cube.isShuffling=false;cube.isRotating=false;updateControls()">Stop shuffle &amp; rotate</a>
					<a href="javascript:cube.solve()">Solve the Top Cross</a>
					<label><input type="checkbox" id="actionShuffle">Shuffle</label>
					<label><input type="checkbox" id="actionRotate">Auto rotate</label>
					<label><input type="checkbox" id="actionNotation">Show twist notation</label>
				</div>




				<div id="commands">
					<h2>Keyboard commands</h2>
					<div class="keyBundle">
						<a class="key" href="javascript:cube.twistQueue.add('X')">X</a><a class="key" href="javascript:cube.twistQueue.add('x')">x</a> whole cube<br>
						<a class="key" href="javascript:cube.twistQueue.add('L')">L</a><a class="key" href="javascript:cube.twistQueue.add('l')">l</a> left face<br>
						<a class="key" href="javascript:cube.twistQueue.add('M')">M</a><a class="key" href="javascript:cube.twistQueue.add('m')">m</a> middle slice<br>
						<a class="key" href="javascript:cube.twistQueue.add('R')">R</a><a class="key" href="javascript:cube.twistQueue.add('r')">r</a> right face<br>
					</div>
					<div class="keyBundle">
						<a class="key" href="javascript:cube.twistQueue.add('Y')">Y</a><a class="key" href="javascript:cube.twistQueue.add('y')">y</a> whole cube<br>
						<a class="key" href="javascript:cube.twistQueue.add('U')">U</a><a class="key" href="javascript:cube.twistQueue.add('u')">u</a> up face<br>
						<a class="key" href="javascript:cube.twistQueue.add('E')">E</a><a class="key" href="javascript:cube.twistQueue.add('e')">e</a> equator slice<br>
						<a class="key" href="javascript:cube.twistQueue.add('D')">D</a><a class="key" href="javascript:cube.twistQueue.add('d')">d</a> down face<br>
					</div>
					<div class="keyBundle">
						<a class="key" href="javascript:cube.twistQueue.add('Z')">Z</a><a class="key" href="javascript:cube.twistQueue.add('z')">z</a> whole cube<br>
						<a class="key" href="javascript:cube.twistQueue.add('F')">F</a><a class="key" href="javascript:cube.twistQueue.add('f')">f</a> front face<br>
						<a class="key" href="javascript:cube.twistQueue.add('S')">S</a><a class="key" href="javascript:cube.twistQueue.add('s')">s</a> standing slice<br>
						<a class="key" href="javascript:cube.twistQueue.add('B')">B</a><a class="key" href="javascript:cube.twistQueue.add('b')">b</a> back face<br>
					</div>
				</div>




				<div>
					<h2>Texts</h2>
					<textarea cols="6" rows="3" maxlength="18" wrap="hard" id="texts">BEYONDRUBIKs  CUBE</textarea>
					Hit return to or click elsewhere to apply changes.
				</div>
				<br><br>

				


			</div>
		</div>

<style>




    /************/
   /*          */
  /*   Base   */
 /*          */
/************/


@font-face {

	font-family: "RubikExtended";
	src: 
		url( "../media/RubikExtended.ttf"  ) format( "truetype" ),
		url( "../media/RubikExtended.otf"  ) format( "otf" );
	font-weight: normal;
	font-style: normal;
}
html, body {
	
	width:  100%;
	height: 100%;
}
body {
	
	background-color: #000;
	vertical-align: top;
	overflow: hidden;
}
body, h1, h2 {

	margin:  0;
	border:  0;
	padding: 0;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size:   12px;
	line-height: 15px;
	color: rgba( 255, 255, 255, 0.7 );
}
a {

	color: rgba( 255, 255, 255, 0.7 );
	text-decoration: none;
	border-bottom: 1px dotted #FFF;
}
a:hover {

	color: #FFF;
	border-bottom: 1px solid #FFF;
}
table, td, tr {

	margin: 0;
	border: none;
	border-collapse: collapse;
	padding: 0;
}
.pad {

	padding: 8px;
}
.graydient {

	/* http://www.colorzilla.com/gradient-editor/ */
	background: #000; /* Old browsers */
	background: -moz-radial-gradient(center, ellipse cover,  #444 0%, #000000 90%); /* FF3.6+ */
	background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%,#444), color-stop(90%,#000000)); /* Chrome,Safari4+ */
	background: -webkit-radial-gradient(center, ellipse cover,  #444 0%,#000000 90%); /* Chrome10+,Safari5.1+ */
	background: -o-radial-gradient(center, ellipse cover,  #444 0%,#000000 90%); /* Opera 12+ */
	background: -ms-radial-gradient(center, ellipse cover,  #444 0%,#000000 90%); /* IE10+ */
	background: radial-gradient(ellipse at center,  #444 0%,#000000 90%); /* W3C */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#444444', endColorstr='#000000',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}
.heroicRed {

	background-color: #F00;
}






    /************/
   /*          */
  /*   Cube   */
 /*          */
/************/


.cube {

	width:  420px;
	height: 420px;
}
#cubeHasTwistsQueued {

	box-sizing: border-box;
	display: none;
	position: absolute;
	top:  85px;
	left: 85px;
	border: 2px solid #FFF;
	border-radius: 20px;
	width:  40px;
	height: 40px;
	opacity: 0.3;
}
#cubeIsTweening {

	display: none;
	position: absolute;
	top:  90px;
	left: 90px;
	border-radius: 15px;
	width:  30px;
	height: 30px;
	background-color: #FFF;
	opacity: 0.1;
}
/*

	This next bit is just for labeling a Cube's face.

*/
.faceLabel {

	display: none;
	position: absolute;
	z-index: 3000;
	width:  100%;
	height: 100%;
	font-size:    60px;
	line-height: 420px;
	text-align: center;	
	font-family: "RubikExtended";
	text-shadow: 0 0 24px rgba( 0, 0, 0, 0.3 );
	color: #FFF;
}
.faceLabel.faceFront { -webkit-transform: rotateX(   0deg ) translateZ( 350px ) rotateZ(   0deg ); }
.faceLabel.faceUp    { -webkit-transform: rotateX(  90deg ) translateZ( 350px ) rotateZ(   0deg ); }
.faceLabel.faceRight { -webkit-transform: rotateY(  90deg ) translateZ( 350px ) rotateZ(   0deg ); }
.faceLabel.faceDown  { -webkit-transform: rotateX( -90deg ) translateZ( 350px ) rotateZ(  90deg ); }
.faceLabel.faceLeft  { -webkit-transform: rotateY( -90deg ) translateZ( 350px ) rotateZ( -90deg ); }
.faceLabel.faceBack  { -webkit-transform: rotateY( 180deg ) translateZ( 350px ) rotateZ( -90deg ); }






    /****************/
   /*              */
  /*   Cubelets   */
 /*              */
/****************/


.cubelet {

	width:  140px;
	height: 140px;
	position: absolute;
  	-webkit-transform-style: preserve-3d;	
}






    /*********************/
   /*                   */
  /*   Cubelet Faces   */
 /*                   */
/*********************/


/*
	
	Direction-facing planes of limited size
	that act as containers for content.

*/
.face {

	position: absolute;
	width:  140px;
	height: 140px;
	background-color: #000;
	text-align: center;
	-webkit-backface-visibility: hidden;
  	-moz-backface-visibility:    hidden;
  	-ms-backface-visibility:     hidden;
  	-o-backface-visibility:      hidden;
  	backface-visibility:         hidden;
  	overflow: hidden;
  	-webkit-transform-style: preserve-3d;
}
.faceFront { -webkit-transform: rotateX(   0deg ) translateZ( 70px ) rotateZ(   0deg ); }
.faceUp    { -webkit-transform: rotateX(  90deg ) translateZ( 70px ) rotateZ(   0deg ); }
.faceRight { -webkit-transform: rotateY(  90deg ) translateZ( 70px ) rotateZ(   0deg ); }
.faceDown  { -webkit-transform: rotateX( -90deg ) translateZ( 70px ) rotateZ(  90deg ); }
.faceLeft  { -webkit-transform: rotateY( -90deg ) translateZ( 70px ) rotateZ( -90deg ); }
.faceBack  { -webkit-transform: rotateY( 180deg ) translateZ( 70px ) rotateZ( -90deg ); }
/*

	Extroverted faces have content such as a colored sticker, text, etc.
	They are constantly visible. Meanwhile introverted faces are not
	visible when the cube is an untwisted state. Some introverted walls 
	are momentarily visible as the cube twists.

*/
.faceIntroverted { background-color: #000; }
/*

	Our Cubelet faces are naturally black to match the physical Rubik's Cube.
	Adding or removing the "transparent" class here keeps the position and
	rotation integrity of the face while supporting Group.showPlastics() and
	Group.hidePlastics().

*/
.faceTransparent { background-color: transparent; }
/*

	Awwww.... Look at da purty colors...

*/
.purty .face { opacity: 0.5; }
.purty .face.faceFront { background-color: #FFF; }
.purty .face.faceUp    { background-color: #F60; }
.purty .face.faceRight { background-color: #00D; }
.purty .face.faceDown  { background-color: #F00; }
.purty .face.faceLeft  { background-color: #0A0; }
.purty .face.faceBack  { background-color: #FE0; }
/*.purty .face.faceFront { background-color: #CCC; }
.purty .face.faceUp    { background-color: #C30; }
.purty .face.faceRight { background-color: #00A; }
.purty .face.faceDown  { background-color: #C00; }
.purty .face.faceLeft  { background-color: #070; }
.purty .face.faceBack  { background-color: #CB0; }*/






    /****************************/
   /*                          */
  /*   Cubelet Face Content   */
 /*                          */
/****************************/


/*

	WIREFRAMES

	Oddly, we cannot use borders to make our wireframes
	because this will cause a visible oscillation as CSS
	struggles to decide what gets drawn on top.
	Instead we use specially crafted box-shadows.

*/
.wireframe {

	box-sizing: border-box;
	display: none;
	position: absolute;
	width:  100%;
	height: 100%;
	border: 1px solid #FFF;
	background-color: rgba( 255, 255, 255, 0.05 );
}


/*

	STICKERS

	About what you'd expect. The default color here
	is full on bright purple (which does not exist 
	on an actual Rubik's Cube) so that one can see 
	quickly if something's gone wrong with stickers.

*/
.sticker {

	position: absolute;
	margin: 10px 0 0 10px;
	width:  120px;
	height: 120px;
	background-color: #F0F;
	border-radius: 12px;
	text-align: center;
}
.stickerLogo {

	background-image: url( "../media/rubiksLogoClassic.png" );	
	background-size: 120px 120px;
	background-repeat: none;
}


/*

	CUBELET IDs

	Each Cubelet has a unique ID number from 0 to 26.
	We display these mostly for debugging purposes
	as the end user probably doesn't care and/or would
	find this superfluous info confusing.

*/
.id {

	display: none;
	position: absolute;
	z-index: 1000;
	width:  100%;
	height: 100%;
	font-size:   30px;
	line-height: 135px;
	text-align: center;
	color: #000;
}
.id .underline {

	border-bottom: 1px solid #000;
}
/*

	We want ID numbers displayed on introverted faces to be white,
	but why use #FEFEFE instead of #FFF?
	So we can export as PDF, open up in Adobe Illustrator, select "Same Fill Color" 
	and it will exclude our #FFF text nodes!

*/
.faceIntroverted .id {

	color: #FEFEFE;
}
.faceIntroverted .id .underline {

	border-bottom: 1px solid #FEFEFE;
}


/*
	
	TEXT

	Formerly referred to as "Hero Text", this is the one-character
	display for a Cubelet face.

*/
.text {

	display: none;
	position: absolute;
	z-index: 2000;
	width:  100%;
	height: 100%;
	text-align: center;
	color: #FFF;
	font-family: "RubikExtended", sans-serif;
	font-size:   150px;
	line-height: 170px;
}






    /****************/
   /*              */
  /*   Messages   */
 /*              */
/****************/


#twist {

	position: absolute;
	width: 100%;
	text-align: center;
	font-size:   240px;
	line-height: 240px;
	color: rgba( 255, 255, 255, 0.4 );
	text-shadow: 0 0 12px rgba( 255, 255, 255, 0.5 );
	font-weight: bold;
	visibility: hidden;
}
.twister {
	
	display: none;
	width:  180px;
	height: 180px;
	border: 2px solid rgba( 255, 255, 255, 0.3 );
	background-color: rgba( 255, 255, 255, 0.3 );
	text-align: center;
	vertical-align: middle;
	color: rgba( 255, 255, 255, 0.1 );
	text-decoration: none;
	font-weight: bold;
	font-size: 64px;
	line-height: 100px;
	overflow: hidden;	
}
.twister:hover {

	box-shadow: 0px 0px 18px rgba( 255, 255, 255, 0.8 );
	border: 2px solid rgb( 255, 255, 255 );
	background-color: rgba( 255, 255, 255, 0.7 );
	color: #FFF;
	text-shadow: 0px 0px 6px rgba( 255, 255, 255, 0.5 );
}
#captions {

	display: none;
	position: absolute;
	top: 15%;
	width:  100%;
	height: 100%;
	color: #FFF;
	text-shadow: 0 0 24px rgba( 0, 0, 0, 1 );
	font-family: "RubikExtended", sans-serif;
	font-size:   75px;
	line-height: 85px;
	text-transform: uppercase;
	text-align: center;
}






    /****************/
   /*              */
  /*   Controls   */
 /*              */
/****************/


#controls, #controlsOpen {
	
	position: absolute;
	top:   0;
	right: 0;
	width: 200px;	
	color: rgba( 255, 255, 255, 0.4 );
	overflow: auto;
}
#controlsClose {

	position: absolute;
	top: 20px;
	right: 10px;
}
#controls {

	height: 100%;
}
#controls {

	display: none;
	height: 100%;
	background-color: rgba( 255, 255, 255, 0.9 );
	color: rgba( 0, 0, 0, 0.5 );
}
#controls .pad, #controlsOpen .pad {

	padding: 20px 5px 20px 20px;
}
#controls h2 {

	margin: 20px 0 5px 0;
	color: rgba( 0, 0, 0, 0.9 );
}
#controls a {

	color: rgba( 0, 0, 0, 0.5 );
	text-decoration: none;
	border: none;
}
#controls a:hover {

	border: none;
	background-color: #FFF;
	color: rgba( 0, 0, 0, 0.9 );
}
#controlsOpen a {

	display: block;
	padding-bottom: 20px;
	color: rgba( 255, 255, 255, 0.4 );
	text-decoration: none;
	border: none;
}
#controlsOpen a:hover {

	color: #FFF;
}
#controls input {

	border: 0;
	background-color: rgba( 0, 0, 0, 0.15 );
	color: #FFF;
	font-family: "Courier New", Courier, monospace;
}
#controls label:hover input, #controls input:hover {

	border: 0;
	background-color: rgba( 0, 0, 0, 0.3 );
	color: #FFF;
}
#controls input:focus {

	outline: none;
	background-color: rgba( 0, 0, 0, 0.5 );
}
#backgroundColor input, #camera input {

	width: 120px;
}
#camera input {

	margin-left: 5px;
}
#camera input {

	width: 40px;
	text-align: right;
}
#camera label, #cubePosition label, #cubeRotation label, #cubeRotationDelta label {

	display: block;
}
#cubePosition input, #cubeRotation input, #cubeRotationDelta input, #partialRots input {

	margin-left: 5px;
	width: 50px;
	text-align: right;
}
#cubeRotation input, #cubeRotationDelta input {

	width: 90px;
}
#cubeTwistDuration input {

	width: 40px;
	text-align: right;
}
#attributes label, #actions label {

	display: block;
}
#attributes label:hover, #actions label:hover {

	background-color: #FFF;
	color: rgba( 0, 0, 0, 0.9 );
	cursor: pointer;
}
#attributes input, #actions input {

	margin-right: 10px;
}
#actions a, #presets a {

	display: block;
	padding: 1px 0 1px 0;
}
#controls .key, #controls .key:hover {
	
	display: inline-block;
	margin-right: 4px;
	width:  20px;
	height: 20px;
	border: 1px solid rgba( 0, 0, 0, 0.2 );
	border-radius: 2px;	
	/*padding: 2px 4px 2px 4px;	*/
	text-align: center;
	/*font-family: 'Courier New', Courier, monospace;*/
	font-weight: bold;
	color: rgba( 0, 0, 0, 0.8 );
}
.key+.key {

	margin-right: 5px;
}
.keyBundle {

	margin-top: 12px;
}
#commands {

	line-height: 24px;
}
textarea#texts {

	font-family: "RubikExtended";
	font-size: 24px;
}




</style>