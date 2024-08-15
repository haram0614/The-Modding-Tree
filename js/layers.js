addLayer("q", {
    name: "Quantum", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Q", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Quantum", // Name of prestige currency
    baseResource: "PL", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
	    if (hasUpgrade('q', 11)) exp = exp.add(1)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "q", description: "Q: Reset for Quantum", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	 upgrades: {
        rows: 1,
        cols: 1,
        11: {
            title: "1",
            description: "Quantum expo +1",
            cost: new Decimal(1.8e44),
            }
        },
    },
    layerShown(){return true}
})
