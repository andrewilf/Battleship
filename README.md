# Battleship game v 1.1

![alt text](https://github.com/andrewilf/battleship/blob/main/img/backgroundwgeneralbanner.png?raw=true)
Play here: https://andrewilf.github.io/Battleship/

This project was made during a Software Engineering Immersive course by General Assembly. This was the first project during the course and thus is quite rough in its design with plenty of "janky" design choices.

Should I ever wish to revisit this project, it would likely be rebuilt from scratch on a game engine however feel free to branch the code if for some reason you wish to improve it.

## Game Rules

Battleship is a turn based game where two players are trying to sink the opposing players fleet. Each player has five ships in their fleet of varying sizes and take turns to targets coordinates on the opponents board.

- You start the game by placing your five ships on your grid to the left. Use the mouse wheel to rotate the ship 90 degrees.
- After the ships are placed, you can click a tile on your opponents grid to the right to attack it. If you miss, it will be your opponents turn.
- You cannot attack a coordinate which has already been attacked.
- Any time a player hits a segment of an opposing ship, they get to attack again. A ship is sunk when all parts of it have been hit by the opponent.
- The game continues until one player has sunk of five ships on the opposite site.
- The opponent was programmed to attack randomly. Play on a higher difficulty to up the challenge.

| Difficulty |  Player   |    Opponent |
| ---------- | :-------: | ----------: |
| Easy       | 8x8 board |   7x7 board |
| Medium     | 7x7 board |   9x9 board |
| Hard       | 6x6 board | 10x10 board |

## Technologies used:

- HTML
- CSS
- JavaScript
- JQuery
- JQueryUI

## Areas to improve on/wish list:

- Clean up class declarations
- Use WebAudioAPI rather than Audio objects for better audio control
- Preload all the fx and img assets at the start
- Improve the CSS to work on multiple monitor sizes
- Increase sensitivity of the function for rotating ships
- Better "About" page
- Give ship sprites with a front, middle, and back segment
- harder AI which attacks around areas they have landed successful hits
- ~~better audio mixing~~
- Implement different game modes
- Implement an options menu
- Hard code less aspects of the game

## Patch Notes:

v 1.1: 
- Audio edited to not destroy your eardrums if playing with headphones
- "Interlude" version of the BGM plays while in the "ship placing" phase of the game

## Sources:

- Sound FX: https://mixkit.co/
- Background music: おもちゃのダンス @ フリ by DOVA-SYNDROME
- Images: https://depositphotos.com/,
  https://www.istockphoto.com/, Microsoft Word 2003 WordArt (the best year)

## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/andrewianfaulkner/)
## License

[MIT](https://choosealicense.com/licenses/mit/)

