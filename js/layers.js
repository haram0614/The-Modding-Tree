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
	    if (hasUpgrade('q', 12)) exp = exp.add(1)
	    if (hasUpgrade('q', 14)) exp = exp.add(1)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "q", description: "Q: Reset for Quantum", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "1",
            description: "Qt expo +1",
            
            cost: new Decimal(1.8e44),
            effect(){
                return true
            },
             effectDisplay() {
                return player.points + "xQt"
            }
        },
	12: {
            title: "2",
            description: "Qt expo +1",
            cost: new Decimal(4e88),
            unlocked() {
		    return hasUpgrade("q", 11)
	    },
            effect(){
                return true
            },
            effectDisplay() {
                return player.points + "xQt"
            }
        },
	13: {
            title: "3",
            description: "quantum boost PL",
            cost: new Decimal(8e132),
            unlocked() {
		    return hasUpgrade("q", 12)
	    },
              effect(){
                return true
            },
            effectDisplay() {
                return player.q.points.add(1000).div(1000).pow(0.05) + "xPL"
            },
        },
	14: {
            title: "4",
            description: "Qt expo +1",
            cost: new Decimal(1e150),
            unlocked() {
		    return hasUpgrade("q", 13)
	    },
            effect(){
                return true
            },
            effectDisplay() {
                return player.points + "xQt"
            }
        },
    },
    layerShown(){return true}
})
addLayer("a", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: decimalZero,
    }},
    tooltip() {
      return "Achievements"
    },
    color: "#FFFF00",
    nodeStyle() {return {
        "background": "radial-gradient(#FFFF00, #d5ad83)" ,
    }},
    requires: decimalZero, // Can be a function that takes requirement increases into account
    resource: "Achievement Points",
    resourceSingular: "Achievement Point", 
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown() { return true },
    achievements: {
        rows: 30,
        cols: 6,
        11: {
            name: "INF",
            tooltip: "Get 1.79e308 PL. Reward: 1 AP.",
            done() {
                return player.points.gte(1.79e308)
            },
            onComplete() {
                addPoints("a",1)
            }
        },
    },
    tabFormat: {
        "Achievements" :{
            content: ["main-display",
            "achievements"]
        },
    },
})
addLayer("Qc", {
    name: "Quantum charge", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Qc", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Quantum Charge", // Name of prestige currency
    baseResource: "PL expo", // Name of resource prestige is based on
    baseAmount() {return player.points.add(1).log10()}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    branches: ["q"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(3)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "c: Reset for Quantum Charge", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
