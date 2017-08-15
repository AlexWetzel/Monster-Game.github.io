var game = {
	rathalos: {attack: 10, counterAtk: 10, healthPoints: 100},
	tigrex: {attack: 11, counterAtk: 11, healthPoints: 101},
	zinogre: {attack: 10, counterAtk: 10, healthPoints: 100},
	gore_magala: {attack: 10, counterAtk: 10, healthPoints: 100},

	playerSelect: false,
	defenderSelect: false,

	assignStats: function(stats, monster) {		

		console.log(game.rathalos);

		monster.attr("atk", stats.attack);
		monster.attr("base", stats.attack);
		monster.attr("cAtk", stats.counterAtk);
		monster.attr("hp", stats.healthPoints);

		console.log("Attack: " + monster.attr("atk") + " Counter: " + monster.attr("cAtk") + " Health: " + monster.attr("hp"));
		monster.append("<p>Attack: " + monster.attr("atk") + " Counter: " + monster.attr("cAtk") + " Health: " + monster.attr("hp") + "</p>");
	},

	updateStats: function(stats, monster) {
		$(stats).text("Attack: " + monster.attr("atk") + " Counter: " + monster.attr("cAtk") + " Health: " + monster.attr("hp"));
	}



}

var rath = $("#rathalos");
var tig = $("#tigrex");
var zino = $("#zinogre");
var gore = $("#gore-magala");
var combo = 1;

game.assignStats(game.rathalos, rath);
game.assignStats(game.tigrex, tig);
game.assignStats(game.zinogre, zino);
game.assignStats(game.gore_magala, gore);

$(document).on("click", "#players>div", function() {

	var selectChar = $(".character").not(this).remove();

	selectChar.appendTo("#enemies");

	game.playerSelect = true;

});


$(document).on("click", "#enemies>div", function() {

	var selectEnemy = $(this).remove();

	selectEnemy.appendTo("#defenders");

	game.defenderSelect = true;

});


//When the attack button is hit
$(document).on("click", "#attack", function() {
	console.log(combo);
//The player attacks the defender. the defender takes damage equal to the player's attack

	var player = $("#players>div");
	var defender = $("#defenders>div");	
	// var monster = $("#players>div")

	defender.attr("hp", defender.attr("hp") - player.attr("atk"));

//The player's attack is boosted after a successful attack
	player.attr("atk", parseInt(player.attr("atk")) + parseInt(player.attr("base")));

	game.updateStats("#players>div>p", player);

//The defender's stats are updated
	game.updateStats("#defenders>div>p", defender);

//If the defender has no hp, they are removed from the game
	if (defender.attr("hp") <= 0) {
		defender.remove();
		game.defenderSelect = false;
	}
	else {
//The defender counterattacks, dealing damage to the player equal to the defender's counter stat
	player.attr("hp", player.attr("hp") - defender.attr("cAtk"));
	game.updateStats("#players>div>p", player);
	}
	// $("#players>div>p").text("Attack: " + monster.attr("atk") + " Counter: " + monster.attr("cAtk") + " Health: " + monster.attr("hp"));


});

// $("#attack")on("click", function() {

// });



