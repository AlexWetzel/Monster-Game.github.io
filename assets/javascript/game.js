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

$(document).on("click", "#attack", function() {
	var monster = $("#players>div")

	monster.attr("hp", monster.attr("hp") - 10);

	game.updateStats("#players>div>p", monster);

	// $("#players>div>p").text("Attack: " + monster.attr("atk") + " Counter: " + monster.attr("cAtk") + " Health: " + monster.attr("hp"));
});

// $("#attack")on("click", function() {

// });



