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
        this. hp = getRandomRange(3,6),
        this.firepower = getRandomRange(2,4),
        this.accuracy = ( getRandomRange(6,8) / 10 ),
        this.isTurn = false,
        this.attackLanded = undefined
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
let remaining = []
console.log(aliens)

alien3.hp = 20

// counter
let counter = 0
// get current enemy
let currentEnemy

const getCurrentEnemy = () => {
    aliens.length ?  
    currentEnemy = aliens[0] : 
    currentEnemy = 'none'
    // console.log(`Player Wins! Aliens eliminated.`)
}

getCurrentEnemy()
console.log(currentEnemy)

// remove eliminated aliens
const removeAliens = () => {
    remaining = []
    counter = 0
    aliens.forEach((alien) => {
        counter++
        // check health
        if(alien.hp > 0){
            // console.log( alien)
            remaining.push(alien)
        }
    })
    aliens = remaining
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
            console.log(`Player 1 hit ${currentEnemy.name} for ${p1.firepower} damage!`)
        } else {
            console.log(currentEnemy.name, `dodged player 1's attack!`)
        }
    } else {
        if(currentEnemy.attackLanded){
            p1.isTurn = true
            currentEnemy.isTurn = false
            console.log(`${currentEnemy.name} hit Player 1 for ${currentEnemy.firepower} damage!`)
        } else {
            console.log(`player 1 dodged ${currentEnemy.name}'s attack!`)
        }
    } 
}


// attack if turn
const attack = () => {

    announceFighters()

    p1.attackLanded = checkAccuracy(p1)
    currentEnemy.attackLanded = checkAccuracy(currentEnemy)
    

    if(p1.isTurn && p1.attackLanded){
        console.log(`PLAYER 1... FIGHT`)
    } else if(currentEnemy.isTurn && currentEnemy.attackLanded){
        console.log(`ALIEN... FIGHT!`)
    }


    if(p1.isTurn && p1.attackLanded){
        console.log(`Player 1 hit ${currentEnemy.name} for ${p1.firepower} damage!`)
        currentEnemy.hp -= p1.firepower
        console.log(`${currentEnemy.name.toUpperCase()} HEALTH NOW AT: ${currentEnemy.hp}`)
    } else if(currentEnemy.isTurn && currentEnemy.attackLanded) {
        console.log(`${currentEnemy.name} hit Player 1 for ${currentEnemy.firepower} damage!`)
        p1.hp -= currentEnemy.firepower
        console.log(`PLAYER 1 HEALTH NOW AT: ${p1.hp}`)
    }

    // only toggle if alien survives
    // if(currentEnemy.hp > p1.firepower){
    //     toggleTurn()
    // }

    removeAliens()
    getCurrentEnemy()
    console.log(`PLAYER HEALTH: ${p1.hp}`)
    console.log(`INCOMING ${currentEnemy.name} HEALTH: ${currentEnemy.hp}`)
    console.log(`REMAINING ALIENS AFTER ATTACK:`, remaining)
    toggleTurn()
    checkWinner()
}

// announce fighters 
const announceFighters = () => {
    console.log(`PLAYER 1 VS. ${currentEnemy.name}`)
}


// check accuracy ... if accurate attack if not miss
const checkAccuracy = (who) => {
    let accuracyGoal = Math.random()
    return accuracyGoal > who.accuracy ? false : true
}
console.log('ACCURACY CHECK p1:',checkAccuracy(p1))
console.log('ACCURACY CHECK', currentEnemy.name + ':',checkAccuracy(currentEnemy))


// check winner
const checkWinner = () => {
    if(currentEnemy === undefined || remaining.length === 0){
        alert(`Congratulations! Player Wins`)
        reset()
    } else if(p1.hp <= 0){
        alert(`Aliens win the galaxy!`)
        reset()
    } else {
        console.log(`-----------------game continues---------------------`)
    }
}


// reset game
const reset = () => {
    // clear console
    console.clear()
    console.log('NEW GAME')
    // reset p1 stats
    p1 = new Player
    // create 6 new aliens
    alien1 = new Alien
    alien2 = new Alien
    alien3 = new Alien
    alien4 = new Alien
    alien5 = new Alien
    alien6 = new Alien

    aliens = [alien1, alien2, alien3, alien4, alien5, alien6]
}