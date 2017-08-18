# week-4-game.github.io

Link: https://alexwetzel.github.io/week-4-game.github.io/

Currently github fails to load some icons and I don't know why.


A game utilizing jQuery where you choose a character and fight opponents, based off the Monster Hunter series of games by Capcom.

As of writing this the game itself works, but the styling on the website is only half complete.

When you load a page, you can select one of four monster. each monster has three stats: attack, counter, and health.

Hovering over a monster icon will show a render of that monster in the middle of the page, and will stay when you choose that monster.

when you select a monster, the other three move to the 'enemies' section, where you can select your target to attack. This will show a render like before, but on the opposite side of the page. Selecting your target moves it to the 'defender' section.

Once a player and a deender are selected, you can hit the fight button to begin attacking. Hitting the button causes your monster's current attack value to be taken from the defender's health. if the defender still has health left, its counter value is taken from your health. Every time you attack, your attack power is boosted by its base value, causeing you to deal more damage each turn.

Once your target reaches 0 health, you can select another target and repeat the process. Once all enemies are defeated you win the game. If your health reaches 0, you lose.