/*global $*/
$(document).ready(function () {
    'use strict';
    var once = false,
        elem;
    
    $(".menu > li").click(function () {
        elem = ($(this).data('value'));
        
        $(this).addClass("li-active").siblings().removeClass('li-active');
        if ($(this).is(":first-child")) {
            $(".menu-wrap").removeClass("menu-active");
            $("#" + elem).removeClass("home-active").siblings().removeClass('page-active');
        } else {
            $(".menu-wrap").addClass("menu-active");
            $("#home").addClass("home-active");
            
            $("#" + elem).addClass("page-active").siblings().removeClass('page-active');
            if (elem === "skills" && once === false) {
                if ($(document).width() >= 992) {
                    setTimeout(function() {draw('progress1', '#08AEAC', 92, 'HTML5')}, 500);
                    setTimeout(function() {draw('progress2', '#021533', 90, 'CSS3')}, 500);
                    setTimeout(function() {draw('progress3', '#D9212A', 70, 'JQuery')}, 500);
                    once = true;
                }
                
            }
        }
    });
    
    $(window).scroll(function () {
        if ($(document).width() < 992) {
            var docViewTop = $(window).scrollTop();
            var elemTop = $("#skills").offset().top;

            if ((elemTop <= docViewTop) && once === false) {
                draw('progress1', '#08AEAC', 92, 'HTML5');
                draw('progress2', '#021533', 90, 'CSS3');
                draw('progress3', '#D9212A', 70, 'JQuery');
                once = true;
            }
        }
    });
    

    $('.page-inner').perfectScrollbar();

    $('.carousel').carousel({
        interval: 1000
    });
});

    
function draw(id, color, prec, text) {
    'use strict';
    var ctx = document.getElementById(id).getContext('2d'),
        al  = 0,
        start = 4.72,
        cw  = ctx.canvas.width,
        ch  = ctx.canvas.height,
        diff,
        sim;
    
    function progressSim() {
        diff = ((al / 100) * Math.PI * 2 * 10).toFixed(2);
        ctx.clearRect(0, 0, cw, ch);
        ctx.lineWidth = 12;
        ctx.fillStyle = color;
        ctx.strokeStyle = '#ddd';
        ctx.textAlign = 'center';
        ctx.font = '14px Arial';
        ctx.fillText(al + '%', cw * 0.5, ch * 0.47 + 2, cw);
        ctx.fillText(text, cw * 0.5, ch * 0.63 + 2, cw);
        ctx.beginPath();
        ctx.arc(60, 60, 50, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(60, 60, 50, start, diff / 10 + start, false);
        ctx.stroke();
        if (al >= prec) {
            clearTimeout(sim);
        }
        al++;
    }
    sim = setInterval(progressSim, 30);
}
