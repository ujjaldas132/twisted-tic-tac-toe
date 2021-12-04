// <!-- 
// @Author : Ujjal Das
// github: ujjaldas132
// -->


var N_SIZE=5,EMPTY='&nbsp;',boxes=[],turn='1',score,moves;
var gameEnd=false;
var array;
var rowMap={};
var colMap={};

var cellSize=285;
var winningMoves=N_SIZE;



if(window.screen.width>780){
var screenWidth = window.screen.width;
cellSize=0.55*(screenWidth/N_SIZE);}

console.log(screenWidth);

function boxup(){
	if(N_SIZE<8){
	N_SIZE++;
	winningMoves=N_SIZE;
	document.getElementById('board').remove();
	// location.reload();
	init();}
}
function boxdown(){
	if(N_SIZE>3){
	N_SIZE--;
	winningMoves=N_SIZE;
	document.getElementById('board').remove();
	init();}else{
		alert('the game can not be played below N=3')
	}
}





// make the board and start

function init(){
	boxes=[];

	array=new Array(N_SIZE);
	for(var i=0;i<N_SIZE;i++){
		var tmat= new Array(N_SIZE);
		// for(var k ;k<N_SIZE;k++)
		// 	tmat[k]=-1;
		array[i]=tmat;
	}
	for(var i=0;i<N_SIZE;i++){
		for(var j=0;j<N_SIZE;j++){
			array[i][j]=-1;
		}
	}
	console.log(array);

	var board=document.createElement('table');//create table 
	board.id='board';
	board.setAttribute('border',1);
	board.setAttribute('cellspacing',0);


	var identifier =1;
	var cellNum = 0;

	for(var i=0;i<N_SIZE;i++){
		var row=document.createElement('tr');
		board.appendChild(row);
		// cell.setAttribute('height',N_SIZE*120);
		// cell.setAttribute('width',N_SIZE*120);

		for(var j=0;j<N_SIZE;j++){
			var cell=document.createElement('td');
			
			cell.setAttribute('height',3*cellSize/(N_SIZE));
			cell.setAttribute('width',3*cellSize/(N_SIZE));
			cell.setAttribute('align','center');
			cell.setAttribute('valign','center');
		// 	if(cellNum %2==0) {
		// 	cell.style.backgroundColor= "LightGray";
		// } else {
		// 	cell.style.backgroundColor= "DarkGray";
		// }
		cellNum++;

			
			cell.classList.add('col'+j,'row'+i);// learn
			if(i==j){
				cell.classList.add('diagonal0');
			}
			if(j==N_SIZE-i-1){
				cell.classList.add('diagonal1');
			}

			cell.identifier=identifier;//know 

			// cell.addEventListener('click',set);
			row.appendChild(cell);
			boxes.push(cell);
			identifier+=identifier;
			rowMap[cell]=i;
			colMap[cell]=j;
		}

	}
	document.getElementById('tictactoe').appendChild(board);
	startNewGame();

}


// new game

function startNewGame(){
	gameEnd=false;

	for(var i=0;i<N_SIZE;i++){
		for(var j=0;j<N_SIZE;j++){
			array[i][j]=-1;
		}
	}


	if(N_SIZE>5){
		winningMoves=5;
	}

	score ={
		'1':0,'2':0,'3':0

	};

	moves=0;
	turn='1';
	boxes.forEach(function (square){// learn
		square.innerHTML=EMPTY;
	})
		boxes.forEach(function (square){// learn
		square.addEventListener('click',set);//clicking event is add
	})
	// document.getElementById('turn').textContent='Player '+turn;
	document.getElementById('turn').textContent='Your turn Player '+ turn;
}





// clicked node list
function contains(selector,text){
	var elements= document.querySelectorAll(selector);
	return [].filter.call(elements,function(element){
		return RegExp(text).test(element.textContent);
	});
}


// set when clicked as well change the turn

function set(){
	if(this.innerHTML !=EMPTY){
		console.log("already filled");
		return;
	}

	var row= parseInt(this.classList[1].substring(3,4));
	var col= parseInt(this.classList[0].substring(3,4));
	// var row=rowMap[this];
	// var col=colMap[this];
	console.log(row);
	console.log(col);
	// var row=parseInt(rowStr.substr(3,4));
	// var col=parseInt(colStr.substr(3,4));
	if(turn=='1'){
		array[row][col]=1;
		// this.style.backgroundColor= "green";
	}else if(turn=='2'){
		array[row][col]=2;
		// this.style.backgroundColor= "lightyellow";
	} else {
		array[row][col]=3;
		// this.style.backgroundColor= "lightblue";
	}
	console.log(array);

	// console.log(checkWin(turn,row,col));
	this.innerHTML=turn;
	moves +=1;
	score[turn]+=this.identifier;


var winner = isThereAWinner(turn, row, col);
console.log("Winner " + winner);
if(winner != '-1') {
	console.log('Player '+ winner + " Win the game");
	document.getElementById('turn').textContent='Player '+ winner + " win the game";
	gameEnd=true;
		// document.getElementById('turn').textContent='Player '+turn+' is the WINNER';
		boxes.forEach(function (square){// learn
		square.removeEventListener('click',set);//clicking event is removed
	})
} else {


// Next turn
if(turn=='1'){
		turn='2';
	}else if(turn=='2'){
		turn='3';
	} else if(turn=='3'){
		turn='1';
	}

	document.getElementById('turn').textContent='Your turn Player '+ turn;
}

}




/**

**/

function isThereAWinner(turn, row, col) {

// 1 can use marker 1 and 2
// 2 can use marker 2 and 3
// 3 can use marker 3 and 1

markersMap = {
	'1':['1','2'],
	'2':['2','3'],
	'3':['3','1']

};

if(checkWinner(markersMap[turn][0],markersMap[turn][1],row, col)){
	console.log("Marker is the winner");
	return turn;
}

if(turn != '1' && checkWinner('1','2',row, col)){
	console.log("Player 1 is the winner");
	return '1';
}
if(turn != '2' && checkWinner('3','2',row, col)){
	console.log("Player 2 is the winner");
	return '2';
}
if(turn != '3' && checkWinner('1','3',row, col)){
	console.log("Player 3 is the winner");
	return '3';
}

return '-1';

}



/**

**/

function checkWinner(marker1, marker2, row, col) {
var count = 0;
for(var startingPoint =0; startingPoint<2;startingPoint++){
for (var i = startingPoint;i<5;i++){
	if(array[i][col] == marker1 || array[i][col]==marker2){
		count++;
	} else {
		count = 0;
	}
	if(count == 4){
		return true;
	}
}
}
var count = 0;
for(var startingPoint =0; startingPoint<2;startingPoint++){
for (var i = startingPoint;i<5;i++){
	if(array[row][i] == marker1 || array[row][i]==marker2){
		count++;
	}else {
		count = 0;
	}
	if(count == 4){
		return true;
	}
}
}

// Diagonal 1
var dRow = row - Math.min(row, col);
var dCol = col - Math.min(row, col);

for(var startingPoint =0; startingPoint<2;startingPoint++){
	var count = 0;
for(var i =startingPoint; dRow+i<5 && dCol+i<5;i++){
	if(array[dRow+i][dCol+i] == marker1 || array[dRow+i][dCol+i]==marker2){
		count++;
	}else {
		count = 0;
	}
	if(count == 4){
		return true;
	}

}
}

// Diagonal 2
var dRow = row - Math.max(row, col)+4;
var dCol = col + Math.max(row, col)-4;
if (dRow > 4 || dCol < 0 ){
	dRow = row;
	dCol = col;
}
console.log(row + " dRow "+ dRow);
console.log(col + " dCol"+ dCol);

for(var startingPoint =0; startingPoint<2;startingPoint++){
	var count = 0;
for(var i =startingPoint; dRow-i>=0 && dCol+i<5;i++){
	if(array[dRow-i][dCol+i] == marker1 || array[dRow-i][dCol+i]==marker2){
		count++;
	}else {
		count = 0;
	}
	if(count == 4){
		return true;
	}

}
}


return false;

}



init();