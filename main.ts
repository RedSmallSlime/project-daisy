function Stacker () {
    game.resume()
    playerCursor = game.createSprite(2, 4)
    while (true) {
        if (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B)) {
            music.play(music.tonePlayable(262, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
            if (Blocks == 0) {
                Block = game.createSprite(playerCursor.get(LedSpriteProperty.X), 4)
                Blocks = 1
                playerCursor.change(LedSpriteProperty.Y, -1)
            } else if (Blocks == 1 && playerCursor.get(LedSpriteProperty.X) == Block.get(LedSpriteProperty.X)) {
                Block0 = game.createSprite(Block.get(LedSpriteProperty.X), 3)
                Blocks = 2
                playerCursor.change(LedSpriteProperty.Y, -1)
            } else if (Blocks == 2 && playerCursor.get(LedSpriteProperty.X) == Block.get(LedSpriteProperty.X)) {
                Block1 = game.createSprite(Block.get(LedSpriteProperty.X), 2)
                Blocks = 3
                playerCursor.change(LedSpriteProperty.Y, -1)
            } else if (Blocks == 3 && playerCursor.get(LedSpriteProperty.X) == Block.get(LedSpriteProperty.X)) {
                Block2 = game.createSprite(Block.get(LedSpriteProperty.X), 1)
                Blocks = 4
                playerCursor.change(LedSpriteProperty.Y, -1)
            } else if (Blocks == 4 && playerCursor.get(LedSpriteProperty.X) == Block.get(LedSpriteProperty.X)) {
                Blocks = 5
                music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.UntilDone)
                playerCursor.set(LedSpriteProperty.Y, 2)
                Block2.delete()
                Block1.delete()
            } else if (Blocks == 5 && playerCursor.get(LedSpriteProperty.X) == Block.get(LedSpriteProperty.X)) {
                Block1 = game.createSprite(playerCursor.get(LedSpriteProperty.X), 2)
                Blocks = 6
                playerCursor.change(LedSpriteProperty.Y, -1)
            } else if (Blocks == 6 && playerCursor.get(LedSpriteProperty.X) == Block.get(LedSpriteProperty.X)) {
                Block2 = game.createSprite(playerCursor.get(LedSpriteProperty.X), 1)
                Blocks = 7
                playerCursor.change(LedSpriteProperty.Y, -1)
            } else if (Blocks == 7 && playerCursor.get(LedSpriteProperty.X) == Block.get(LedSpriteProperty.X)) {
                music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Punchline), music.PlaybackMode.UntilDone)
                break;
            } else {
                music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Wawawawaa), music.PlaybackMode.UntilDone)
                break;
            }
            while (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B)) {
                playerCursor.move(1)
                if (playerCursor.isTouchingEdge()) {
                    playerCursor.ifOnEdgeBounce()
                    music.play(music.tonePlayable(311, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
                }
                if (Blocks == 2) {
                    basic.pause(145)
                } else if (Blocks == 5) {
                    basic.pause(130)
                } else if (Blocks == 7) {
                    basic.pause(110)
                } else {
                    basic.pause(175)
                }
            }
        } else if (input.pinIsPressed(TouchPin.P1)) {
            break;
        }
        playerCursor.move(1)
        if (playerCursor.get(LedSpriteProperty.X) == 0 || playerCursor.get(LedSpriteProperty.X) == 4) {
            playerCursor.ifOnEdgeBounce()
            music.play(music.tonePlayable(523, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
        }
        if (Blocks >= 7) {
            basic.pause(90)
        } else if (Blocks >= 5) {
            basic.pause(110)
        } else if (Blocks >= 2) {
            basic.pause(130)
        } else {
            basic.pause(160)
        }
    }
    if (Blocks == 1) {
        Block.delete()
    } else if (Blocks == 2) {
        Block.delete()
        Block0.delete()
    } else if (Blocks == 3) {
        Block.delete()
        Block0.delete()
        Block1.delete()
    } else if (Blocks == 4) {
        Block.delete()
        Block0.delete()
        Block1.delete()
        Block2.delete()
    }
    Blocks = 0
    playerCursor.delete()
    game.pause()
    Home()
}
function NumberSelector () {
    CurrentValue += 0
    while (true) {
        if (input.buttonIsPressed(Button.A)) {
            CurrentValue += -1
            basic.showNumber(CurrentValue)
        } else if (input.buttonIsPressed(Button.B)) {
            CurrentValue += 1
            basic.showNumber(CurrentValue)
        } else if ((input.logoIsPressed() || input.pinIsPressed(TouchPin.P0)) && firstPass == false) {
            secondValue = CurrentValue
            break;
        } else if (input.pinIsPressed(TouchPin.P0) || input.logoIsPressed()) {
            firstAndFinalValue = CurrentValue
            firstPass = false
            break;
        } else if (input.pinIsPressed(TouchPin.P1)) {
            Quit()
        }
    }
}
function HomePages () {
    HomeDisplay[Page].showImage(0, 300)
}
function Home () {
    Page = 1
    basic.clearScreen()
    basic.pause(16)
    HomePages()
    while (input.pinIsPressed(TouchPin.P0) || input.logoIsPressed() || input.buttonIsPressed(Button.AB)) {
    	
    }
    while (true) {
        if (input.buttonIsPressed(Button.B) && Page < HomeDisplay.length - 1) {
            Page += 1
            HomePages()
        } else if (input.buttonIsPressed(Button.A) && Page > 0) {
            Page += -1
            HomePages()
        } else if (input.pinIsPressed(TouchPin.P0) || input.logoIsPressed()) {
            Apps()
        }
    }
}
function Settings () {
    Page = 0
    basic.showLeds(`
        . . # . .
        . # # # .
        . . . . .
        . # . # .
        # . # . #
        `)
    while (true) {
        if (input.buttonIsPressed(Button.A) && Page != 0) {
            Page += -1
            basic.showLeds(`
                . . # . .
                . # # # .
                . . . . .
                . # . # .
                # . # . #
                `)
        } else if (input.buttonIsPressed(Button.B) && Page != 1) {
            Page += 1
            basic.showLeds(`
                . # . # .
                # # . . #
                # # # . #
                # # . . #
                . # . # .
                `)
        } else if (input.pinIsPressed(TouchPin.P0) || input.logoIsPressed()) {
            basic.showNumber(slider09)
            while (true) {
                if (input.buttonIsPressed(Button.A) && slider09 != 0) {
                    slider09 += -1
                    basic.showNumber(slider09)
                } else if (input.buttonIsPressed(Button.B) && slider09 != 9) {
                    slider09 += 1
                    basic.showNumber(slider09)
                } else if (input.pinIsPressed(TouchPin.P0) || input.logoIsPressed()) {
                    if (Page == 0) {
                        if (slider09 == 0) {
                            led.setBrightness(3)
                        } else {
                            led.setBrightness(Math.map(slider09, 0, 9, 0, 255))
                        }
                    } else if (Page == 1) {
                        music.setVolume(Math.map(slider09, 0, 9, 0, 255))
                    }
                    Settings()
                } else if (input.pinIsPressed(TouchPin.P1)) {
                    Home()
                }
            }
        } else if (input.pinIsPressed(TouchPin.P1)) {
            Home()
        }
    }
}
function Calculator () {
    firstPass = true
    while (true) {
        basic.clearScreen()
        basic.showNumber(firstAndFinalValue)
        CurrentValue = 0
        if (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B) || (input.pinIsPressed(TouchPin.P1) || input.logoIsPressed())) {
            basic.clearScreen()
            basic.showNumber(firstAndFinalValue)
        }
        if (firstPass == true) {
            NumberSelector()
        }
        Operators.showImage(operatorPage)
        while (true) {
            if (input.buttonIsPressed(Button.B) && operatorPage < 25) {
                operatorPage += 5
                Operators.showImage(operatorPage)
            } else if (input.buttonIsPressed(Button.A) && operatorPage > 0) {
                operatorPage += -5
                Operators.showImage(operatorPage)
            } else if (input.pinIsPressed(TouchPin.P0) || input.logoIsPressed()) {
                break;
            } else if (input.pinIsPressed(TouchPin.P1)) {
                Quit()
            }
        }
        if (operatorPage == 25) {
        	
        } else {
            basic.clearScreen()
            CurrentValue = 0
            basic.showNumber(CurrentValue)
            NumberSelector()
        }
        if (operatorPage == 0) {
            firstAndFinalValue = firstAndFinalValue + secondValue
        } else if (operatorPage == 5) {
            firstAndFinalValue = firstAndFinalValue - secondValue
        } else if (operatorPage == 10) {
            firstAndFinalValue = firstAndFinalValue * secondValue
        } else if (operatorPage == 15) {
            firstAndFinalValue = firstAndFinalValue / secondValue
        } else if (operatorPage == 20) {
            firstAndFinalValue = firstAndFinalValue ** secondValue
        } else if (operatorPage == 25) {
            firstAndFinalValue = Math.sqrt(firstAndFinalValue)
        }
    }
}
function Quit () {
    Blocks = 0
    firstAndFinalValue = 0
    secondValue = 0
    operatorPage = 0
    CurrentValue = 0
    firstPass = true
    Home()
}
function PowerApp () {
    for (let index = 0; index < 2; index++) {
        images.createBigImage(`
            . . . . . . . . . .
            . # . . . . . # . .
            # # . . . . # # . .
            . # . . . . . # . .
            . . . . . . . . . .
            `).scrollImage(5, 200)
    }
    if (Version != 1) {
        power.lowPowerRequest()
        power.fullPowerOn(FullPowerSource.A)
    } else {
        led.enable(false)
        while (!(input.buttonIsPressed(Button.A))) {
            basic.pause(100)
        }
        led.enable(true)
    }
    Home()
}
function Apps () {
    if (Page == 0) {
        Settings()
    } else if (Page == 1) {
        PowerApp()
    } else if (Page == 2) {
        Calculator()
    } else if (Page == 3) {
        Stacker()
    }
}
let operatorPage = 0
let slider09 = 0
let firstAndFinalValue = 0
let secondValue = 0
let firstPass = false
let CurrentValue = 0
let Block2: game.LedSprite = null
let Block1: game.LedSprite = null
let Block0: game.LedSprite = null
let Block: game.LedSprite = null
let Blocks = 0
let playerCursor: game.LedSprite = null
let Version = 0
let Page = 0
let HomeDisplay: Image[] = []
led.setBrightness(3)
let Operators: Image = null
pins.setAudioPin(AnalogPin.P2)
Operators = images.createBigImage(`
    . . # . . . . . . . # . . . # . . # . . . . # . . . . . . .
    . . # . . . . . . . . # . # . . . . . . . # . # . . . . # #
    # # # # # # # # # # . . # . . # # # # # # . . . # . . # # .
    . . # . . . . . . . . # . # . . . . . . . . . . . # . # . .
    . . # . . . . . . . # . . . # . . # . . . . . . . . # . . .
    `)
HomeDisplay = [
images.createImage(`
    . # # # .
    . # # # .
    . . # . .
    . . # . .
    . . # . .
    `),
images.createImage(`
    . . # . .
    # . # . #
    # . # . #
    # . . . #
    . # # # .
    `),
images.createImage(`
    . . # . .
    . . . . .
    # # # # #
    . . . . .
    . . # . .
    `),
images.createImage(`
    . . . . .
    . . . # .
    . # . . .
    . # . . .
    . # . . .
    `)
]
radio.setFrequencyBand(0)
Page = 0
images.createBigImage(`
    . . # . . # # # # . . . . . . . . # . .
    . # # # . . . . . # . . . . . . # # . .
    . . . . . . # # # . . . . . . . . # . .
    . . . . . # . . . . # # . . . . . # . .
    . . . . . # # # # # # . . . . . # # # .
    `).scrollImage(5, 500)
basic.clearScreen()
while (Version == 0) {
    if (input.pinIsPressed(TouchPin.P1)) {
        Version = 1
    } else if (input.logoIsPressed()) {
        Version = 2
    }
}
Home()
