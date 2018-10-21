var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
/*自动调整大小*/
autoSetCanvasSize(yyy);

/*监听鼠标*/
listenTouser(yyy);

var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
pen.onclick = function () {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}

red.onclick = function(){
    context.fillStyle = 'red'
    context.strokeStyle = 'red';
    red.classList.add('active')
    yellow.classList.remove('active')
    blue.classList.remove('active')
}
yellow.onclick = function(){
    context.fillStyle = 'yellow'
    context.strokeStyle = 'yellow';
    yellow.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
}
blue.onclick = function(){
    context.fillStyle = 'blue'
    context.strokeStyle = 'blue';
    blue.classList.add('active')
    red.classList.remove('active')
    yellow.classList.remove('active')
}

/*****************/

function autoSetCanvasSize(canvas) {
    aaa();
    window.onresize = function () {
        aaa();
    };

    function aaa() {
        var pw = document.documentElement.clientWidth;
        var ph = document.documentElement.clientHeight;

        canvas.width = pw;
        canvas.height = ph;
    }
}

function drawCircle(x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();

}
function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1) // 起点
    context.lineWidth = 5
    context.lineTo(x2, y2) // 终点
    context.stroke()
    context.closePath()
}
function listenTouser(canvas) {
if (document.body.ontouchstart !== undefined) {
    var using = false
    var lastPoint = { x: undefined, y: undefined }

    canvas.ontouchstart = function (aaa) {
        //console.log(aaa)
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY
        using = true
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            lastPoint = { "x": x, "y": y }
        }
    }
    canvas.ontouchmove = function (aaa) {
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY

        if (!using) { return }

        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            var newPoint = { "x": x, "y": y }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
        }
    }
    canvas.ontouchend = function (aaa) {
        using = false
    }

} else {
    
        var using = false
        var lastPoint = { x: undefined, y: undefined }

        canvas.onmousedown = function (aaa) {
            //console.log(aaa)
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { "x": x, "y": y }
            }
        }
        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY

            if (!using) { return }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = { "x": x, "y": y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.onmouseup = function (aaa) {
            using = false
        }
    }

}