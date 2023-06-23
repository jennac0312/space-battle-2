// create player 1

class Player {
    constructor(){
        this.name = 'USS Assembly',
        this.hp = 20,
        this.firepower = 5,
        this.accuracy = .7,
        this.isTurn = true,
        this.attackLanded = undefined
    }
}
let p1 = new Player

// create aliens

class Alien {
    constructor(name){
        this.name = name;
        this.hp = getRandomRange(3,6),
        this.firepower = getRandomRange(2,4),
        this.accuracy = ( getRandomRange(6,8) / 10 ),
        this.isTurn = false,
        this.attackLanded = undefined,
        this.id = Number(name.slice(-1))
    }
}

// get random number
const getRandomRange = (min, max) => {
    return Math.floor( Math.random() * ( max - min ) + min )
}

const getRandomNumber = () => {
    return Math.random()
}

// create array of aliens
let alien1 = new Alien('alien 1')
let alien2 = new Alien('alien 2')
let alien3 = new Alien('alien 3')
let alien4 = new Alien('alien 4')
let alien5 = new Alien('alien 5')
let alien6 = new Alien('alien 6')

let aliens = [alien1, alien2, alien3, alien4, alien5, alien6]
let deadALiens = []

let remaining = []

alien3.hp = 20

// round counter
let round = 1

// get current enemy
let currentEnemy

const getCurrentEnemy = () => {
    aliens.length ?  
    currentEnemy = aliens[0] : 
    currentEnemy = 'none'
    // console.log(`Player Wins! Aliens eliminated.`)
}

getCurrentEnemy()

// remove eliminated aliens
const removeAliens = () => {
    remaining = []
    aliens.forEach((alien) => {
        // check health
        if(alien.hp > 0){
            // console.log( alien)
            remaining.push(alien)
        } else {
            deadALiens.push(alien)
        }
    })
    aliens = remaining
    // console.log('DEAD ALIENS: ',deadALiens)
}

// works as expected
    // alien3.hp = 0
    // removeAliens()
    // console.log( 'remaining aliens:', remaining )
    // console.log( 'updated aliens:', aliens )

    // alien5.hp = 0
    // removeAliens()
    // console.log( 'remaining aliens:', remaining )
    // console.log( 'updated aliens:', aliens )
    // alien1.hp = 0
    // alien2.hp = 0
    // alien4.hp = 0
    // alien6.hp = 0
    // removeAliens()
    // console.log( 'remaining aliens:', remaining )
    // console.log( 'updated aliens:', aliens )


// toggle turn
const toggleTurn = () => {
    if(p1.isTurn){
        if(p1.attackLanded){
            p1.isTurn = false
            currentEnemy.isTurn = true
            // console.log(`%cPlayer 1 hit ${currentEnemy.name} for ${p1.firepower} damage!`, 'color: orange; font-size: 15px')
        } else {
            console.log(`%c${currentEnemy.name} DODGED player 1's attack!`, 'color: lightblue; font-size: 15px;')
        }
    } else {
        if(currentEnemy.attackLanded){
            p1.isTurn = true
            currentEnemy.isTurn = false
            // console.log(`%c${currentEnemy.name} hit Player 1 for ${currentEnemy.firepower} damage!`, 'color: orange; font-size: 15px')
        } else {
            console.log(`%c player 1 DODGED ${currentEnemy.name}'s attack!`, 'color: lightblue')
        }
    } 
}


// attack if turn
const attack = () => {

    announceFighters()
    // displayRound()
    // round++

    p1.attackLanded = checkAccuracy(p1)
    currentEnemy.attackLanded = checkAccuracy(currentEnemy)
    

    if(p1.isTurn && p1.attackLanded){
        console.log(`%cPLAYER 1... FIGHT`, 'color: grey; font-size: 15px; font-weight: bold; background-color: black;')
    } else if(currentEnemy.isTurn && currentEnemy.attackLanded){
        console.log(`%c${currentEnemy.name}... FIGHT!`, 'color: grey; font-size: 15px; font-weight: bold; background-color: black;')
    }


    if(p1.isTurn && p1.attackLanded){
        console.log(`%cPlayer 1 hit ${currentEnemy.name} for ${p1.firepower} damage!`, 'color: orange; font-size: 15px')
        currentEnemy.hp -= p1.firepower
        if(currentEnemy.hp > 0){
            console.log(`%c${currentEnemy.name} HEALTH NOW AT: ${currentEnemy.hp}`, 'font-size: 16px;')
        } else {
            console.log(`%c${currentEnemy.name} eliminated`, 'font-size: 16px; color: darkred')
        }
    } else if(currentEnemy.isTurn && currentEnemy.attackLanded) {
        console.log(`%c${currentEnemy.name} hit Player 1 for ${currentEnemy.firepower} damage!`, 'color: orange; font-size: 15px')
        p1.hp -= currentEnemy.firepower
        console.log(`%cPLAYER 1 HEALTH NOW AT: ${p1.hp}`, 'font-size: 16px;')
    }

    // only toggle if alien survives
    // if(currentEnemy.hp > p1.firepower){
    //     toggleTurn()
    // }

    removeAliens()
    removeAliensFromScreen()
    getCurrentEnemy()
    // console.log(`PLAYER HEALTH: ${p1.hp}`)
    console.log(`%cINCOMING`, 'color: orange; font-weight: bold; text-decoration: underline;', `${currentEnemy.name} HEALTH: ${currentEnemy.hp}`)
    toggleTurn()
    console.log(`%cYou got this Player, only ${remaining.length} aliens left!`, 'color: yellowgreen; font-size: 25px;')
    checkWinner()
}

// announce fighters 
const announceFighters = () => {
    console.log(`%cPLAYER 1 VS. ${currentEnemy.name}`, 'color: red; font-size: 20px')
}


// check accuracy ... if accurate attack if not miss
const checkAccuracy = (who) => {
    let accuracyGoal = Math.random()
    return accuracyGoal > who.accuracy ? false : true
}

// console.log('ACCURACY CHECK p1:',checkAccuracy(p1))
// console.log('ACCURACY CHECK', currentEnemy.name + ':',checkAccuracy(currentEnemy))


// dom variables
const roundNumberBox = document.querySelector('.round')
const playerHp = document.querySelector('.playerHp')
const startScreen = document.querySelector('.startScreen')
const startButton = document.querySelector('.play')
const battleScreen = document.querySelector('.battleScreen')
const controls = document.querySelector('.controls')
const gameOverScreen = document.querySelector('.gameOverScreen')
const winnerText = document.querySelector('.winnerText')

// check winner
const checkWinner = () => {
    if(currentEnemy === undefined || remaining.length === 0){
        battleScreen.classList.add('hidden')
        gameOverScreen.classList.remove('hidden')
        controls.classList.add('hidden')
        winnerText.innerHTML = `Congratulations! Player Wins`
        // alert(`Congratulations! Player Wins`)
        reset(5000)
    } else if(p1.hp <= 0){
        setTimeout(() => {
            battleScreen.classList.add('hidden')
            gameOverScreen.classList.remove('hidden')
        }, 5000)
        winnerText.innerHTML = `Aliens win the galaxy!`
        // alert(`Aliens win the galaxy!`)
        reset(5000)
    } else {
        console.log(`%c ~~~~~~~~game continues~~~~~~~~`, 'color: green; font-size: 15px')
    }
}

const retreat = (who) => {
    if(who === 'p1'){
        alert(`Player 1 has retreated. Game Over`)
    } else {
        alert(`${currentEnemy.name} has retreated. Game Over`)
    }
    reset(0)
}

// reset game
const reset = (time) => {
    // // clear console
    // console.clear()
    // console.log('NEW GAME')
    // // reset p1 stats
    // p1 = new Player
    // // create 6 new aliens
    // alien1 = new Alien('alien 1')
    // alien2 = new Alien('alien 2')
    // alien3 = new Alien('alien 3')
    // alien4 = new Alien('alien 4')
    // alien5 = new Alien('alien 5')
    // alien6 = new Alien('alien 6')

    // aliens = [alien1, alien2, alien3, alien4, alien5, alien6]

    // // reassign currentEnemy
    // currentEnemy = aliens[0]

    // // reset deadALiens 
    // deadALiens = []
    // console.log('new current enemy: ',currentEnemy)
    // console.log(deadALiens)


    // couldnt i simply force the window to reload instead? ...yes lol
    setTimeout(() => {
        location.reload()
    }, time);
}


// remove dead aliens from screen
const removeAliensFromScreen = () => {
    deadALiens.forEach((alien) => {
        // console.log('DEAD ALIEN ID:', alien.id)

        let htmlName = alien.name.replace(' ', '')
        const alienImg = document.querySelector(`.${htmlName}`)

        alienImg.classList.add('fadeOut')

        setTimeout(() => {
            alienImg.classList.add('hidden')
        }, 1000)
    })
}


// switch to game screen
const startGame = () => {
    startScreen.classList.add('hidden')
    battleScreen.classList.remove('hidden')
    controls.classList.remove('hidden')
}



console.log('%c spacebattle', 'font-size: 40px; color: purple', )