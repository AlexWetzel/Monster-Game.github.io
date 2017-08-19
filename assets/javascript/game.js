var game = {
	rathalos: {name: "Rathalos", attack: 10, counterAtk: 27, healthPoints: 180},
	tigrex: {name: "Tigrex", attack: 20, counterAtk: 25, healthPoints: 120},
	zinogre: {name: "Zinogre", attack: 16, counterAtk: 30, healthPoints: 130},
	gore_magala: {name: "Gore Magala", attack: 9, counterAtk: 21, healthPoints: 200},
	//These are checks for when the character elements are selected at certain points, for the purppose of preventing unwanted behavior
	playerSelect: false,
	defenderSelect: false,
	//Assigns stats to each of the character elements
	assignStats: function(stats, monster) {		

		monster.attr("name", stats.name);
		monster.attr("atk", stats.attack);
		monster.attr("base", stats.attack);
		monster.attr("cAtk", stats.counterAtk);
		monster.attr("hp", stats.healthPoints);

		monster.append("<p>Attack: " + monster.attr("atk") + "<br> Counter: " + monster.attr("cAtk") + "<br> Health: " + monster.attr("hp") + "</p>");
	},

	//Updates the character stats
	updateStats: function(stats, monster) {
		$(stats).html("Attack: " + monster.attr("atk") + "<br> Counter: " + monster.attr("cAtk") + "<br> Health: " + monster.attr("hp"));
	},

	//Shows the character renders on the default side
	showRender: function(selection, side){

		//Checks if a player is selected before playing the animation
		if(game.playerSelect === false){
			$(selection).find(side).stop(true).fadeIn("fast")
	
			$(selection).mouseleave(function(){
				//The second conditional prevents the render from hiding after the character is clicked
				if (game.playerSelect === false) {
					$(selection).find(side).hide();
				}
			});
		};
	},

	//This functions identically to showRender, but using a different check
	showFlipRender: function(selection, side){

		if(game.defenderSelect === false){
			$(selection).find(side).stop(true).fadeIn("fast")
	
			$(selection).mouseleave(function(){
				if (game.defenderSelect === false) {
					$(selection).find(side).hide();
				}
			});
		};
	},

	flipRender: function(selection){
		$(left).not($(selection).find(left)).addClass("flip-render").removeClass("render");
	}
}

var rath = $("#rathalos");
var tig = $("#tigrex");
var zino = $("#zinogre");
var gore = $("#gore-magala");
// This is the number of enemies that will be fought
var i = 3;
var left = ".render";
var right = ".flip-render";

game.assignStats(game.rathalos, rath);
game.assignStats(game.tigrex, tig);
game.assignStats(game.zinogre, zino);
game.assignStats(game.gore_magala, gore);

//Hides the renders on the left side
$(left).hide();

//Shows renders for each character on hover, and hides them when the mouse leaves.
$(document).on("mouseover", "#players>div", function(){
	game.showRender(this, left);
});

//When a player is selected, the rest of the characters become enemies
$(document).on("click", "#players>div", function() {
	//Check if the player selected their character
	if (game.playerSelect === false) {
	//Removes the characters the player did not select
		var selectChar = $(".character").not(this).remove();
	//Adds the removed characters to the enemies section
		selectChar.appendTo("#enemies");

		game.playerSelect = true;
		$("#message").text("Choose your target");
		//Flips the renders of the "enemies"		
		game.flipRender(this);
	};
});

//Hides the renders that move to the right side
$(right).hide();

//Mouse hover animations for the flipped renders
$(document).on("mouseover", "#enemies>div", function(){
	game.showFlipRender(this, right);
});

//Moves enemies to the defender area on click
$(document).on("click", "#enemies>div", function() {	
	//There needs to be a selected player and no defenders for this to work
	if (game.defenderSelect === false && game.playerSelect === true){
		//The selected enemy gets removed
		var selectEnemy = $(this).remove();
		//The removed enemy becomes a defender
		selectEnemy.appendTo("#defenders");
		
		game.defenderSelect = true;
		$("#message").text("Hit the FIGHT button to battle!")
	}
});


//When the attack button is hit
$(document).on("click", "#attack", function() {
	//If a defender is selected, the player is allowed to attack
	if(game.defenderSelect){		
		
		var player = $("#players>div");
		var defender = $("#defenders>div");	
		//The player attacks the defender. the defender takes damage equal to the player's attack
		defender.attr("hp", defender.attr("hp") - player.attr("atk"));
		$("#message").text(player.attr("name") + " attacked " + defender.attr("name") + ", dealing " + player.attr("atk") + " damage!");
		//The player's attack is boosted after a successful attack
		player.attr("atk", parseInt(player.attr("atk")) + parseInt(player.attr("base")));
		//Player's stats are updated
		game.updateStats("#players>div>p", player);
		//The defender's stats are updated
		game.updateStats("#defenders>div>p", defender);
		//If the defender has no hp, they are removed from the game
		if (defender.attr("hp") <= 0) {
			defender.remove();
			game.defenderSelect = false;
			i--;
			//Checks if there are enemies left
			if (i === 0) {
				$("#message").append("<br>" + defender.attr("name") + " is defeated! You win! <br> (refresh the page to start over)");
			}
			else {
				$("#message").append("<br>" + defender.attr("name") + " is defeated! Choose your next target.");
			}
		}		
		else{
		//The defender counterattacks, dealing damage to the player equal to the defender's counter stat
		player.attr("hp", player.attr("hp") - defender.attr("cAtk"));
		game.updateStats("#players>div>p", player);
		$("#message").append("<br>" + defender.attr("name") + " retaliates, dealing " + defender.attr("cAtk") + " damage.");
			
			if (player.attr("hp") <= 0) {
				//The checks keep the player from attacking or choosing a target after death
				game.playerSelect = false;
				game.defenderSelect = false;
				player.remove();
				$("#message").append("<br> You have been defeated! <br> (refresh the page to start over)");
			}
		}
	}
});