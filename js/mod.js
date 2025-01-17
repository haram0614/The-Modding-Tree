let modInfo = {
	name: "The Quantum Tree",
	id: "Quantum",
	author: "haram0614",
	pointsName: "PL",
	modFiles: ["layers.js", "tree.js", "wave.js", "rip.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 24,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.1",
	name: "ripped",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added 1layer.<br>
		- Added nothing.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...(Deep endgame at ee1.2e11)`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal("1.8e43")
	if (hasUpgrade("q", 13)) gain = gain.mul(player.q.points.add(1000).div(1000).pow(0.05).min(1e15))
	if (hasUpgrade("q", 23) || hasUpgrade('SP',13)) gain = gain.mul(upgradeEffect("q",23))
	if (hasUpgrade("SP", 21)) gain = gain.mul(upgradeEffect("SP",21))
	if (hasUpgrade("dp", 11)) gain = gain.mul(upgradeEffect("dp",11))
	if (hasUpgrade('e',15)) gain = gain.log10().log10().pow(0.5).pow_base(10)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("eee20"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
