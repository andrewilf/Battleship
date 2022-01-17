//all audio files
console.log("start audio")

const clickHover = new Audio('./fx/hoverclick.wav')
const placeDrum = new Audio('./fx/placedowndrum.wav')
const gunfire1 = new Audio('./fx/gunfire1.wav')
const gunfire2 = new Audio('./fx/gunfire2.wav')
const attackmissed = new Audio('./fx/attackmissed.wav')
const victory = new Audio('./fx/victoryclap.wav')
const defeat = new Audio('./fx/defeat.wav')
const heartbeat = new Audio('./fx/heartbeat.wav')

const genericBlip = new Audio('./fx/genericnarrate.wav')
const goodBlip = new Audio('./fx/goodnarrate.wav')
const badBlip = new Audio('./fx/enemynarrate.wav')

const backgroundMusic = new Audio('./fx/pianobackgroundloop.mp3')
const backgroundMusicInterlude = new Audio('./fx/pianobackgroundloop.mp3')

backgroundMusic.loop = true
backgroundMusicInterlude.loop = true
