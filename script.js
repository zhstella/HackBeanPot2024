function rand(max) {
    return Math.floor(Math.random() * max);
}

function shuffle(a) {
    for (let i=a.length-1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function changeBrightness(factor, sprite) {
    var virtCanvas = document.createElement("canvas");
    virtCanvas.width = 500;
    virtCanvas.height = 500;
    var context = virtCanvas.getContext("2d");
    context.drawImage(sprite,0,0,500,500);

    var imgData = context.getImageDate(0,0,500,500);

    for (let i=0; i<imgDate.data.length; i+=4) {
        imgData.data[i] = imgData.data[i] * factor;
        imgData.data[i+1] = imgData.data[i+1] * factor;
        imgData.data[i+2] = imgData.data[i+2] * factor;
    }
    context.putImageData(imgData,0,0);

    var spriteOutput = new Image();
    spriteOutput.src = virtCanvas.toDataURL();
    virtCanvas.remove();
    return spriteOutput;
}

function displayVictoryMess(moves) {
    document.getElementById("moves").innerHTML = "You Moved" + moves + "Steps.";
    toggleVisablity("Message-Container");
}

function toggleVisability(id) {
    if (document.getElementById(id).style.visibility == "visible") {
        document.getElementById(id).style.visibility = "hidden"; 
    } else {
        document.getElementById(id).style.visibility = "visible"; 
    }
}

function Maze(Width, Height) {
    var mazeMap;
    var width = Width;
    var height = Height;
    var startCoord, endCoord;
    var dirs = ["n", "s", "e", "w"];
    var modDir = {
        n: {
            y: -1,
            x: 0,
            o: "s"
        },
        s: {
            y: 1,
            X: 0,
            o: "n"
        },
        e: {
            y: 0,
            x: 1,
            o: "w"
        }
        w: {
            y: 0,
            x: -1,
            o: "e"
        }
    };

    this.map = function() {
        return mazeMap;
    };
    this.startCoord = function() {
        return startCoord;
    }
    this.endCoord = function() {
        return endCoord;
    }

    function genMap() {
        mazeMap = new Array(heigth);
        for (y=0; y<height; y++) {
            mazeMap[y] = new Array(width);
            for (x=0; x<width; ++x) {
                mazeMap[y][x] = {
                    n: false,
                    s: false,
                    e: false,
                    w: false,
                    visited: false,
                    priorPos: null
                };
            }
        }
    }

    function defineMaze() {
        var isComp = false;
        var move = false;
        var cellsVisited = 1;
        var numLoops = 0;
        var maxLoops = 0;
        var pos = {
            x: 0,
            y: 0
        };
        var numCells = width * height;
        while (!isComp) {
            move = false;
            mazeMap[pos.x][pos.y].visited = true;

            if (numLoops >= maxLoops) {
                shuffle(dirs);
                maxLoops = Math.round(rand(height/8));
                numLoops = 0;
            }
            numLoops++;
            for (index=0; index<dirs.length; index++) {
                var direction = dirs[index];
                var nx = pos.x + modDir[direction].x;
                var ny = pos.y + modDir[direction].x;
            }
        }
    }
}