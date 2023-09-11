function Photometer () {
    basic.clearScreen()
    while (!(input.pinIsPressed(TouchPin.P1))) {
        if (Version != 1) {
            datalogger.log(datalogger.createCV("Photometer", input.lightLevel()))
        }
        music.play(music.tonePlayable(Math.map(input.lightLevel(), 0, 255, 131, 966), music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
    }
}
datalogger.onLogFull(function () {
    datalogger.deleteLog()
})
function NumberSelector () {
    CurrentValue += 0
    basic.showNumber(CurrentValue)
    while (!(input.pinIsPressed(TouchPin.P1))) {
        if (input.buttonIsPressed(Button.A)) {
            CurrentValue += -1
            basic.showNumber(CurrentValue)
        } else if (input.buttonIsPressed(Button.B)) {
            CurrentValue += 1
            basic.showNumber(CurrentValue)
        } else if (input.logoIsPressed() || input.pinIsPressed(TouchPin.P0)) {
            if (firstPass) {
                firstAndFinalValue = CurrentValue
                firstPass = false
            } else {
                secondValue = CurrentValue
                break;
            }
        } else if (input.pinIsPressed(TouchPin.P1)) {
            Quit()
        }
    }
}
function Compass () {
    input.calibrateCompass()
    while (!(input.pinIsPressed(TouchPin.P1))) {
        basic.pause(333)
        if (input.compassHeading() >= 315 || input.compassHeading() <= 45) {
            basic.showLeds(`
                # . . . #
                # # . . #
                # . # . #
                # . . # #
                # . . . #
                `)
        } else if (input.compassHeading() >= 45 && input.compassHeading() <= 135) {
            basic.showLeds(`
                # # # # #
                # . . . .
                # # # # #
                # . . . .
                # # # # #
                `)
        } else if (input.compassHeading() >= 135 && input.compassHeading() <= 225) {
            basic.showLeds(`
                . # # # #
                # . . . .
                . # # # .
                . . . . #
                # # # # .
                `)
        } else if (input.compassHeading() >= 225 && input.compassHeading() <= 315) {
            basic.showLeds(`
                # . . . #
                # . . . #
                # . # . #
                # . # . #
                . # . # .
                `)
        }
        datalogger.log(datalogger.createCV("Compass", input.compassHeading()))
    }
}
function Utilities () {
    datalogger.includeTimestamp(FlashLogTimeStampFormat.Milliseconds)
    utilitiesPage[0].showImage(0)
    Page = 0
    while (input.pinIsPressed(TouchPin.P0) || input.logoIsPressed() || input.pinIsPressed(TouchPin.P1)) {
    	
    }
    while (!(input.pinIsPressed(TouchPin.P1))) {
        if (input.buttonIsPressed(Button.B) && Page < utilitiesPage.length - 1) {
            Page += 1
            utilitiesPage[Page].showImage(0)
        } else if (input.buttonIsPressed(Button.A) && Page > 0) {
            Page += -1
            utilitiesPage[Page].showImage(0)
        } else if (input.pinIsPressed(TouchPin.P0) || input.logoIsPressed()) {
            basic.clearScreen()
            UtilityApps()
            utilitiesPage[Page].showImage(0, 0)
            while (input.pinIsPressed(TouchPin.P0) || input.logoIsPressed() || input.pinIsPressed(TouchPin.P1)) {
            	
            }
        }
    }
    Page = 5
    datalogger.includeTimestamp(FlashLogTimeStampFormat.None)
    Home()
}
bluetooth.onBluetoothDisconnected(function () {
    bluetoothConnected = false
})
bluetooth.onBluetoothConnected(function () {
    bluetoothConnected = true
})
function Tilt () {
    game.resume()
    tiltPointer = game.createSprite(2, 2)
    while (!(input.pinIsPressed(TouchPin.P1))) {
        if (Version != 1 && (input.logoIsPressed() || (input.buttonIsPressed(Button.A) || (input.buttonIsPressed(Button.B) || input.pinIsPressed(TouchPin.P0))))) {
            datalogger.log(
            datalogger.createCV("TiltX", input.rotation(Rotation.Roll)),
            datalogger.createCV("TiltY", input.rotation(Rotation.Pitch)),
            datalogger.createCV("TiltZ", input.compassHeading())
            )
        }
        tiltPointer.set(LedSpriteProperty.X, input.rotation(Rotation.Roll) + 2)
        tiltPointer.set(LedSpriteProperty.Y, input.rotation(Rotation.Pitch) + 2)
    }
    game.pause()
}
function Home () {
    basic.clearScreen()
    HomeDisplay[Page].showImage(0, 0)
    while (input.pinIsPressed(TouchPin.P0) || input.logoIsPressed() || input.buttonIsPressed(Button.AB)) {
    	
    }
    while (!(input.pinIsPressed(TouchPin.P0) || input.logoIsPressed())) {
        basic.pause(50)
        if (input.buttonIsPressed(Button.B) && Page < HomeDisplay.length - 1) {
            Page += 1
            HomeDisplay[Page].showImage(0, 200)
        } else if (input.buttonIsPressed(Button.A) && Page > 0) {
            Page += -1
            HomeDisplay[Page].showImage(0, 200)
        }
    }
    basic.clearScreen()
    Apps()
}
function Settings () {
    Page = 0
    settingsPage[Page].showImage(0, 400)
    while (!(input.pinIsPressed(TouchPin.P1))) {
        basic.pause(50)
        if (input.buttonIsPressed(Button.A) && Page != 0) {
            Page += -1
            settingsPage[Page].showImage(0, 400)
        } else if (input.buttonIsPressed(Button.B) && Page != 2) {
            Page += 1
            settingsPage[Page].showImage(0, 400)
        } else if (input.pinIsPressed(TouchPin.P0) || input.logoIsPressed()) {
            if (Page != 2) {
                if (slider09 == -1 && Page == 1) {
                    basic.showString("A")
                } else {
                    basic.showNumber(slider09)
                }
                while (!(input.pinIsPressed(TouchPin.P1))) {
                    if (input.buttonIsPressed(Button.A)) {
                        if (slider09 != -1 && Page == 1 || slider09 != 0 && Page != 1) {
                            slider09 += -1
                            if (slider09 == -1 && Page == 1) {
                                basic.showString("A")
                            } else {
                                basic.showNumber(slider09)
                            }
                        }
                    } else if (input.buttonIsPressed(Button.B) && slider09 != 9) {
                        slider09 += 1
                        basic.showNumber(slider09)
                    } else if (input.pinIsPressed(TouchPin.P0) || input.logoIsPressed()) {
                        if (Page == 1) {
                            if (slider09 == -1) {
                                autoBrightness = true
                            } else if (slider09 == 0) {
                                autoBrightness = false
                                led.setBrightness(1)
                            } else {
                                autoBrightness = false
                                led.setBrightness(Math.map(slider09, 0, 9, 0, 255))
                            }
                        } else if (Page == 0) {
                            if (slider09 == 0) {
                            	
                            }
                            if (slider09 == 0) {
                                if (Version != 1) {
                                    music.setBuiltInSpeakerEnabled(false)
                                }
                                pins.setAudioPinEnabled(false)
                                music.setVolume(0)
                            } else {
                                if (Version != 1) {
                                    music.setBuiltInSpeakerEnabled(true)
                                }
                                pins.setAudioPinEnabled(true)
                                music.setVolume(Math.map(slider09, 0, 9, 0, 255))
                            }
                        }
                    }
                }
            }
            if (Page == 2) {
                basic.clearScreen()
                basic.showString("h")
                basic.clearScreen()
                while (!(input.pinIsPressed(TouchPin.P0) || input.logoIsPressed() || input.pinIsPressed(TouchPin.P1))) {
                    if (input.buttonIsPressed(Button.A)) {
                        timeanddate.advanceBy(-1, timeanddate.TimeUnit.Hours)
                    } else if (input.buttonIsPressed(Button.B)) {
                        timeanddate.advanceBy(1, timeanddate.TimeUnit.Hours)
                    }
                    basic.showString(timeanddate.time(timeanddate.TimeFormat.HHMM24hr), 75)
                }
                basic.clearScreen()
                basic.showString("m")
                basic.clearScreen()
                while (input.pinIsPressed(TouchPin.P0) || input.logoIsPressed()) {
                	
                }
                while (!(input.pinIsPressed(TouchPin.P0) || input.logoIsPressed() || input.pinIsPressed(TouchPin.P1))) {
                    if (input.buttonIsPressed(Button.A)) {
                        timeanddate.advanceBy(-1, timeanddate.TimeUnit.Minutes)
                    } else if (input.buttonIsPressed(Button.B)) {
                        timeanddate.advanceBy(1, timeanddate.TimeUnit.Minutes)
                    }
                    basic.showString(timeanddate.time(timeanddate.TimeFormat.HHMM24hr), 75)
                }
                while (input.pinIsPressed(TouchPin.P0) || input.logoIsPressed()) {
                    basic.showLeds(`
                        . . . . .
                        . . . . #
                        . . . # .
                        # . # . .
                        . # . . .
                        `)
                }
            }
            break;
        }
    }
    Page = 0
    Home()
}
function Accelerometer () {
    while (!(input.pinIsPressed(TouchPin.P1))) {
        if (Version != 1) {
            datalogger.log(datalogger.createCV("Accelerometer", input.acceleration(Dimension.Strength)))
        }
        music.play(music.tonePlayable(input.acceleration(Dimension.Strength) / 10, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
    }
}
function Flashlight () {
    led.setBrightness(255)
    Page = 0
    while (!(input.pinIsPressed(TouchPin.P1))) {
        if (Page == 0) {
            images.createImage(`
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                `).showImage(0)
            while (Page == 0 && !(input.pinIsPressed(TouchPin.P1))) {
                if (input.buttonIsPressed(Button.B)) {
                    Page = 1
                }
            }
        } else if (Page == 1) {
            while (Page == 1 && !(input.pinIsPressed(TouchPin.P1))) {
                if (input.buttonIsPressed(Button.B)) {
                    Page = 2
                } else if (input.buttonIsPressed(Button.A)) {
                    Page = 0
                }
                images.createImage(`
                    . . . . .
                    . . . . .
                    . . . . .
                    . . . . .
                    . . . . .
                    `).showImage(0)
                if (input.buttonIsPressed(Button.B)) {
                    Page = 2
                    break;
                } else if (input.buttonIsPressed(Button.A)) {
                    Page = 0
                } else if (input.pinIsPressed(TouchPin.P1)) {
                    Page = 7
                    break;
                }
                images.createImage(`
                    # # # # #
                    # # # # #
                    # # # # #
                    # # # # #
                    # # # # #
                    `).showImage(0)
            }
        } else if (Page == 2) {
            while (Page == 2 && !(input.pinIsPressed(TouchPin.P1))) {
                basic.pause(50)
                if (input.buttonIsPressed(Button.A)) {
                    Page = 1
                }
                images.createImage(`
                    . . . . .
                    . . . . .
                    . . . . .
                    . . . . .
                    . . . . .
                    `).showImage(0, 0)
                basic.pause(50)
                if (input.buttonIsPressed(Button.A)) {
                    Page = 1
                }
                images.createImage(`
                    # # # # #
                    # # # # #
                    # # # # #
                    # # # # #
                    # # # # #
                    `).showImage(0, 0)
            }
        }
        basic.pause(200)
    }
    led.setBrightness(0)
    Page = 7
    Utilities()
}
function Calculator () {
    firstPass = true
    basic.showNumber(firstAndFinalValue)
    Page = 0
    CurrentValue = 0
    while (!(input.pinIsPressed(TouchPin.P1))) {
        while (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B) || (input.pinIsPressed(TouchPin.P0) || input.logoIsPressed())) {
            basic.clearScreen()
            basic.showNumber(firstAndFinalValue)
        }
        if (firstPass) {
            NumberSelector()
        }
        Operators[Page].showImage(0)
        while (!(input.pinIsPressed(TouchPin.P0) || input.logoIsPressed())) {
            if (input.buttonIsPressed(Button.B) && Page < 5) {
                Page += 1
                Operators[Page].showImage(0)
            } else if (input.buttonIsPressed(Button.A) && Page > 0) {
                Page += -1
                Operators[Page].showImage(0)
            } else if (input.pinIsPressed(TouchPin.P1)) {
                Quit()
            }
        }
        basic.clearScreen()
        if (Page == 5) {
            datalogger.log(datalogger.createCV("CalResult", "The square root of " + firstAndFinalValue + " equals " + Math.sqrt(firstAndFinalValue)))
            firstAndFinalValue = Math.sqrt(firstAndFinalValue)
            CurrentValue = 0
            basic.showNumber(firstAndFinalValue)
        } else {
            CurrentValue = 0
            basic.showNumber(CurrentValue)
        }
        while (input.pinIsPressed(TouchPin.P0) || input.logoIsPressed()) {
        	
        }
        NumberSelector()
        if (Page == 0) {
            datalogger.log(datalogger.createCV("CalResult", "" + firstAndFinalValue + " + " + secondValue + " = " + (firstAndFinalValue + secondValue)))
            firstAndFinalValue = firstAndFinalValue + secondValue
        } else if (Page == 1) {
            datalogger.log(datalogger.createCV("CalResult", "" + firstAndFinalValue + " - " + secondValue + " = " + (firstAndFinalValue - secondValue)))
            firstAndFinalValue = firstAndFinalValue - secondValue
        } else if (Page == 2) {
            datalogger.log(datalogger.createCV("CalResult", "" + firstAndFinalValue + " × " + secondValue + " = " + firstAndFinalValue * secondValue))
            firstAndFinalValue = firstAndFinalValue * secondValue
        } else if (Page == 3) {
            datalogger.log(datalogger.createCV("CalResult", "" + firstAndFinalValue + " ÷ " + secondValue + " = " + firstAndFinalValue / secondValue))
            firstAndFinalValue = firstAndFinalValue / secondValue
        } else if (Page == 4) {
            datalogger.log(datalogger.createCV("CalResult", "" + firstAndFinalValue + " ^ " + secondValue + " = " + firstAndFinalValue ** secondValue))
            firstAndFinalValue = firstAndFinalValue ** secondValue
        } else if (Page == 5) {
            firstAndFinalValue = Math.sqrt(secondValue)
            datalogger.log(datalogger.createCV("CalResult", "The square root of " + secondValue + " equals " + firstAndFinalValue))
        }
    }
}
function Bluetooth () {
    Page = 0
    basic.showLeds(`
        . # # # #
        . # . . #
        . # . . #
        . # . . #
        # # . # #
        `)
    while (!(input.pinIsPressed(TouchPin.P1))) {
        if (input.buttonIsPressed(Button.A)) {
            basic.showLeds(`
                . # # # #
                . # . . #
                . # . . #
                . # . . #
                # # . # #
                `)
            Page = 0
        } else if (input.buttonIsPressed(Button.B)) {
            basic.showLeds(`
                # # . # #
                # # . # .
                # # . # .
                # . . # .
                # . . # #
                `)
            Page = 1
        } else if (input.pinIsPressed(TouchPin.P0) || input.logoIsPressed()) {
            if (Page == 0) {
                while (!(input.pinIsPressed(TouchPin.P1))) {
                    basic.pause(120)
                    if (input.buttonIsPressed(Button.AB)) {
                        media.sendCode(media.keys(media._MediaKey.playPause))
                        basic.showLeds(`
                            . . . . .
                            # . . # #
                            # # . # #
                            # . . # #
                            . . . . .
                            `)
                    } else if (input.buttonIsPressed(Button.A)) {
                        media.sendCode(media.keys(media._MediaKey.previous))
                        basic.showLeds(`
                            # . . . #
                            # . . # #
                            # . # # #
                            # . . # #
                            # . . . #
                            `)
                    } else if (input.buttonIsPressed(Button.B)) {
                        media.sendCode(media.keys(media._MediaKey.next))
                        basic.showLeds(`
                            # . . . #
                            # # . . #
                            # # # . #
                            # # . . #
                            # . . . #
                            `)
                    } else if (input.pinIsPressed(TouchPin.P0)) {
                        media.sendCode(media.keys(media._MediaKey.vol_down))
                        basic.showLeds(`
                            . . . . .
                            . . . . .
                            # # # # #
                            . . . . .
                            . . . . .
                            `)
                    } else if (input.pinIsPressed(TouchPin.P2)) {
                        media.sendCode(media.keys(media._MediaKey.vol_up))
                        basic.showLeds(`
                            . . # . .
                            . . # . .
                            # # # # #
                            . . # . .
                            . . # . .
                            `)
                    } else if (input.logoIsPressed()) {
                        media.sendCode(media.keys(media._MediaKey.mute))
                        basic.showLeds(`
                            # . . . #
                            . # . # .
                            . . # . .
                            . # . # .
                            # . . . #
                            `)
                    }
                    basic.clearScreen()
                }
                Bluetooth()
            } else if (Page == 1) {
                bluetooth.setTransmitPower(7)
                basic.clearScreen()
                led.enable(false)
                while (!(input.pinIsPressed(TouchPin.P1))) {
                    mouse.send(
                    rollAvg * 1.8,
                    pitchAvg * 1.8,
                    input.buttonIsPressed(Button.A),
                    input.buttonIsPressed(Button.AB) || input.logoIsPressed(),
                    input.buttonIsPressed(Button.B),
                    0,
                    true
                    )
                }
                led.enable(true)
                bluetooth.setTransmitPower(0)
                Bluetooth()
            }
        }
    }
    Home()
}
function Magnetometer () {
    while (!(input.pinIsPressed(TouchPin.P1))) {
        if (Version != 1) {
            datalogger.log(datalogger.createCV("Magnetometer", input.magneticForce(Dimension.Strength)))
        }
        music.play(music.tonePlayable(input.magneticForce(Dimension.Strength), music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
    }
}
function Quit () {
    Page = 2
    firstAndFinalValue = 0
    secondValue = 0
    CurrentValue = 0
    firstPass = true
    Home()
}
function Time () {
    while (!(input.pinIsPressed(TouchPin.P1))) {
        basic.showString(timeanddate.time(timeanddate.TimeFormat.HHMM24hr))
        if (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B)) {
            if (alarmSet) {
                alarmSet = false
                basic.showIcon(IconNames.No)
                music.play(music.tonePlayable(988, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
                music.rest(music.beat(BeatFraction.Eighth))
                music.play(music.tonePlayable(988, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
                music.rest(music.beat(BeatFraction.Eighth))
                music.play(music.tonePlayable(988, music.beat(BeatFraction.Eighth)), music.PlaybackMode.InBackground)
            } else {
                let minute = 0
                let hour = 0
                images.createBigImage(`
                    . # # # . . . # . .
                    # . # . # . # # . .
                    # . # # # . # # # .
                    # . . . # . # # . .
                    . # # # . . . # . .
                    `).scrollImage(5, 400)
                basic.showString("h")
                Alarm[0] = hour
                basic.showNumber(Alarm[0])
                while (!(input.pinIsPressed(TouchPin.P0) || input.logoIsPressed() || input.pinIsPressed(TouchPin.P1))) {
                    if (input.buttonIsPressed(Button.A) && Alarm[0] != 0) {
                        Alarm[0] = Alarm[0] - 1
                        basic.showNumber(Alarm[0])
                    } else if (input.buttonIsPressed(Button.B) && Alarm[0] != 24) {
                        Alarm[0] = Alarm[0] + 1
                        basic.showNumber(Alarm[0])
                    }
                }
                basic.showString("m")
                Alarm[1] = minute
                basic.showNumber(Alarm[1])
                while (!(input.pinIsPressed(TouchPin.P0) || input.logoIsPressed() || input.pinIsPressed(TouchPin.P1))) {
                    if (input.buttonIsPressed(Button.A) && Alarm[1] != 0) {
                        Alarm[1] = Alarm[1] - 1
                        basic.showNumber(Alarm[1])
                    } else if (input.buttonIsPressed(Button.B) && Alarm[0] != 60) {
                        Alarm[1] = Alarm[1] + 1
                        basic.showNumber(Alarm[1])
                    }
                }
                alarmSet = true
                basic.showIcon(IconNames.Yes)
                music.play(music.tonePlayable(988, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
                music.rest(music.beat(BeatFraction.Eighth))
                music.play(music.tonePlayable(988, music.beat(BeatFraction.Eighth)), music.PlaybackMode.InBackground)
            }
        }
    }
    basic.clearScreen()
    Utilities()
}
function Ping_pong_game () {
    point = 0
    interval = 500
    ball_x = 3
    ball_y = 4
    ball_dx = -1
    ball_dy = -1
    bar_x = 0
    led.plot(ball_x, ball_y)
    led.plot(bar_x, 4)
    led.plot(bar_x + 1, 4)
    in_game = true
    while (in_game) {
        if (input.buttonIsPressed(Button.A)) {
            if (bar_x > 0) {
                led.unplot(bar_x + 1, 4)
                bar_x = bar_x - 1
                led.plot(bar_x, 4)
            }
        } else if (input.buttonIsPressed(Button.B)) {
            if (bar_x < 3) {
                led.unplot(bar_x, 4)
                bar_x = bar_x + 1
                led.plot(bar_x + 1, 4)
            }
        }
        if (ball_x + ball_dx > 4) {
            if (Version != 1) {
                music.play(music.createSoundExpression(WaveShape.Square, 200, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
            } else {
                music.play(music.tonePlayable(131, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
            }
            ball_dx = ball_dx * -1
        } else if (ball_x + ball_dx < 0) {
            if (Version != 1) {
                music.play(music.createSoundExpression(WaveShape.Square, 200, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
            } else {
                music.play(music.tonePlayable(131, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
            }
            ball_dx = ball_dx * -1
        }
        if (ball_y + ball_dy < 0) {
            if (Version != 1) {
                music.play(music.createSoundExpression(WaveShape.Square, 200, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
            } else {
                music.play(music.tonePlayable(131, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
            }
            ball_dy = ball_dy * -1
        } else if (ball_y + ball_dy > 3) {
            if (led.point(ball_x + ball_dx, ball_y + ball_dy) && !(input.pinIsPressed(TouchPin.P1))) {
                if (Version != 1) {
                    music.play(music.createSoundExpression(WaveShape.Noise, 54, 54, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                } else {
                    music.play(music.tonePlayable(175, music.beat(BeatFraction.Quarter)), music.PlaybackMode.InBackground)
                }
                ball_dy = ball_dy * -1
                point = point + 1
                if (interval - 10 >= 0) {
                    interval = interval - 10
                }
            } else {
                break;
            }
        }
        if (in_game) {
            led.plot(ball_x + ball_dx, ball_y + ball_dy)
            led.unplot(ball_x, ball_y)
            ball_x = ball_x + ball_dx
            ball_y = ball_y + ball_dy
            basic.pause(interval)
        } else {
            game.setScore(point)
        }
    }
    basic.showNumber(point)
    Home()
}
function UtilityApps () {
    if (Page == 0) {
        Temperature()
    } else if (Page == 1) {
        Time()
    } else if (Page == 2) {
        Flashlight()
    } else if (Page == 3) {
        Accelerometer()
    } else if (Page == 4) {
        Magnetometer()
    } else if (Page == 5) {
        Compass()
    } else if (Page == 6) {
        Photometer()
    } else if (Page == 7) {
        Tilt()
    }
}
function Temperature () {
    Page = 0
    while (!(input.pinIsPressed(TouchPin.P1))) {
        if (Page == 0) {
            if (input.buttonIsPressed(Button.B)) {
                Page = 1
            } else {
                basic.showString("" + Math.round(input.temperature() - 4.5) + "C")
            }
        } else if (Page == 1) {
            if (input.buttonIsPressed(Button.A)) {
                Page = 0
            } else {
                basic.showString("" + Math.round(Math.map(input.temperature() - 4.5, -40, 105, -40, 221)) + "F")
            }
        }
        datalogger.log(datalogger.createCV("Temperature", Math.round(input.temperature() - 4.5)))
    }
    Utilities()
}
function PowerApp () {
    if (bluetoothConnected) {
        music.play(music.tonePlayable(330, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        music.rest(music.beat(BeatFraction.Half))
        music.play(music.tonePlayable(330, music.beat(BeatFraction.Half)), music.PlaybackMode.InBackground)
        basic.showLeds(`
            . . # # .
            # . # . #
            . # # # .
            # . # . #
            . . # # .
            `)
        basic.clearScreen()
        basic.pause(200)
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . . . . .
            . . # . .
            `, 600)
basic.clearScreen()
        basic.pause(500)
    }
    for (let index = 0; index < 2; index++) {
        images.createBigImage(`
            . . . . . . . . . .
            . # . . . . . # . .
            # # . . . . # # . .
            . # . . . . . # . .
            . . . . . . . . . .
            `).scrollImage(5, 200)
    }
    if (media.isEnabled() || Version == 1) {
        led.enable(false)
        while (!(input.buttonIsPressed(Button.A)) && media.isEnabled()) {
        	
        }
        if (!(media.isEnabled())) {
            power.lowPowerRequest()
            power.fullPowerOn(FullPowerSource.A)
        }
        led.enable(true)
    } else {
        power.lowPowerRequest()
        power.fullPowerOn(FullPowerSource.A)
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
        Ping_pong_game()
    } else if (Page == 4) {
        Bluetooth()
    } else if (Page == 5) {
        Utilities()
    }
}
let Roll: number[] = []
let Pitch: number[] = []
let alarmFired = false
let in_game = false
let bar_x = 0
let ball_dy = 0
let ball_dx = 0
let ball_y = 0
let ball_x = 0
let interval = 0
let point = 0
let Alarm: number[] = []
let alarmSet = false
let pitchAvg = 0
let rollAvg = 0
let Operators: Image[] = []
let autoBrightness = false
let slider09 = 0
let settingsPage: Image[] = []
let HomeDisplay: Image[] = []
let tiltPointer: game.LedSprite = null
let bluetoothConnected = false
let Page = 0
let utilitiesPage: Image[] = []
let secondValue = 0
let firstAndFinalValue = 0
let firstPass = false
let CurrentValue = 0
let Version = 0
media.startMediaService()
mouse.startMouseService()
control.inBackground(function () {
    timeanddate.set24HourTime(18, 30, 0)
    bluetooth.setTransmitPower(0)
    datalogger.includeTimestamp(FlashLogTimeStampFormat.None)
    led.setBrightness(255)
    Alarm = [0, 1]
    alarmSet = false
    HomeDisplay = [
    images.createImage(`
        . . # . .
        . # # # .
        . . # # #
        . # . # .
        # . . . .
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
        . # . . .
        . . . . .
        . . . . .
        . . # # .
        `),
    images.createImage(`
        . . # # .
        # . # . #
        . # # # .
        # . # . #
        . . # # .
        `),
    images.createImage(`
        . . . . #
        # . . # #
        # # . # #
        . # # # .
        . # # # .
        `)
    ]
    Operators = [
    images.createImage(`
        . . # . .
        . . # . .
        # # # # #
        . . # . .
        . . # . .
        `),
    images.createImage(`
        . . . . .
        . . . . .
        # # # # #
        . . . . .
        . . . . .
        `),
    images.createImage(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `),
    images.createImage(`
        . . # . .
        . . . . .
        # # # # #
        . . . . .
        . . # . .
        `),
    images.createImage(`
        . . # . .
        . # . # .
        # . . . #
        . . . . .
        . . . . .
        `),
    images.createImage(`
        . . . . .
        . . . # #
        . . # . .
        # . # . .
        . # . . .
        `)
    ]
    settingsPage = [images.createImage(`
        . # . # .
        # # . . #
        # # # . #
        # # . . #
        . # . # .
        `), images.createImage(`
        . . # . .
        . # # # .
        . . . . .
        . # . # .
        # . # . #
        `), images.createImage(`
        . # # # .
        # . # . #
        # . # # #
        # . . . #
        . # # # .
        `)]
    utilitiesPage = [
    images.createImage(`
        . . # . .
        . . # . .
        . . # . .
        . # # # .
        . . # . .
        `),
    images.createImage(`
        . # # # .
        # . # . #
        # . # # #
        # . . . #
        . # # # .
        `),
    images.createImage(`
        . # # # .
        . # # # .
        . . # . .
        . . # . .
        . . # . .
        `),
    images.createImage(`
        . # # # .
        # . . . .
        # . # # #
        # . . . #
        . # # # .
        `),
    images.createImage(`
        # . . . #
        # # . # #
        # . # . #
        # . . . #
        # . . . #
        `),
    images.createImage(`
        . # # # .
        # . . . .
        # . . . .
        # . . . .
        . # # # .
        `),
    images.createImage(`
        # # # # .
        # . . . #
        # # # # .
        # . . . .
        # . . . .
        `),
    images.createImage(`
        # # # # #
        . . # . .
        . . # . .
        . . # . .
        . . # . .
        `)
    ]
    Page = 1
})
loops.everyInterval(2000, function () {
    if (autoBrightness) {
        if (input.lightLevel() < 191) {
            led.setBrightness(input.lightLevel() * 1.2 + 3)
        } else {
            led.setBrightness(input.lightLevel() * 2)
        }
    }
    if (alarmSet) {
        timeanddate.numericTime(function (hour, minute, second, month, day, year) {
            if ("" + hour + minute == "" + Alarm[0] + Alarm[1] && !(alarmFired)) {
                alarmFired = true
                basic.showLeds(`
                    . # # # .
                    # . # . #
                    # . # # #
                    # . . . #
                    . # # # .
                    `)
                while (!(input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B))) {
                    for (let index = 0; index < 4; index++) {
                        music.play(music.tonePlayable(932, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
                        music.rest(music.beat(BeatFraction.Eighth))
                    }
                    basic.pause(333)
                }
            } else if ("" + hour + minute != "" + Alarm[0] + Alarm[1] && alarmFired) {
                alarmFired = false
            }
        })
    }
})
control.inBackground(function () {
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
})
control.inBackground(function () {
    pins.setAudioPin(AnalogPin.P2)
    music.play(music.tonePlayable(294, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
    music.play(music.tonePlayable(330, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
    music.rest(music.beat(BeatFraction.Eighth))
    music.play(music.tonePlayable(330, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
    music.play(music.tonePlayable(392, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
    music.rest(music.beat(BeatFraction.Eighth))
    music.play(music.tonePlayable(370, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
    music.rest(music.beat(BeatFraction.Eighth))
    music.play(music.tonePlayable(392, music.beat(BeatFraction.Half)), music.PlaybackMode.InBackground)
})
control.inBackground(function () {
    while (true) {
        while (mouse.isEnabled()) {
            basic.pause(1)
            Pitch = [
            input.rotation(Rotation.Pitch),
            Pitch[0],
            Pitch[1],
            Pitch[2],
            Pitch[3],
            Pitch[4],
            Pitch[5],
            Pitch[6]
            ]
            pitchAvg = (Pitch[0] + (Pitch[1] + (Pitch[2] + Pitch[3])) + (Pitch[4] + (Pitch[5] + Pitch[6]))) / 8
            Roll = [
            input.rotation(Rotation.Roll),
            Roll[0],
            Roll[1],
            Roll[2],
            Roll[3],
            Roll[4],
            Roll[5],
            Roll[6]
            ]
            rollAvg = (Roll[0] + (Roll[1] + (Roll[2] + (Roll[3] + (Roll[4] + (Roll[5] + Roll[6])))))) / 8
        }
        basic.pause(1000)
    }
})
