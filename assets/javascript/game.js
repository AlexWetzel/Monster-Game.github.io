var game = {
	rathalos: {name: "Rathalos", attack: 10, counterAtk: 27, healthPoints: 180},
	tigrex: {name: "Tigrex", attack: 20, counterAtk: 25, healthPoints: 120},
	zinogre: {name: "Zinogre", attack: 16, counterAtk: 30, healthPoints: 130},
	gore_magala: {name: "Gore Magala", attack: 9, counterAtk: 21, healthPoints: 200},

	playerSelect: false,
	defenderSelect: false,

	assignStats: function(stats, monster) {		

		monster.attr("name", stats.name);
		monster.attr("atk", stats.attack);
		monster.attr("base", stats.attack);
		monster.attr("cAtk", stats.counterAtk);
		monster.attr("hp", stats.healthPoints);

		monster.append("<p>Attack: " + monster.attr("atk") + "<br> Counter: " + monster.attr("cAtk") + "<br> Health: " + monster.attr("hp") + "</p>");
	},

	updateStats: function(stats, monster) {
		$(stats).html("Attack: " + monster.attr("atk") + "<br> Counter: " + monster.attr("cAtk") + "<br> Health: " + monster.attr("hp"));
	},

	showRender: function(selection, side){

		if(game.playerSelect === false){
			$(selection).find(side).stop(true).fadeIn("fast")
	
			$(selection).mouseleave(function(){
				if (game.playerSelect === false) {
					$(selection).find(side).hide();
				}
			});
		};
	},

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
var i = 3;
var left = ".render";
var right = ".flip-render";

game.assignStats(game.rathalos, rath);
game.assignStats(game.tigrex, tig);
game.assignStats(game.zinogre, zino);
game.assignStats(game.gore_magala, gore);


$(left).hide();

$(document).on("mouseover", "#players>div", function(){

	game.showRender(this, left, game.playerSelect);
});

$(document).on("click", "#players>div", function() {

	if (game.playerSelect === false) {

		var selectChar = $(".character").not(this).remove();

		selectChar.appendTo("#enemies");

		game.playerSelect = true;
		$("#message").text("Choose your target");
		
		game.flipRender(this);
	};
});

$(right).hide();

$(document).on("mouseover", "#enemies>div", function(){
	game.showFlipRender(this, right);
});
	
$(document).on("click", "#enemies>div", function() {	

	if (game.defenderSelect === false){

		var selectEnemy = $(this).remove();

		selectEnemy.appendTo("#defenders");

		game.defenderSelect = true;
		$("#message").text("Hit the FIGHT button to battle!")
	}
});


//When the attack button is hit
$(document).on("click", "#attack", function() {
	//If a defender is selected, the player is allowed to attack
	if(game.defenderSelect){		
	//The player attacks the defender. the defender takes damage equal to the player's attack
		var player = $("#players>div");
		var defender = $("#defenders>div");	
		
		defender.attr("hp", defender.attr("hp") - player.attr("atk"));
		$("#message").text(player.attr("name") + " attacked " + defender.attr("name") + ", dealing " + player.attr("atk") + " damage!");

	//The player's attack is boosted after a successful attack
		player.attr("atk", parseInt(player.attr("atk")) + parseInt(player.attr("base")));

		game.updateStats("#players>div>p", player);

	//The defender's stats are updated
		game.updateStats("#defenders>div>p", defender);

	//If the defender has no hp, they are removed from the game
		if (defender.attr("hp") <= 0) {
			defender.remove();
			game.defenderSelect = false;
			i--;
			console.log(i);
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
				game.defenderSelect = false;
				$("#message").append("<br> You have been defeated! <br> (refresh the page to start over)");
			}
		}
	}

});