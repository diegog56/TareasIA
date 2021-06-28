const express = require('express')
const app = express()
const port = 3000

var black = 0
var white = 1
var empty = 2
var dim = 8

var heuristic = [
    [120, -20, 20,  5,  5, 20, -20, 120],
    [-20, -40, -5, -5, -5, -5, -40, -20],
    [ 20, - 5, 15,  3,  3, 15,  -5,  20],
    [  5,  -5,  3,  3,  3,  3,  -5,   5],
    [  5,  -5,  3,  3,  3,  3,  -5,   5],
    [ 20, - 5, 15,  3,  3, 15,  -5,  20],
    [-20, -40, -5, -5, -5, -5, -40, -20],
    [120, -20, 20,  5,  5, 20, -20, 120],
]

var moves = []

function cleanMoves(){
  let aux = new Set()
  for(let item of moves) aux.add(item.spot)
  moves = []
  for (let item of aux) moves.push({ spot:item, h:heuristic_board[parseInt(item.split('')[0])][parseInt(item.split('')[1])] })
  moves.sort((a,b)=>{ if(a.h>b.h) return -1; else return 1 })
}

function findMove(move,adversary,x,y,board){
  var x2=0,y2=0;
  if(move==0){
    x2=x;
    for(y2=y-1;y2>0;y2--){
      x2--
        if(board[y2][x2]==adversary && board[y2-1][x2-1]=='2'){
          return (y2-1)+''+(x2-1) 
        }
      
    }
  }else if(move==1){
    x2=x;
    for(y2=y-1;y2>0;y2--){
        if(board[y2][x2]==adversary && board[y2-1][x2]=='2'){
          return (y2-1)+''+x2 
        }
    }
  }else if(move==2){
    x2 =x;
    for(y2=y-1;y2>0;y2--){
      x2++
        if(board[y2][x2]==adversary && board[y2-1][x2+1]=='2'){
          return (y2-1)+''+(x2+1) 
        }
      
    }
  }else if(move==3){
    y2=y;
    for(x2=x+1;x2<7;x2++){
        if(board[y2][x2]==adversary && board[y2][x2+1]=='2'){
          return y2+''+(x2+1) 
        }
    }
  }else if(move==4){
    x2 = x;
    for(y2=y+1;y2<7;y2++){
      x2++
        if(board[y2][x2]==adversary && board[y2+1][x2+1]=='2'){
          return (y2+1)+''+(x2+1) 
        }
      
    }
  }else if(move==5){
    x2=x;
    for(y2=y+1;y2<7;y2++){
        if(board[y2][x2]==adversary && board[y2+1][x2]=='2'){
          return (y2+1)+''+x2 
        }
    }
  }else if(move==6){
    x2 = x;
    for(y2=y+1;y2<7;y2++){
      x2--
        if(board[y2][x2]==adversary && board[y2+1][x2-1]=='2'){
          return (y2+1)+''+(x2-1) 
        }
      
    }
  }else if(move==7){
    y2=y;
    for(x2=x-1;x2>0;x2--){
        if(board[y2][x2]==adversary && board[y2][x2-1]=='2'){
          return y2+''+(x2-1) 
        }
    }
  }
  return '-1'
}

function findSpots(turn){
  let rival = turn == '1'?'0':'1';
  let spot;
  for(let y = 0; y<8;y++){
    for(let x = 0; x<8; x++){
      if(og_board[y][x]==turn){
        if(y-1>0 && x-1 >0 && og_board[y-1][x-1]==rival){ // Arriba a la izq
           spot = findMove(0,rival,x,y,og_board) 
           if(spot!='-1')
           moves.push({spot:spot,h:heuristic_board[parseInt(spot.split('')[0])][parseInt(spot.split('')[1])]})
        } 
        if(y-1>0  && og_board[y-1][x]==rival){ // Arriba 
           spot = findMove(1,rival,x,y,og_board)
           if(spot!='-1')
            moves.push({spot:spot,h:heuristic_board[parseInt(spot.split('')[0])][parseInt(spot.split('')[1])]})
        } 
        if(y-1>0 && x+1 <7 && og_board[y-1][x+1]==rival){ // Arriba Derecha
          spot = findMove(2,rival,x,y,og_board) 
          if(spot!='-1')
          moves.push({spot:spot,h:heuristic_board[parseInt(spot.split('')[0])][parseInt(spot.split('')[1])]})
       }
       if( x+1 <7 && og_board[y][x+1]==rival){ // Derecha
         spot = findMove(3,rival,x,y,og_board) 
         if(spot!='-1')
         moves.push({spot:spot,h:heuristic_board[parseInt(spot.split('')[0])][parseInt(spot.split('')[1])]})
      }    
      if(y+1< 7 && x+1 <7 && og_board[y+1][x+1]==rival){ // Abajo Derecha
        spot = findMove(4,rival,x,y,og_board) 
        if(spot!='-1')
        moves.push({spot:spot,h:heuristic_board[parseInt(spot.split('')[0])][parseInt(spot.split('')[1])]})
     }         
     if(y+1< 7 && og_board[y+1][x]==rival){ // Abajo 
       spot = findMove(5,rival,x,y,og_board) 
       if(spot!='-1')
       moves.push({spot:spot,h:heuristic_board[parseInt(spot.split('')[0])][parseInt(spot.split('')[1])]})
    }   
    if(y+1< 7 && x-1 >0 && og_board[y+1][x-1]==rival){ // Abajo Izq
      spot = findMove(6,rival,x,y,og_board) 
      if(spot!='-1')
      moves.push({spot:spot,h:heuristic_board[parseInt(spot.split('')[0])][parseInt(spot.split('')[1])]})
   }      
   if(x-1 >0 && og_board[y][x-1]==rival){ // Izquierda
     spot = findMove(7,rival,x,y,og_board) 
     if(spot!='-1')
     moves.push({spot:spot,h:heuristic_board[parseInt(spot.split('')[0])][parseInt(spot.split('')[1])]})
  }   
      }
    }
  }
}

function fillBoard(estado){
  var y=0,x=0;
  if(estado!=undefined){
  for(let z = 0;z<estado.length;z++){
    og_board[y][x] = estado[z];
    x++;
    if(x==8){
      x=0;
      y++;
    }
  }
  }
}

app.get('/', (req, res) => {
  //variable reset
  moves = []
  adversary_moves = []


  var {turno,estado} = req.query;
  estado = estado?.split('')
  fillBoard(estado)
  findSpots(turno)
  console.log(moves)
  console.log("................")
  cleanMoves()
  console.log(moves)
  console.log(`El turno es: ${turno}`);
  console.log(`El spot es: ${moves[0].spot}`);
  res.send(moves[0].spot);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})