var angle = -Math.PI / 2;

var canvas;
var thickness = 10;
var startAngle = -Math.PI / 2;
var interval;
var mins = 25;
var timeDone = 0;
$(document).ready(function(){
    canvas = document.getElementById('canvas-circle');
    var windowWidth = window.innerWidth;
    var widthAndHeight = (windowWidth  * 0.2);
    $('#canvas-circle').attr("width", widthAndHeight);
    $('#canvas-circle').attr("height", widthAndHeight);

    $('#addminsbtn').click(function(){
        if(mins + 1 < 100){
            mins += 1;
            UpdatePrevText();
        }
    });
    $('#minusminsbtn').click(function(){
        if(mins - 1 > 0){
            mins -= 1;
            UpdatePrevText();
        }
    });
    $('#startbtn').click(function(){
        $('#timer-text').css('display', 'block');
        $('#timer-set').css('display', 'none');
        $('#circle-text').html(mins);
        if(mins > 1){
            $('#circle-text-unit').html("MINUTES");
        }
        else{
            $('#circle-text-unit').html("MINUTE");
        }
        interval = setInterval(Draw, 10);
    });
    $('#resetbtn').click(function(){

        clearInterval(interval);
        $('#timer-set').css('display', 'block');
        $('#timer-text').css('display', 'none');
        mins = 25;
        timeDone = 0;
        angle = -Math.PI / 2;
        UpdatePrevText();
        canvas.getContext("2d").clearRect(0,0, canvas.offsetWidth, canvas.offsetHeight);

    })
    //Draw(c, 5, -Math.PI / 2, Math.PI * 1.5);
});

function UpdatePrevText(){
    $('#timer-text-prev').html(mins.toString());
}

window.onresize = function(e){

    var windowWidth = window.innerWidth;
    var widthAndHeight = (windowWidth  * 0.2);
    $('#canvas-circle').attr("width", widthAndHeight);
    $('#canvas-circle').attr("height", widthAndHeight);
    if(timeDone > 0){
        Draw();
    }
}



function Draw(){
    timeDone += 0.01;
    var endAngle = angle;
    var context = canvas.getContext("2d");
    context.strokeStyle="#FF0000";
    context.clearRect(0,0, canvas.offsetWidth, canvas.offsetHeight);
    context.lineWidth = thickness;
    //while(thickness_ >= 0){
        context.beginPath();
        context.arc(canvas.offsetWidth / 2,canvas.offsetHeight / 2, (canvas.offsetWidth / 2) - (thickness / 2) - 1,startAngle, endAngle);
        context.stroke();
        context.closePath();
    //}
    if(angle >= Math.PI * 1.5){
        clearInterval(interval);
        var audio = new Audio('bleep.mp3');
        audio.play();
    }
    else{
        angle = (timeDone / (mins * 60)) * Math.PI * 2 - Math.PI / 2;
    }
    var timeRemaining = mins * 60 - timeDone;
    if(timeRemaining < 100){
        $('#circle-text-unit').html("SECONDS");
        $('#circle-text').html(Math.ceil(timeRemaining));
    }
    else{
        $('#circle-text-unit').html("MINUTES");
        $('#circle-text').html(Math.ceil(timeRemaining / 60));
    }


}
