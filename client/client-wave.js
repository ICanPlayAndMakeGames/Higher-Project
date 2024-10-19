

//let clone = 



console.log(sprites)

Canvas.width = 1536 * 0.85
Canvas.height = 756 * 0.95

var character = new Sprite(

          [
                    {"src": "./assets/character2.png","frames": 3, "speed": 11,"pos":{"x":Canvas.width,"y":0}}
          ],
          {"src": "./assets/character2.png","frames": 3, "speed": 11,"pos":{"x":Canvas.width,"y":0}}

)

character.currentAnimation = character.animations[0]


console.log("Set width")

c.fillStyle = 'black'
c.fillRect(0,0,Canvas.width,Canvas.height)

var Floor = new Image()
Floor.src = "./assets/tile.png"

let grid = []

let playerPosition = [1,1]


let PossibleAssets = [

          [0.45,"./assets/tree_2.png"],
          [0.225,"./assets/tree_1.png"],
          [0.005,"./assets/rock_2.png"],
          [0.05,"./assets/rock_1.png"],

          [0.35,"./assets/bush.png"]

]



PossibleAssets.forEach(element => {
          element[0] = 1 - element[0]
});

PossibleAssets.sort((a, b) => a[0] - b[0])

console.log(PossibleAssets)

function reverseObject(obj) {
          // Get the entries (key-value pairs) of the object as an array
          let entries = Object.entries(obj);
          
          // Reverse the array of entries
          let reversedEntries = entries.reverse();
          
          // Create a new object from the reversed entries
          let reversedObject = Object.fromEntries(reversedEntries);
          
          return reversedObject;
      }

function FindTilesInRadius(radius,startx,starty){

          let tiles = []

          for (let x = 1;x <= radius;x++){

                    tiles.push(grid[startx - x])

          }

        

          for (let y = 1;y <= radius;y++){

                    tiles.push(grid[startx])

          }


          return tiles
}

function ClampNumber(n1,min,max){
          if (n1 > max){
                    n1 = max
          }

          if (n1 < min){
                    n1 = min
          }
          return n1
}

function hash(x, y, seed) {
          let h = seed;
          h ^= x + 0x9e3779b9 + (h << 6) + (h >> 2);
          h ^= y + 0x9e3779b9 + (h << 6) + (h >> 2);
          return h;
      }

      function createSeed(basePosition, currentPosition) {
          //console.log(basePosition)
          const [baseX, baseY] = basePosition;
          const [currentX, currentY] = currentPosition;
      
          // Adjusting the position and generating a seed
          const adjustedX = currentX - baseX;
          const adjustedY = currentY - baseY;
      
          // Combine adjusted position into a seed
          let seed = adjustedX * 73856093 ^ adjustedY * 19349663;
          return seed;
      }
      

function SelectAsset(x,y){
          let seed = createSeed([x,y],[playerPosition[0],playerPosition[1]])
          let RandomNumber = new SeededRandom(seed)
          RandomNumber = RandomNumber.next()
          var currentAsset = 0
          var Ncounter = 0
          var Chosen = false
         // console.log(RandomNumber)
          PossibleAssets.forEach(asset => {
                    //console.log(asset)
                    Ncounter ++
                    if (RandomNumber > asset[0]){
                             
                              console.log("moved up lol",currentAsset)
                              currentAsset = Ncounter- 1
                               Chosen = true
                              
                             
                    }
                    
          });

          if (Chosen == false){
                    return null
          }

          return PossibleAssets[currentAsset][1]
}

function MoveOut(array,x,y){
          grid.pop()
          
          let count = 0
          let inverseg = grid.reverse()
          inverseg.forEach(element => {
                    grid[count] = element
                    count++
          });
          console.log(grid)
}

function shiftGridLeft() {
          for (let x = 0; x < grid.length - 1; x++) {
              grid[x] = grid[x + 1];
          }
          grid[grid.length - 1] = undefined; // Clear the last column
      }

function shiftGridYUp() {
          for (let x = 0; x < grid.length; x++) {
              if (grid[x]) {
                  for (let y = 0; y < grid[x].length - 1; y++) {
                      grid[x][y] = grid[x][y + 1];
                  }
                  grid[x][grid[x].length - 1] = undefined; // Clear the last row in the column
              }
          }
      }



function DrawFloor(){

          let canFitX = Math.ceil(Canvas.width / Floor.width | 128) + 2
          let canFitY = Math.ceil(Canvas.height / Floor.height | 128) + 2

          let DeferDraw = []

          for (let x = 0;x <= canFitX;x++){

                    if (!grid[x]){
                              grid[x] = []
                    }

                    for (let y = 0; y <= canFitY; y++){

                              

                              c.drawImage(
                                       Floor,
                                       x * Floor.width,
                                       y * Floor.height
                              )

                              
                              
                    }
          }

          character.update()

          for (let x = 0;x <= canFitX;x++){
                    for (let y = 0; y <= canFitY; y++){

          if (!grid[x][y]){
                    //console.log(x,y)
                    //DynamicChance(x,y)
                    let randomAsset = SelectAsset(x,y)
                    //console.log(randomAsset)
                    if (randomAsset){
                              grid[x][y] = new Image()
                              //let randomAsset = PossibleAssets[Math.floor(Math.random() * (PossibleAssets.length))] 
                             // console.log(randomAsset)
                              grid[x][y].src = randomAsset
                    }else{
                              grid[x][y] = true
                    }
          }

          //console.log(typeof(grid[x,y]))
          
         

          //console.log(grid[x,y])
          if (typeof(grid[x][y]) != "boolean"){
                    
                    if (!grid[x][y].src.includes("tree")){
                              c.drawImage(
                                        grid[x][y],
                                        (x * Floor.width) + (grid[x][y].width / 2),
                                        (y * Floor.height) + (grid[x][y].height / 2),
                              )
                    }else{
                              DeferDraw.push([x,y])
                    }
                    

                   
                              }
                    }
          }

          


          DeferDraw.forEach(element => {
                    //console.log(grid[element[0]])
                   c.drawImage(
                    grid[element[0]][element[1]],
                    (element[0] * Floor.width) + (grid[element[0]][element[1]].width / 2),
                    (element[1] * Floor.height) - (grid[element[0]][element[1]].height / 2),
                   )
          });

          
}



function animate(){
          
          window.requestAnimationFrame(animate)
          c.fillStyle = 'black'
          c.fillRect(0,0,Canvas.width,Canvas.height)
         
          if (playerPosition[0] % Floor.height === 0){
                    //shiftGridLeft()
          }

          if (playerPosition[1] % Floor.width === 0) {
                    //shiftGridYUp();
          }
          
          DrawFloor()
          
          //MoveOut()
          
          playerPosition[1]++

          

         
         
}

animate()

/*function SetAnimationPositions(){
          for (let i in sprites){
                    for (let animation in sprites[i]){
                              if (animation != "Sprite"){       
                                        sprites[i][animation].pos.x = Canvas.width
                              }
                    }
          }
}

SetAnimationPositions()

/*window.onresize = function() {
         
          // Setting the current height & width
          // to the canvas
          Canvas.width = window.innerWidth * 0.85
          Canvas.height = window.innerHeight * 0.95

          c.fillStyle = 'black'
          c.fillRect(0,0,Canvas.width,Canvas.height)
          console.log(Canvas.width)

          SetAnimationPositions()

};
var backgroundImg = new Image()
backgroundImg.src = "./assets/background.png"

var hyenaclone = new sprites.Hyena.Sprite
var mummyclone = new sprites.Mummy.Sprite
var scorpioclone = new sprites.Scorpio.Sprite
var snakeclone = new sprites.Snake.Sprite
var vulutureclone = new sprites.Vulture.Sprite

let enemies = []

for (let i=0; i < 5; i++){
          var newhyena = new sprites.Hyena.Sprite
          newhyena.currentAnimation = newhyena.animations[i]
          enemies.push(newhyena)
}

hyenaclone.currentAnimation = hyenaclone.animations[3]
mummyclone.currentAnimation = mummyclone.animations[4]
scorpioclone.currentAnimation = scorpioclone.animations[3]
snakeclone.currentAnimation = snakeclone.animations[2]
vulutureclone.currentAnimation = vulutureclone.animations[1]

hyenaclone.vel.x = 0

*/