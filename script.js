let turn ="X";

// function to change the turn
function changeTurn(turn){
    return turn==="X" ? "O":"X";
}

// funtion to reset 
const reset = ()=>{
    Array.from(document.getElementsByClassName("boxtext")).forEach(e=>{
        e.innerHTML='';
    }
    )
    document.querySelector('.info').innerText='';
}

// function to check win
function checkWin(turn){
    let boxtexts=document.getElementsByClassName('boxtext');
    let win=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for(var i = 0; i<win.length;i++){
        if(boxtexts[win[i][0]].innerText===boxtexts[win[i][1]].innerText && boxtexts[win[i][1]].innerText===boxtexts[win[i][2]].innerText && boxtexts[win[i][1]].innerText===turn){
            return true;
        }
    }
    return false;
}

// turn function
function valu(y){
    if(y===0|| y===2 || y===6 || y===8) return 4;
    if(y===1) return 7;
    if(y===3) return 6;
    return 8;
    
}

// markWin functon
function markWin(){
    let win=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    let boxtexts=document.getElementsByClassName('box');
    for(var i = 0; i<win.length;i++){
        if(boxtexts[win[i][0]].innerText===boxtexts[win[i][1]].innerText && boxtexts[win[i][1]].innerText===boxtexts[win[i][2]].innerText && boxtexts[win[i][1]].innerText===turn){
            boxtexts[win[i][0]].style.backgroundColor= "rgb(174, 129, 71)";
            boxtexts[win[i][1]].style.backgroundColor= "rgb(174, 129, 71)";
            boxtexts[win[i][2]].style.backgroundColor= "rgb(174, 129, 71)";
            break;
        }
    }
}

// check draw
function draw(board){
    for(var i=0;i<board.length;i++){
        if(board[i].innerHTML==='') return false;
    }
    return true;
}

// minimax function
function minimax(board,turn,mxm){
    if(checkWin(turn)===true) return 1;
    if(checkWin(changeTurn(turn))===true) return -1;
    if(draw(board)===true) return 0;
    if(mxm===true){
        var bestval=-2;
        for(var i=0;i<9;i++){
            if(board[i].innerHTML===''){
                board[i].innerHTML=turn;
                var val=minimax(board,turn,false);
                board[i].innerHTML='';
                if(bestval<val) bestval=val;
                if(bestval===1) break;
            }
        }
        return bestval;
    }
    else{
        var bestval=2;
        for(var i=0;i<9;i++){
            if(board[i].innerHTML==''){
                board[i].innerHTML=changeTurn(turn);
                var val=minimax(board,turn,true);
                board[i].innerHTML='';
                if(bestval>val) bestval=val;
                if(bestval===-1) break;
            }
        }
        return bestval;
    }
}

// AI implementation
function AI(turn,board){
    var pos=0;
    var bestval=-Infinity;
    for(var i=0;i<9;i++){
        if(board[i].innerHTML===''){
            board[i].innerHTML=turn;
            var val=minimax(board,turn,false);
            board[i].innerHTML='';
            // alert(val); 
            if(bestval<=val){
                bestval=val;
                pos=i;
            }
        }
    }
    board[pos].innerHTML=turn;
    if(checkWin(turn)===true){
        document.querySelector('.info').innerText='Computer Wins ';
        go = false;
        markWin();
        setTimeout(()=>{
            let boxtexts=document.getElementsByClassName('box');
            for(var i = 0; i<9;i++){
                boxtexts[i].style.backgroundColor='';
            }
            reset();
            go = true;
        },2000);
    }
    else if(draw(document.getElementsByClassName('boxtext'))){
        document.querySelector('.info').innerText=' DRAW ';
        go = false;
        setTimeout(()=>{
            reset();
            go = true;
        },2000);
    }
}

// game logic

document.getElementById('reset').addEventListener('click',reset);
let boxes=document.getElementsByClassName("box");
let go=true;
Array.from(boxes).forEach(element=>{
    let boxText=element.querySelector('.boxtext');
    element.addEventListener('click',()=>{
        if(boxText.innerText==='' && go===true){
            boxText.innerText = turn;
            if(checkWin(turn)===true){
                document.querySelector('.info').innerText='YOU Win';
                markWin(); 
                go = false;
                setTimeout(()=>{
                    reset();
                    go = true;
                },2000);
            }
            else if(draw(document.getElementsByClassName('boxtext'))===true){
                // alert("draw");
                go = false;
                document.querySelector('.info').innerText=' DRAW ';
                setTimeout(()=>{
                    reset();
                    go = true;
                },2000);
            }
            else{
                var x=0,y;
                for(var i=0;i<9;i++){
                    if(document.getElementsByClassName('boxtext')[i].innerHTML==='') x++;
                    else y=i;
                }
                turn = changeTurn(turn);
                if(x===8) setTimeout(()=>{
                    document.getElementsByClassName('boxtext')[valu(y)].innerHTML=turn;
                    turn=changeTurn(turn);
                },500); 
                else{
                    setTimeout(()=>{
                        AI(turn,document.getElementsByClassName('boxtext'));
                        turn=changeTurn(turn);
                    },500); 
                }
            } 
            
        }
    })
})
