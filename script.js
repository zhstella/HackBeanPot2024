

function game() {
  const instruction = document.getElementById('instructions');
  instruction.style.display = "none";
}

function rand(max) {
    return Math.floor(Math.random() * max);
  }
  
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  
  function changeBrightness(factor, sprite) {
    var virtCanvas = document.createElement("canvas");
    virtCanvas.width = 500;
    virtCanvas.height = 500;
    var context = virtCanvas.getContext("2d");
    context.drawImage(sprite, 0, 0, 500, 500);
  
    var imgData = context.getImageData(0, 0, 500, 500);
  
    for (let i = 0; i < imgData.data.length; i += 4) {
      imgData.data[i] = imgData.data[i] * factor;
      imgData.data[i + 1] = imgData.data[i + 1] * factor;
      imgData.data[i + 2] = imgData.data[i + 2] * factor;
    }
    context.putImageData(imgData, 0, 0);
  
    var spriteOutput = new Image();
    spriteOutput.src = virtCanvas.toDataURL();
    virtCanvas.remove();
    return spriteOutput;
  }

//   function displayVictoryMess() {
//     // Record the end time when the user finishes the maze
//     var endTime = Date.now(); // or new Date().getTime() for compatibility
//     // Calculate elapsed time in milliseconds
//     var elapsedTime = endTime - startTime;
//     // Convert milliseconds to seconds for easier reading
//     var elapsedSeconds = elapsedTime / 1000;
//     // Display the victory message along with the elapsed time
//     alert("Congratulations! You finished the maze in " + elapsedSeconds + " seconds.");
//     // Your existing displayVictoryMess() code...
// }
  
  function displayVictoryMess(moves) {
    var endTime = Date.now(); // or new Date().getTime() for compatibility
    // Calculate elapsed time in milliseconds
    var elapsedTime = endTime - startTime;
    // Convert milliseconds to seconds for easier reading
    var elapsedSeconds = elapsedTime / 1000;
    toggleVisablity("Message-Container");  
    document.getElementById("moves").innerHTML = "You Moved " + moves + " Steps, and became a sustainability expert in " + elapsedSeconds + " seconds";

  }
  
  function toggleVisablity(id) {
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
        x: 0,
        o: "n"
      },
      e: {
        y: 0,
        x: 1,
        o: "w"
      },
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
    };
    this.endCoord = function() {
      return endCoord;
    };
  
    function genMap() {
      mazeMap = new Array(height);
      for (y = 0; y < height; y++) {
        mazeMap[y] = new Array(width);
        for (x = 0; x < width; ++x) {
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
          maxLoops = Math.round(rand(height / 8));
          numLoops = 0;
        }
        numLoops++;
        for (index = 0; index < dirs.length; index++) {
          var direction = dirs[index];
          var nx = pos.x + modDir[direction].x;
          var ny = pos.y + modDir[direction].y;
  
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            //Check if the tile is already visited
            if (!mazeMap[nx][ny].visited) {
              //Carve through walls from this tile to next
              mazeMap[pos.x][pos.y][direction] = true;
              mazeMap[nx][ny][modDir[direction].o] = true;
  
              //Set Currentcell as next cells Prior visited
              mazeMap[nx][ny].priorPos = pos;
              //Update Cell position to newly visited location
              pos = {
                x: nx,
                y: ny
              };
              cellsVisited++;
              //Recursively call this method on the next tile
              move = true;
              break;
            }
          }
        }
  
        if (!move) {
          //  If it failed to find a direction,
          //  move the current position back to the prior cell and Recall the method.
          pos = mazeMap[pos.x][pos.y].priorPos;
        }
        if (numCells == cellsVisited) {
          isComp = true;
        }
      }
    }
  
    function defineStartEnd() {
      switch (rand(4)) {
        case 0:
          startCoord = {
            x: 0,
            y: 0
          };
          endCoord = {
            x: height - 1,
            y: width - 1
          };
          break;
        case 1:
          startCoord = {
            x: 0,
            y: width - 1
          };
          endCoord = {
            x: height - 1,
            y: 0
          };
          break;
        case 2:
          startCoord = {
            x: height - 1,
            y: 0
          };
          endCoord = {
            x: 0,
            y: width - 1
          };
          break;
        case 3:
          startCoord = {
            x: height - 1,
            y: width - 1
          };
          endCoord = {
            x: 0,
            y: 0
          };
          break;
      }
    }
    
    function addTask() {
      for (let i = 0; i < 10; i++) {
        const taskPointX = rand(width);
        const taskPointY = rand(height);
        mazeMap[taskPointX][taskPointY].isTaskPoint = true;
      }
    }

    genMap();
    defineStartEnd();
    addTask();
    defineMaze();
  }
  
  function DrawMaze(Maze, ctx, cellsize, endSprite = null) {
    var map = Maze.map();
    var cellSize = cellsize;
    var drawEndMethod;
    ctx.lineWidth = cellSize / 40;
  
    this.redrawMaze = function(size) {
      cellSize = size;
      ctx.lineWidth = cellSize / 50;
      drawMap();
      drawEndMethod();
    };
  
    function drawCell(xCord, yCord, cell) {
      var x = xCord * cellSize;
      var y = yCord * cellSize;
  
      if (cell.n == false) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + cellSize, y);
        ctx.stroke();
      }
      if (cell.s === false) {
        ctx.beginPath();
        ctx.moveTo(x, y + cellSize);
        ctx.lineTo(x + cellSize, y + cellSize);
        ctx.stroke();
      }
      if (cell.e === false) {
        ctx.beginPath();
        ctx.moveTo(x + cellSize, y);
        ctx.lineTo(x + cellSize, y + cellSize);
        ctx.stroke();
      }
      if (cell.w === false) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + cellSize);
        ctx.stroke();
      }
      if (cell.isTaskPoint) {
        // // 如果是任务点，使用不同的颜色或图像表示
        // ctx.fillStyle = "red";  // 可以根据需要修改颜色
        // ctx.fillRect(x, y, cellSize, cellSize);
        let img = new Image();
        img.onload = function() {
          ctx.drawImage(img, x, y, cellSize, cellSize);
        };
        img.src = "/trash.png";
        // 消除任务点的垃圾图片
        // ctx.clearRect(x, y, cellSize, cellSize);
      }
    }
  
  
    function drawMap() {
      for (x = 0; x < map.length; x++) {
        for (y = 0; y < map[x].length; y++) {
          drawCell(x, y, map[x][y]);
        }
      }
    }
  
    function drawEndFlag() {
      var coord = Maze.endCoord();
      var gridSize = 4;
      var fraction = cellSize / gridSize - 2;
      var colorSwap = true;
      for (let y = 0; y < gridSize; y++) {
        if (gridSize % 2 == 0) {
          colorSwap = !colorSwap;
        }
        for (let x = 0; x < gridSize; x++) {
          ctx.beginPath();
          ctx.rect(
            coord.x * cellSize + x * fraction + 4.5,
            coord.y * cellSize + y * fraction + 4.5,
            fraction,
            fraction
          );
          if (colorSwap) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
          } else {
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
          }
          ctx.fill();
          colorSwap = !colorSwap;
        }
      }
    }
  
    function drawEndSprite() {
      var offsetLeft = cellSize / 50;
      var offsetRight = cellSize / 25;
      var coord = Maze.endCoord();
      ctx.drawImage(
        endSprite,
        2,
        2,
        endSprite.width,
        endSprite.height,
        coord.x * cellSize + offsetLeft,
        coord.y * cellSize + offsetLeft,
        cellSize - offsetRight,
        cellSize - offsetRight
      );
    }
  
    function clear() {
      var canvasSize = cellSize * map.length;
      ctx.clearRect(0, 0, canvasSize, canvasSize);
    }
  
    if (endSprite != null) {
      drawEndMethod = drawEndSprite;
    } else {
      drawEndMethod = drawEndFlag;
    }
    clear();
    drawMap();
    drawEndMethod();
  }
  
  function Player(maze, c, _cellsize, onComplete, sprite = null) {
    var ctx = c.getContext("2d");
    var drawSprite;
    var moves = 0;
    drawSprite = drawSpriteCircle;
    if (sprite != null) {
      drawSprite = drawSpriteImg;
    }
    var player = this;
    var map = maze.map();
    var cellCoords = {
      x: maze.startCoord().x,
      y: maze.startCoord().y
    };
    var cellSize = _cellsize;
    var halfCellSize = cellSize / 2;
  
    this.redrawPlayer = function(_cellsize) {
      cellSize = _cellsize;
      drawSpriteImg(cellCoords);
    };
  
    function drawSpriteCircle(coord) {
      ctx.beginPath();
      ctx.fillStyle = "yellow";
      ctx.arc(
        (coord.x + 1) * cellSize - halfCellSize,
        (coord.y + 1) * cellSize - halfCellSize,
        halfCellSize - 2,
        0,
        2 * Math.PI
      );
      ctx.fill();
      if (map[coord.x][coord.y].isTaskPoint) {
        displayQuestion();
        map[coord.x][coord.y].isTaskPoint = false;
      }

      if (coord.x === maze.endCoord().x && coord.y === maze.endCoord().y) {
        onComplete(moves);
        player.unbindKeyDown();
      }
    }
  
    function drawSpriteImg(coord) {
      var offsetLeft = cellSize / 50;
      var offsetRight = cellSize / 25;
      ctx.drawImage(
        sprite,
        0,
        0,
        sprite.width,
        sprite.height,
        coord.x * cellSize + offsetLeft,
        coord.y * cellSize + offsetLeft,
        cellSize - offsetRight,
        cellSize - offsetRight
      );
      if (map[coord.x][coord.y].isTaskPoint) {
        displayQuestion();
    
        map[coord.x][coord.y].isTaskPoint = false;
      }
      if (coord.x === maze.endCoord().x && coord.y === maze.endCoord().y) {
        onComplete(moves);
        player.unbindKeyDown();
      }
    }
  //   function openPopup() {
  //     document.getElementById("popup").style.display = "block";
  // }
  
  // function closePopup() {
  //     document.getElementById("popup").style.display = "none";
  // }

    function removeSprite(coord) {
      var offsetLeft = cellSize / 50;
      var offsetRight = cellSize / 25;
      ctx.clearRect(
        coord.x * cellSize + offsetLeft,
        coord.y * cellSize + offsetLeft,
        cellSize - offsetRight,
        cellSize - offsetRight
      );
    }
  
    function check(e) {
      if (window.freezePlayer) {
        return
      }
      var cell = map[cellCoords.x][cellCoords.y];
      moves++;
      switch (e.keyCode) {
        case 65:
        case 37: // west
          if (cell.w == true) {
            removeSprite(cellCoords);
            cellCoords = {
              x: cellCoords.x - 1,
              y: cellCoords.y
            };
            drawSprite(cellCoords);
          }
          break;
        case 87:
        case 38: // north
          if (cell.n == true) {
            removeSprite(cellCoords);
            cellCoords = {
              x: cellCoords.x,
              y: cellCoords.y - 1
            };
            drawSprite(cellCoords);
          }
          break;
        case 68:
        case 39: // east
          if (cell.e == true) {
            removeSprite(cellCoords);
            cellCoords = {
              x: cellCoords.x + 1,
              y: cellCoords.y
            };
            drawSprite(cellCoords);
          }
          break;
        case 83:
        case 40: // south
          if (cell.s == true) {
            removeSprite(cellCoords);
            cellCoords = {
              x: cellCoords.x,
              y: cellCoords.y + 1
            };
            drawSprite(cellCoords);
          }
          break;
      }
    }
  
    this.bindKeyDown = function() {
      window.addEventListener("keydown", check, false);
  
      $("#view").swipe({
        swipe: function(
          event,
          direction,
          distance,
          duration,
          fingerCount,
          fingerData
        ) {
          console.log(direction);
          switch (direction) {
            case "up":
              check({
                keyCode: 38
              });
              break;
            case "down":
              check({
                keyCode: 40
              });
              break;
            case "left":
              check({
                keyCode: 37
              });
              break;
            case "right":
              check({
                keyCode: 39
              });
              break;
          }
        },
        threshold: 0
      });
    };
  
    this.unbindKeyDown = function() {
      window.removeEventListener("keydown", check, false);
      $("#view").swipe("destroy");
    };
  
    drawSprite(maze.startCoord());
  
    this.bindKeyDown();
  }
  
  var mazeCanvas = document.getElementById("mazeCanvas");
  var ctx = mazeCanvas.getContext("2d");
  var sprite;
  var finishSprite;
  var maze, draw, player;
  var cellSize;
  var difficulty;
  // sprite.src = 'media/sprite.png';
  
  window.onload = function() {
    let viewWidth = $("#view").width();
    let viewHeight = $("#view").height();
    if (viewHeight < viewWidth) {
      ctx.canvas.width = viewHeight - viewHeight / 100;
      ctx.canvas.height = viewHeight - viewHeight / 100;
    } else {
      ctx.canvas.width = viewWidth - viewWidth / 100;
      ctx.canvas.height = viewWidth - viewWidth / 100;
    }
  
    //Load and edit sprites
    var completeOne = false;
    var completeTwo = false;
    var isComplete = () => {
      if(completeOne === true && completeTwo === true)
         {
           console.log("Runs");
           setTimeout(function(){
             makeMaze();
           }, 500);         
         }
    };
    sprite = new Image();
    sprite.src =
      "./diver.png" + "?" +
      new Date().getTime();
    sprite.setAttribute("crossOrigin", " ");
    sprite.onload = function() {
      sprite = changeBrightness(1.2, sprite);
      completeOne = true;
      console.log(completeOne);
      isComplete();
    };
  
    finishSprite = new Image();
    finishSprite.src = "./submarine.png"+
    "?" +
    new Date().getTime();
    finishSprite.setAttribute("crossOrigin", " ");
    finishSprite.onload = function() {
      finishSprite = changeBrightness(1.1, finishSprite);
      completeTwo = true;
      console.log(completeTwo);
      isComplete();
    };
    
  };
  
  window.onresize = function() {
    let viewWidth = $("#view").width();
    let viewHeight = $("#view").height();
    if (viewHeight < viewWidth) {
      ctx.canvas.width = viewHeight - viewHeight / 100;
      ctx.canvas.height = viewHeight - viewHeight / 100;
    } else {
      ctx.canvas.width = viewWidth - viewWidth / 100;
      ctx.canvas.height = viewWidth - viewWidth / 100;
    }
    cellSize = mazeCanvas.width / difficulty;
    if (player != null) {
      draw.redrawMaze(cellSize);
      player.redrawPlayer(cellSize);
    }
  };
  document.addEventListener('keydown', function(event) {
    // Call the game function when any key is pressed
    game();
  });
  var startTime;
  function makeMaze() {
    startTime = Date.now();
    window.freezePlayer = false;
    document.getElementById('questionContainer').style.display = 'none';
    if (player != undefined) {
      player.unbindKeyDown();
      player = null;
    }
    var e = document.getElementById("diffSelect");
    difficulty = e.options[e.selectedIndex].value;
    cellSize = mazeCanvas.width / difficulty;
    maze = new Maze(difficulty, difficulty);
    draw = new DrawMaze(maze, ctx, cellSize, finishSprite);
    player = new Player(maze, mazeCanvas, cellSize, displayVictoryMess, sprite);
    if (document.getElementById("mazeContainer").style.opacity < "100") {
      document.getElementById("mazeContainer").style.opacity = "100";
    }
  }

var question;
  function displayQuestion() {
    // Assume questions is an array of objects with 'text' and 'correctAnswer' properties
    question = getRandomQuestion();
    
    // Update the question text
    document.getElementById('questionText').textContent = question.text;
    document.getElementById('explanation').style.display = 'none';  
  
    // Show the question container
    document.getElementById('questionContainer').style.display = 'block';
    document.getElementById('questionText').innerHTML = (question.text);
    document.getElementById('one').innerHTML = (question.choice1);
    document.getElementById('two').innerHTML = (question.choice2);
    document.getElementById('three').innerHTML = (question.choice3);

    window.freezePlayer = true;
  }
  
  function getRandomQuestion() {
    // Implement logic to get a random question from your set of questions
    // Example:
    var questions = [
        { text: '3 out of every 7 people on the planet depend on _____ as their main source of protein',
        choice1: 'Beef',
        choice2: 'Seafood',
        choice3: 'Plants', 
        correctAnswer: 'choice2', 
        info: 'More than 3 billion people on the planet depend on seafood — fish, clams, crabs, shrimp, etc. — for their nutrition and food security.' 
      },
      
      { text: 'As the ocean warms and sea level rises, some low-lying lands may see _____.', 
        choice1: 'Increased tourism',
        choice2: 'loss of coastlines',
        choice3: 'More beachfront',
        correctAnswer: 'choice2',
        info: 'Warmer waters and higher seas destroy reefs and beaches, causing the disappearance of coastlines and forcing the potential relocation of entire island populations.'
      },
      
      { text: 'About 26% of all carbon dioxide released by human activity over the last decade was absorbed by _____.',
        choice1: 'Tall people',
        choice2: 'Trees',
        choice3: 'The ocean',
        correctAnswer: 'choice3',
        info: 'The absorption of carbon dioxide from Earth’s atmosphere by the world’s oceans has prevented global warming from worsening faster than it has.'
      },

      { text: 'More than 1/2 of our breathable oxygen comes from the ocean. True or false.',
        choice1: 'True',
        choice2: 'False',
        choice3: 'Not sure',
        correctAnswer: 'choice1',
        info: 'The ocean provides just over half our breathable oxygen, and most of that is provided by microscopic marine plants called phytoplankton.'
      },

      { text: 'As the ocean warms, it can help absorb more carbon from the atmosphere. True or false.',
        choice1: 'True',
        choice2: 'False',
        choice3: 'Not sure',
        correctAnswer: 'choice2',
        info: 'A warming ocean is actually less efficient at absorbing carbon from the atmosphere. That’s bad news, because the warmer the ocean gets, the more carbon will remain in the atmosphere, warming the planet even more quickly.'
      },

      { text: 'Every _____ a garbage truck full of plastic is dumped into the ocean.',
        choice1: 'Minute',
        choice2: 'Hour',
        choice3: 'Day',
        correctAnswer: 'choice1',
        info: 'About 8 million metric tons of plastic are thrown into the ocean every year, which is like dumping a garbage truck full of plastic into the ocean every minute for an entire year!'
      },

      { text: 'There is more microplastic in the ocean than there are stars in the milky way.',
        choice1: 'True',
        choice2: 'False',
        choice3: 'Not sure',
        correctAnswer: 'choice1',
        info: 'As much as 50 trillion microplastic particles litter our ocean, while the milky way galaxy has about 100-400 billion stars.'
      },

      { text: 'What is the most common trash found on beaches?',
        choice1: 'Medical waste',
        choice2: 'Wooden debris',
        choice3: 'Disposable plastics',
        correctAnswer: 'choice3',
        info: 'About 80% of the trash found on beaches comes from single-use disposable plastics, such as bottles, utensils, straws and food wrappers. In addition to being an eyesore, plastic in the environment can pose a deadly threat to marine animals.'
      },

      { text: 'Each year, how many tons of plastics the world produces and how many tons of them enter the ocean?',
        choice1: '180, 10',
        choice2: '280, 12',
        choice3: '380, 14',
        correctAnswer: 'choice3',
        info: 'The world produces over 380 million tons of plastic every year. More than 14 million tons of plastic enter the ocean, outpacing efforts to remove it.'
      },

      { text: 'Why is plastic harmful in the environment, especially in the oceans?',
        choice1: 'It biodegrades quickly',
        choice2: 'It lasts forever',
        choice3: 'It is easy to recycle',
        correctAnswer: 'choice2',
        info: 'Plastic does not biodegrade easily and can persist in the environment for a long time, posing a persistent threat to marine animals. Choosing environmentally friendly alternatives is crucial for marine ecosystem protection.'
      },

      { text: 'How are microplastics formed?',
        choice1: 'Chemical reactions',
        choice2: 'Natural processes',
        choice3: 'Break apart from larger plastics',
        correctAnswer: 'choice3',
        info: 'Microplastics are tiny pieces that result from the gradual breakdown of larger plastic objects. Despite their size, they have significant impacts on marine life.'
      },

      { text: 'Where have scientists found large quantities of microplastics?',
        choice1: 'Every environment',
        choice2: 'Urban areas',
        choice3: 'Deep ocean',
        correctAnswer: 'choice1',
        info: 'Scientists have found large quantities of microplastics in various environments, ranging from urban areas to remote mountainous regions, underscoring the widespread contamination.'
      },

      { text: 'What actions can individuals take to reduce the impact of toxic chemicals on the environment?',
        choice1: 'Avoid local products',
        choice2: 'Use reusable cloth bags',
        choice3: 'Irresponsible waste disposal',
        correctAnswer: 'choice2',
        info: 'Individuals can reduce the impact of toxic chemicals by choosing eco-friendly products, using reusable bags, and being mindful of their choices to promote a healthier marine environment.'
      }

        // Add more questions as needed
    ];

    var randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}

  
  function checkAnswer(selectedAnswer) {

    document.getElementById('questionText').innerHTML = (question.text);
    document.getElementById('one').innerHTML = (question.choice1);
    document.getElementById('two').innerHTML = (question.choice2);
    document.getElementById('three').innerHTML = (question.choice3);
    if (selectedAnswer === question.correctAnswer) {

      // Correct answer
      console.log('Correct!');
  
      window.freezePlayer = false;

      // Hide the question container
      document.getElementById('questionContainer').style.display = 'none';

      // Show the explanation
      document.getElementById('explanation').style.display = 'block';
      document.getElementById('explainP').innerHTML = 'You are correct';
      document.getElementById('again').style.display = 'none';
    } else {
      // Incorrect answer
      document.getElementById('questionContainer').style.display = 'none';
      document.getElementById('again').style.display = 'block';
      document.getElementById('explainP').innerHTML = (question.info);
      document.getElementById('explanation').style.display = 'block';
      window.freezePlayer = true; // You may choose to handle incorrect answers differently
    }
    
}


function tryAgain() {
  // Reset the UI to allow the user to try again
  document.getElementById('questionContainer').style.display = 'block';
  document.getElementById('explanation').style.display = 'none';
}