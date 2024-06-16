var p1 = prompt("Player One[Blue] Enter Your Name");
var p1col = 'rgb(86, 151, 255)';
var p2=prompt("Player Two[Red] Enter Your Name");
while(p2==p1){ 
	alert("Similar names for both players not allowed!")
	var p2 = prompt("Player Two[Red] Enter Your Name");
}
var p2col = 'rgb(237, 45, 73)';

var game_on = true;

var table = $('table tr');



function reportWin(rowNum,colNum){
	console.log("Wining player at row,col" + rowNum + " " + colNum)
}

function changeColor(rowInd,colInd,color){
	return table.eq(rowInd).find('td').eq(colInd).find('button').css('background-color',color)
}

function giveColor(rowInd,colInd){
	return table.eq(rowInd).find('td').eq(colInd).find('button').css('background-color')
}

function highLight(rowInd,colInd){
	return table.eq(rowInd).find('td').eq(colInd).find('button').css({'border': '4px solid #dadada','box-shadow': '0px 0px 32px #4195fc'})
}

function checkBottom(colInd){
	var curr_color = giveColor(5,colInd) //checking color starting from bottom row
	for (var row = 5; row>= 0; row--) {
		if(giveColor(row,colInd) === 'rgb(0, 128, 0)' ){
			return row
		}
	}
	return -1
}

function colorMatchCheck(one,two,three,four){
	return(one === two && one === three && one === four && one !== 'rgb(0, 128, 0)' && one!== undefined)
}

//hori wins

function horizontaWin() {
	for (var row = 0; row <= 5; row++) {
		for(var col=0;col<=4;col++){
			if(colorMatchCheck(giveColor(row,col),giveColor(row,col+1),giveColor(row,col+2),giveColor(row,col+3))){
				for (var i = 3; i >= 0; i--) {
					highLight(row,col+i)
				}
				console.log('hori win')
				reportWin(row,col)
				return true
			}
			else{
				continue;
			}
		}
	}
	return false
}

//vert win
function vertaWin() {
	for (var col = 0; col <= 6; col++) {
		for(var row=0;row<=2;row++){
			if(colorMatchCheck(giveColor(row,col),giveColor(row+1,col),giveColor(row+2,col),giveColor(row+3,col))){
				for (var i = 3; i >= 0; i--) {
					highLight(row+i,col)
				}
				console.log('vert win')
				reportWin(row,col)
				return true
			}
			else{
				continue;
			}
		}
	}
	return false
}

//diag win left to right

function diagonWin(){
	for (var row =0; row <= 2; row++) {
	 	for (var col =0; col <= 6; col++) {
	 		var negtv_slp_flg = col-3>=0
	 		var postv_slp_flg = col+3<=6
	 		if(negtv_slp_flg && colorMatchCheck(giveColor(row,col),giveColor(row+1,col-1),giveColor(row+2,col-2),giveColor(row+3,col-3))){
	 			for (var i = 3; i >= 0; i--) {
					highLight(row+i,col-i)
				}
	 			console.log('diag negtv win')
				reportWin(row,col)
				return true
	 		}
	 		else if(postv_slp_flg && colorMatchCheck(giveColor(row,col),giveColor(row+1,col+1),giveColor(row+2,col+2),giveColor(row+3,col+3))){
	 			for (var i = 3; i >= 0; i--) {
					highLight(row+i,col+i)
				}
	 			console.log('diag postv win')
				reportWin(row,col)
				return true
	 		}
	 		else{
	 			continue;
	 		}
	 	}
	 } 
}
var plr_lst = ['dummy',p1,p2]
var col_lst = ['dummy',p1col,p2col]
var swtch_list = [0,1,-1]
var curr_plyr = 1;
var curr_nm = p1;
var curr_color = p1col;
var switch_flg = 1


$('h3').text(curr_nm + "'s turn pick your column to drop in!");


	$('.board button').on('click',function(){
		var col = $(this).closest('td').index();

		var bottomAvail = checkBottom(col)
		if(game_on){
			if (bottomAvail<0){
			alert("Lallu Laal Sahi Jagah daal")
			}
			else{
				changeColor(bottomAvail,col,curr_color)
				if(horizontaWin() || vertaWin() || diagonWin()){
					$('h2').html('<strong> ' + curr_nm +' ne baaji maar li!!</strong>').css({'color':'white','text-transform': 'capitalize'})
					$('h3').fadeOut('slow')
					game_on= false
				}
				else{
					curr_plyr = curr_plyr + switch_flg;
					switch_flg = swtch_list[curr_plyr]
					curr_nm = plr_lst[curr_plyr];
					curr_color = col_lst[curr_plyr];
					$('h3').text(curr_nm + "'s turn pick your column to drop in!");
				}
			}
		}else{
			alert("Chodd de bhai bachche ki jaan lega kya ab")
		}
	})





