var mousePosition;
var offset = [0,0];
var isDown = false;
var puckpos;
var pucksize;
var boardsize;

mypuck = document.getElementById("puck");
cpos = document.getElementById("curpos");
board = document.getElementById("board");
style = window.getComputedStyle(mypuck);

puckpos = {
    left: style.getPropertyValue('left'),
    top: style.getPropertyValue('top')
}

pucksize = {
    width : window.getComputedStyle(mypuck).getPropertyValue("width"),
    height : window.getComputedStyle(mypuck).getPropertyValue("height")
}

boardsize = {
    width : parseInt(window.getComputedStyle(board).getPropertyValue("width")),
    height : parseInt(window.getComputedStyle(board).getPropertyValue("height"))
}

cpos.innerHTML = "Position Left: " + puckpos.left + " Top: " + puckpos.top;

mypuck.addEventListener('mousedown', function(e) {
    isDown = true;
    offset = [
        mypuck.offsetLeft - e.clientX,
        mypuck.offsetTop - e.clientY
    ];
}, true);

document.addEventListener('mouseup', function() {
    isDown = false;
}, true);

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
        mousePosition = {
    
            x : event.clientX,
            y : event.clientY
    
        };
        puckpos = {
            left : (mousePosition.x + offset[0]),
            top : (mousePosition.y + offset[1])
        }

        if (puckpos.left < 0 || mousePosition.x > 65000) {
            puckpos.left = 0;
        }
        if (puckpos.top < 0 || mousePosition.y < 0 || mousePosition.y > 65000) {
            puckpos.top = 0;
        }

        if (parseFloat(window.getComputedStyle(board).getPropertyValue("width")) != boardsize.width) {
            boardsize.width = parseInt(window.getComputedStyle(board).getPropertyValue("width"));
        }

        if (parseFloat(window.getComputedStyle(board).getPropertyValue("height")) != boardsize.height) {
            boardsize.height = parseInt(window.getComputedStyle(board).getPropertyValue("height"));
        }

        if (puckpos.left > (parseInt(boardsize.width) - parseInt(pucksize.width))) {
            puckpos.left = (parseInt(boardsize.width) - parseInt(pucksize.width));
        }

        if (puckpos.top > (parseInt(boardsize.height) - parseInt(pucksize.height))) {
            puckpos.top = (parseInt(boardsize.height) - parseInt(pucksize.height));
        }

        mypuck.style.left = puckpos.left + 'px';
        mypuck.style.top  = puckpos.top + 'px';
        cpos.innerHTML = "Position Left: " + mypuck.style.left + " Top: " + mypuck.style.top;
    }
}, true);