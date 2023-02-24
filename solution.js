
let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')

const updateGame = (p1,p2,gameState) => {
 
  p1NameDiv.innerText = p1.name
  p2NameDiv.innerText = p2.name
  p1HealthDiv.innerText = p1.health
  p2HealthDiv.innerText = p2.health
  
  if (p1.health < 0 || p2.health < 0) {
    game.isOver = true;
    gameState = game.isOver
    result.innerText = game.declareWinner(game.isOver,p1,p2)
    return gameState
  } 
}
const playMusic= () =>{
  document.getElementById('bgsd').play();
}
const StopMusic=() =>{
  document.getElementById('bgsd').pause();
  document.getElementById('bgsd').currentTime=0;
}




class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }
  strike (player, enemy, attackDmg) {
    let damageAmount = Math.ceil(Math.random() * attackDmg) 
    enemy.health -= damageAmount
    updateGame(p1,p2,gameState)
    return `${player.name} attacks ${enemy.name} for ${damageAmount}` 
  }
  heal (player) {
    let hpAmount = Math.ceil(Math.random() * 5)
    player.health += hpAmount
    updateGame(p1,p2,gameState)
    return `${player.name} heals for ${hpAmount} HP!`
  }
}

class Game {
  constructor() {
    this.isOver = false;
  }

  declareWinner(isOver,p1, p2) {

    let message=`Both Exhausted `
    if(p1.health>=0 && p2.health>=0){
        console.log(isOver, p1.health, p2.health)
        document.getElementById('Exh1').play()
        play(p1,p2)
    }
    else if (isOver == true && p1.health <= 0 ) {
      message =  `Goku WINS!`;
      console.log(isOver, p1.health, p2.health)
      document.getElementById('victory2').play()
      return message
    }
    else if(isOver == true && p2.health <= 0 ) {
      message = `Spartan WINS!`
      console.log(isOver, p1.health, p2.health)

      document.getElementById('victory1').play()
      return message
    } 
    return message;
    console.log(isOver, p1.health, p2.health)
    // document.getElementById('victory').play()
    
  }

  reset(p1,p2) {
    p1.health = 250
    p2.health = 250
    this.isOver = false
    resultDiv.innerText = ''
    updateGame(p1,p2)
  }
  
  play(p1, p2) {
    this.reset(p1, p2);
    while (!this.isOver ) {

      p1.strike(p1,p2, p1.attackDmg)
      p2.heal(p2)
      p2.strike(p2,p1, p2.attackDmg);
      p1.heal(p1)
    }
    return this.declareWinner(this.isOver,p1,p2);
    
  }

}

let player1 = new Player('Spartan', 250, 15)
let player2 = new Player('Goku', 250,15)


let p1 = player1
let p2 = player2



let game = new Game();
updateGame(p1,p2)

let gameState = game.isOver


play.onclick = () => result.innerText = game.play(p1,p2);



document.addEventListener('keydown', function(e) {
  if (e.key == "q" && p2.health > 0 && game.isOver == false ){
    p1.strike(p1, p2, p1.attackDmg)
    document.getElementById('p1attack').play();
  }
});
document.addEventListener('keydown', function(e) {
  if (e.key == "t" && game.isOver == false ){
    
  }
});
document.addEventListener('keydown', function(e) {
  if (e.key == "a" && p2.health > 0 ){
   p1.heal(p1)
   document.getElementById('p1heal').play();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key == "p" && p1.health > 0 && game.isOver == false ){
    p2.strike(p2, p1, p2.attackDmg)
    document.getElementById('p2attack').play();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key == "l" && p2.health > 0 ){
   player2.heal(p2)
  document.getElementById('p2heal').play();
  }
});