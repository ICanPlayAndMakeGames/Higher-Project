class createAnimationFromSpriteSheet{
          constructor(imageSrc,frames,speed = 1,pos = {"x":0,"y":0}){
                    console.log(pos,Canvas.width)
                    var SpriteImage = new Image()
                    SpriteImage.src = imageSrc
                    this.img = SpriteImage
                    this.frame = 0
                    this.frameCount = 0
                    this.MaxFrames = frames
                    this.scale = 1
                    this.speed = speed
                    console.log(pos.y,this.img.height)
                    this.pos = {"x":pos.x - (this.img.width / this.MaxFrames) * 2,"y":pos.y - (this.img.height / 2)}
          }
}

class characterSprite{
          constructor(spritesheet,position){
                    this.SpH = spritesheet
                    this.pos = position
                    this.animation = new createAnimationFromSpriteSheet(spritesheet,3)
          }
}


class Sprite{

          constructor(animations,baseAnimation,pos = {"x":Canvas.width,"y":Canvas.height},vel = {"x":0,"y":0}) {
          
                    this.animations = []
                    this.pos = pos
                    this.actualPos = this.pos
                    this.vel = vel
                    this.onfloor = false
                    for (let i = 0;i < animations.length; i++){
                              console.log(animations[i].src)
                              this.animations.push(new createAnimationFromSpriteSheet(animations[i].src,animations[i].frames,animations[i].speed,animations[i].pos))
                    }
                    this.currentAnimation = baseAnimation
          }

          draw(){

                    //console.log(this.currentAnimation)
                    
                    this.currentAnimation.pos = this.pos

                    c.drawImage(
                              this.currentAnimation.img,
                              (this.currentAnimation.frame) * (this.currentAnimation.img.width / this.currentAnimation.MaxFrames),
                              0,
                              this.currentAnimation.img.width / this.currentAnimation.MaxFrames,
                              this.currentAnimation.img.height,
                              this.currentAnimation.pos.x,
                              this.currentAnimation.pos.y,
                              (this.currentAnimation.img.width / this.currentAnimation.MaxFrames) * this.currentAnimation.scale,
                              this.currentAnimation.img.height * this.currentAnimation.scale
                    )
          }


          animateFrames(){
                    this.currentAnimation.frameCount++
                    //console.log(this.frame)
                    if (this.currentAnimation.frameCount % this.currentAnimation.speed === 0){
            
                    if (this.currentAnimation.frame < this.currentAnimation.MaxFrames - 1){
                        this.currentAnimation.frame++
                        //console.log(this.currentAnimation.frame)
                    }else {
                        this.currentAnimation.frame = 0
                    }
                    } 
                }

          

          update() {
                    
                    
                   //if (this.onfloor == true){
                    
                   // }

                   
                    
                    if (this.pos.x + this.width + this.vel.x >= Canvas.width) {
                              this.vel.x = 0
                              this.pos.x = Canvas.width - this.currentAnimation.width
                              //this.draw()
          
                    }
                    else if(this.pos.x + this.vel.x < 0) {
                              this.vel.x = 0
                              this.pos.x = 0 + this.currentAnimation.width
                              //this.draw()
                    }
                    if (this.pos.y + this.currentAnimation.img.height + this.vel.y >= Canvas.height - ((this.currentAnimation.img.height) * this.currentAnimation.scale / 1.45)){
                             //console.log("Lower than: ",Canvas.height - (this.currentAnimation.img.height))
                              this.vel.y = 0
                              this.pos.y = Canvas.height - (this.currentAnimation.img.height * this.currentAnimation.scale)
                              //console.log(this.pos)
                              this.jumps = 0
                              this.onfloor = true

                    }//else this.vel.y +=gravity, this.onfloor = false

                   // console.log(this.onfloor)

                    this.actualPos.x += this.vel.x
                    this.actualPos.y += this.vel.y


                    this.pos = {"x":this.actualPos.x - (this.currentAnimation.img.width / this.currentAnimation.MaxFrames) * this.currentAnimation.scale,"y":this.actualPos.y - (this.currentAnimation.img.height / this.currentAnimation.scale)}
                    console.log(this.pos)
                    this.draw()
                    this.animateFrames()
          }

}



class MaxHeap {
          constructor() {
              this.heap = [];
          }
      
          getParentIndex(index) {
              return Math.floor((index - 1) / 2);
          }
      
          getLeftChildIndex(index) {
              return 2 * index + 1;
          }
      
          getRightChildIndex(index) {
              return 2 * index + 2;
          }
      
          swap(index1, index2) {
              [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
          }
      
          push(node) {
              this.heap.push(node);
              this.heapifyUp();
          }
      
          heapifyUp() {
              let index = this.heap.length - 1;
              while (index > 0) {
                  let parentIndex = this.getParentIndex(index);
                  if (this.heap[parentIndex].priority < this.heap[index].priority) {
                      this.swap(parentIndex, index);
                      index = parentIndex;
                  } else {
                      break;
                  }
              }
          }
      
          pop() {
              if (this.heap.length === 1) return this.heap.pop();
              const root = this.heap[0];
              this.heap[0] = this.heap.pop();
              this.heapifyDown();
              return root;
          }
      
          heapifyDown() {
              let index = 0;
              while (this.getLeftChildIndex(index) < this.heap.length) {
                  let largerChildIndex = this.getLeftChildIndex(index);
                  let rightChildIndex = this.getRightChildIndex(index);
      
                  if (rightChildIndex < this.heap.length && this.heap[rightChildIndex].priority > this.heap[largerChildIndex].priority) {
                      largerChildIndex = rightChildIndex;
                  }
      
                  if (this.heap[index].priority >= this.heap[largerChildIndex].priority) {
                      break;
                  }
      
                  this.swap(index, largerChildIndex);
                  index = largerChildIndex;
              }
          }
      
          isEmpty() {
              return this.heap.length === 0;
          }
}

class SeededRandom {
          constructor(seed) {
              this.seed = seed;
              this.m = 0x80000000;
              this.a = 1103515245;
              this.c = 12345;
              this.state = (seed % this.m + this.m) % this.m;
          }
      
          next() {
              this.state = (this.a * this.state + this.c) % this.m;
              return this.state / this.m;
          }
      }
      

class GridManager {
          constructor(gridWidth, gridHeight) {
              this.grid = Array.from({ length: gridHeight }, () => Array(gridWidth).fill(null).map(() => []));
              this.heap = new MaxHeap();
          }
      
          addObjectToTile(x, y, object) {
              this.grid[y][x].push(object);
              this.updateHeap(x, y);
          }
      
          removeObjectFromTile(x, y, object) {
              let tileObjects = this.grid[y][x];
              let index = tileObjects.indexOf(object);
              if (index > -1) {
                  tileObjects.splice(index, 1);
                  this.updateHeap(x, y);
              }
          }
      
          updateHeap(x, y) {
              let priority = this.grid[y][x].length; // Number of objects as priority
              this.heap.push({ position: [x, y], priority });
          }
      
          getMostPopulatedTile() {
              return this.heap.pop();
          }
}