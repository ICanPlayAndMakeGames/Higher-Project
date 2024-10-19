//Constants

const Canvas = document.querySelector("canvas")
const c = Canvas.getContext("2d")

const gravity = 0.2

//Sprites

//Higher the speed the slower the animation



var sprites = {

          ["Hyena"]:{
                    ["Base"]: {"src": "./assets/Sprites/Hyena/Hyena.png", "frames": 1, "speed": 2,"pos":{"x":Canvas.width,"y":0} },
                    ["Idle"]: {"src": "./assets/Sprites/Hyena/Hyena_idle.png", "frames": 4, "speed": 24,"pos":{"x":Canvas.width * 2,"y":40} },
                    ["Walk"]: {"src": "./assets/Sprites/Hyena/Hyena_walk.png", "frames": 6, "speed": 15,"pos":{"x":Canvas.width,"y":80} },
                    ["Attack"]: {"src": "./assets/Sprites/Hyena/Hyena_attack.png", "frames": 6, "speed": 18,"pos":{"x":Canvas.width,"y":120} },
                    ["Hurt"]: {"src": "./assets/Sprites/Hyena/Hyena_hurt.png", "frames": 2, "speed": 25,"pos":{"x":Canvas.width,"y":160} },
                    ["Death"]: {"src": "./assets/Sprites/Hyena/Hyena_death.png", "frames": 6, "speed": 20,"pos":{"x":Canvas.width,"y":200} }
          },

          ["Mummy"]:{
                    ["Base"]: {"src": "./assets/Sprites/Mummy/Mummy.png", "frames": 1, "speed": 2,"pos":{"x":0,"y":0} },
                    ["Idle"]: {"src": "./assets/Sprites/Mummy/Mummy_idle.png", "frames": 4, "speed": 24,"pos":{"x":0,"y":40} },
                    ["Walk"]: {"src": "./assets/Sprites/Mummy/Mummy_walk.png", "frames": 6, "speed": 15,"pos":{"x":0,"y":80} },
                    ["Attack"]: {"src": "./assets/Sprites/Mummy/Mummy_attack.png", "frames": 6, "speed": 18,"pos":{"x":0,"y":120} },
                    ["Hurt"]: {"src": "./assets/Sprites/Mummy/Mummy_hurt.png", "frames": 2, "speed": 25,"pos":{"x":0,"y":160} },
                    ["Death"]: {"src": "./assets/Sprites/Mummy/Mummy_death.png", "frames": 6, "speed": 20,"pos":{"x":0,"y":200} }
          },

          ["Scorpio"]:{
                    ["Base"]: {"src": "./assets/Sprites/Scorpio/Scorpio.png", "frames": 1, "speed": 2,"pos":{"x":0,"y":0} },
                    ["Idle"]: {"src": "./assets/Sprites/Scorpio/Scorpio_idle.png", "frames": 4, "speed": 24,"pos":{"x":0,"y":40} },
                    ["Walk"]: {"src": "./assets/Sprites/Scorpio/Scorpio_walk.png", "frames": 6, "speed": 15,"pos":{"x":0,"y":80} },
                    ["Attack"]: {"src": "./assets/Sprites/Scorpio/Scorpio_attack.png", "frames": 6, "speed": 18,"pos":{"x":0,"y":120} },
                    ["Hurt"]: {"src": "./assets/Sprites/Scorpio/Scorpio_hurt.png", "frames": 2, "speed": 25,"pos":{"x":0,"y":160} },
                    ["Death"]: {"src": "./assets/Sprites/Scorpio/Scorpio_death.png", "frames": 6, "speed": 20,"pos":{"x":0,"y":200} }
          },

          ["Snake"]:{
                    ["Base"]: {"src": "./assets/Sprites/Snake/Snake.png", "frames": 1, "speed": 2,"pos":{"x":0,"y":0} },
                    ["Idle"]: {"src": "./assets/Sprites/Snake/Snake_idle.png", "frames": 4, "speed": 24,"pos":{"x":0,"y":40} },
                    ["Walk"]: {"src": "./assets/Sprites/Snake/Snake_walk.png", "frames": 6, "speed": 15,"pos":{"x":0,"y":80} },
                    ["Attack"]: {"src": "./assets/Sprites/Snake/Snake_attack.png", "frames": 6, "speed": 18,"pos":{"x":0,"y":120} },
                    ["Hurt"]: {"src": "./assets/Sprites/Snake/Snake_hurt.png", "frames": 2, "speed": 25,"pos":{"x":0,"y":160} },
                    ["Death"]: {"src": "./assets/Sprites/Snake/Snake_death.png", "frames": 6, "speed": 20,"pos":{"x":0,"y":200} }
          },

          ["Vulture"]:{
                    ["Base"]: {"src": "./assets/Sprites/Vulture/Vulture.png", "frames": 1, "speed": 2,"pos":{"x":0,"y":0} },
                    ["Idle"]: {"src": "./assets/Sprites/Vulture/Vulture_idle.png", "frames": 4, "speed": 24,"pos":{"x":0,"y":40} },
                    ["Walk"]: {"src": "./assets/Sprites/Vulture/Vulture_walk.png", "frames": 6, "speed": 15,"pos":{"x":0,"y":80} },
                    ["Attack"]: {"src": "./assets/Sprites/Vulture/Vulture_attack.png", "frames": 6, "speed": 18,"pos":{"x":0,"y":120} },
                    ["Hurt"]: {"src": "./assets/Sprites/Vulture/Vulture_hurt.png", "frames": 2, "speed": 25,"pos":{"x":0,"y":160} },
                    ["Death"]: {"src": "./assets/Sprites/Vulture/Vulture_death.png", "frames": 6, "speed": 20,"pos":{"x":0,"y":200} }
          },


}


sprites.Hyena.Sprite = class hyena extends Sprite{

          constructor(){

                    super([
                              sprites.Hyena.Base,
                              sprites.Hyena.Idle,
                              sprites.Hyena.Walk,
                              sprites.Hyena.Attack,
                              sprites.Hyena.Hurt,
                              sprites.Hyena.Death          
                    ])

          }
};

sprites.Mummy.Sprite = class mummy extends Sprite{

          constructor(){

                    super([
                              sprites.Mummy.Base,
                              sprites.Mummy.Idle,
                              sprites.Mummy.Walk,
                              sprites.Mummy.Attack,
                              sprites.Mummy.Hurt,
                              sprites.Mummy.Death          
                    ])

          }
};

sprites.Scorpio.Sprite = class scorpio extends Sprite{

          constructor(){

                    super([
                              sprites.Scorpio.Base,
                              sprites.Scorpio.Idle,
                              sprites.Scorpio.Walk,
                              sprites.Scorpio.Attack,
                              sprites.Scorpio.Hurt,
                              sprites.Scorpio.Death          
                    ])

          }
};

sprites.Snake.Sprite = class snake extends Sprite{

          constructor(){

                    super([
                              sprites.Snake.Base,
                              sprites.Snake.Idle,
                              sprites.Snake.Walk,
                              sprites.Snake.Attack,
                              sprites.Snake.Hurt,
                              sprites.Snake.Death          
                    ])

          }
};

sprites.Vulture.Sprite = class vulture extends Sprite{

          constructor(){

                    super([
                              sprites.Vulture.Base,
                              sprites.Vulture.Idle,
                              sprites.Vulture.Walk,
                              sprites.Vulture.Attack,
                              sprites.Vulture.Hurt,
                              sprites.Vulture.Death          
                    ])

          }
};