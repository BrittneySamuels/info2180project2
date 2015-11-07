// JavaScript File
window.onload = function(){
    
    var puzzlea= $$("div#puzzlearea div");
    var emptyspacetop;
    var emptyspaceleft;
    var moved = false;
    var l = 0;
    var t = 0;
    var picl =0;
    var pict = 0;
    
        for(var i = 0; i < puzzlea.length; i++){ // laying out puzzle.
            puzzlea[i].addClassName("puzzlepiece");
            
            
            puzzlea[i].style.left = l + "px";
            puzzlea[i].style.top = t + "px";
            
            puzzlea[i].style.backgroundPosition = picl+"px "+pict+"px"; // adding image.
            
            l +=100; 
            picl -=100;
            if ((i+1) %4 == 0){
                t += 100;
                pict -=100;
                l = 0;
                picl = 0;
            }
        }

    emptyspacetop = 300;
    emptyspaceleft = 300;
    
    
    for(var i = 0; i < puzzlea.length; i++){
        (
            function()
            {
                var index = i;
                puzzlea[i].addEventListener("click",function(){clickpiece(index);},false);
            }());
    }
    
    function clickpiece(i) { // function to move a piece when clicked.
        var puzzlet = parseInt(puzzlea[i].style.top.substring(0,3));
        var puzzlel = parseInt(puzzlea[i].style.left.substring(0,3));
        var diffl = 0;
        var difft = 0;
        var templ = 0;
        var tempt = 0;
        diffl = Math.abs(emptyspaceleft - puzzlel);
        difft = Math.abs(emptyspacetop - puzzlet);
        
        if (emptyspacetop == puzzlet || emptyspaceleft == puzzlel){
            if(diffl == 100 || difft == 100){
                
                tempt = puzzlet;
                templ = puzzlel;
                puzzlet = emptyspacetop;
                puzzlel = emptyspaceleft;
                
                puzzlea[i].style.top = emptyspacetop+"px";
                puzzlea[i].style.left = emptyspaceleft +"px";
                
                emptyspacetop = tempt;
                emptyspaceleft = templ;
                
                solved(i); 
                
                for(var i = 0; i < puzzlea.length; i++){
                    puzzlea[i].removeClassName("movablepiece");
                }
            }
        }
     }
     
     for(var i = 0; i < puzzlea.length; i++){
        (
            function()
            {
                var index = i;
                puzzlea[i].addEventListener("mouseover",function(){movable(index);},false);
            }());
    }
    
    function movable(i) { // function to check if a piece is movable.
        var puzzlet = parseInt(puzzlea[i].style.top.substring(0,3));
        var puzzlel = parseInt(puzzlea[i].style.left.substring(0,3));
        var diffl = 0;
        var difft = 0;
        
        diffl = Math.abs(emptyspaceleft - puzzlel);
        difft = Math.abs(emptyspacetop - puzzlet);
        
        if (emptyspacetop == puzzlet || emptyspaceleft == puzzlel){
            if(diffl == 100 || difft == 100){
                puzzlea[i].addClassName("movablepiece");
                return true;
            }
        }
     }
     
    $("shufflebutton").addEventListener("click",function(){shuffle();},false);
        
    function shuffle() { // function to shuffle pieces. 
        //var used = [];
        for(var m =0; m < 100; m++){
        var shufflea = [];
            for(var i = 0; i < puzzlea.length; i++){
                movable(i);
                if(movable(i) == true){
                    shufflea.push(i);
                }
            }
                
                var rand = shufflea[Math.floor(Math.random() * shufflea.length)];
                var tempet = parseInt(puzzlea[rand].style.top.substring(0,3));
                var tempel = parseInt(puzzlea[rand].style.left.substring(0,3));
                puzzlea[rand].style.top = emptyspacetop + "px";
                puzzlea[rand].style.left = emptyspaceleft + "px";
                emptyspaceleft = tempel;
                emptyspacetop = tempet;
                
        }        
    }   
    
    function solved(i){ // funtion to check if game is solved.
        
        l = 0;
        t =0 ;
        var win = true;
       for(var i = 0; i < puzzlea.length; i++){
            if(puzzlea[i].style.left != l + "px" || puzzlea[i].style.top != t + "px"){
                win = false;
                break;
            }
            l +=100;
            if ((i+1) %4 == 0){
                t += 100;
                
                l = 0;
                
            }
            
       }
       
       if(win == true){
           for(var i = 0; i < puzzlea.length; i++){ // if the game is won the image changes.
               $(puzzlea[i]).style.backgroundImage = "url('http://www.mrwallpaper.com/wallpapers/charlie-brown-snoopy-hug.jpg')";
               $(puzzlea[i]).style.backgroundSize = "400px 400px";
           }
       } 
       return win;
    }
};


                    
         