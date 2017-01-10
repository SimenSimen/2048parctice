var para = document.getElementsByClassName('center');
function start () {
	//game start , random 2 on two position
	para[Math.floor(Math.random()*8)].innerHTML = 2;
	para[Math.floor(Math.random()*8 + 8 )].innerHTML = 2;
}
function numfloat (para) {
	//first step of movement:Float
	for (var i = 16; i >= 1; i--) {
		for (var j = i-1; j >= 0; j--) {
		    if (i >= 13) {if (j === 11) { break ;}}
		    if (i >= 9) {if (j === 7) { break ;}}
		    if (i >= 5) {if (j === 3) { break ;}}
			if ( Number(para[j].innerHTML) !== 0) { 
				para[i-1].innerHTML = para[j].innerHTML;
				if((i-1)!==j){
					para[j].innerHTML = "";
				}	
				break;
			}
		}
	}
}
function numPlus (para) {
	//second step of movement : Plus
	for (var i = 4; i >= 1 ; i--) {
		for (var j = 4*i-1 ; j >= 1 ; j--) {
			if (i === 4) {if (j === 12) { break ;}}
		    if (i === 3) {if (j === 8) { break ;}}
		    if (i === 2) {if (j === 4) { break ;}}
			if ( para[j].innerHTML === para[j-1].innerHTML && Number(para[j].innerHTML)!==0) {
	 			para[j].innerHTML = Number(para[j].innerHTML)+Number(para[j-1].innerHTML);
	 			para[j-1].innerHTML ="";		
			} 
			numfloat(para);
		}
	}		
}
function moveUp () {
	let paraU = [para[12],para[8],para[4],para[0],para[13],para[9],para[5],para[1],para[14],para[10],para[6],para[2],para[15],para[11],para[7],para[3]];
	numfloat(paraU);
	numPlus(paraU);
}
function moveDown () {
	let paraD = [para[3],para[7],para[11],para[15],para[2],para[6],para[10],para[14],para[1],para[5],para[9],para[13],para[0],para[4],para[8],para[12]];
	numfloat(paraD);
	numPlus(paraD);
}
function moveLeft () {
	let paraL = [para[3],para[2],para[1],para[0],para[7],para[6],para[5],para[4],para[11],para[10],para[9],para[8],para[15],para[14],para[13],para[12]];
	numfloat(paraL);
	numPlus(paraL);
}
function moveRight () {
	numfloat(para);
	numPlus(para);
}
//find the empty place 
function spaceArr() {
	let space = [];
	for (var i = 0; i < para.length; i++) {
		if ( para[i].innerHTML === "") {
			space.push(i);
		}
	}
	return space;
}
//randomAdd num after moving
function randomAdd (lastSpace) {
	let space = spaceArr();
	let check ;
	if (space.length === lastSpace.length && space.length > 0) {
		for (var i = 0; i < lastSpace.length; i++) {
			if(lastSpace[i] !== space[i]){
				break ;
			}
			check = i+1 ;
		}
	}
	if (space.length > 0 && check !== lastSpace.length) {
		if (Math.random() > 0.1) {
			para[space[Math.floor(Math.random()*space.length)]].innerHTML = 2 ;
		}
		else {
			para[space[Math.floor(Math.random()*space.length)]].innerHTML = 4 ;
		}
		
	}	
}
window.addEventListener("keydown", function(event){
	let status = new Array ; 
	if (event.key === "d" || event.key === "ArrowRight") {
		status = spaceArr();
		moveRight();
		randomAdd(status);
	}
	if (event.key === "s" || event.key === "ArrowDown") {
		status = spaceArr();
		moveDown();
		randomAdd(status);
	}

	if (event.key === "a" || event.key === "ArrowLeft") {
		status = spaceArr();
		moveLeft();
		randomAdd(status);
	}

	if (event.key === "w" || event.key === "ArrowUp") {
		status = spaceArr();
		moveUp();
		randomAdd(status);
	}
}, true);