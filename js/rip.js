addLayer("rq", {
    name: "ripped quantum", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "rQ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "ripped Qt", // Name of prestige currency
    baseResource: "PL", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (player.rq.points.gte(1)) mult = mult.mul(player.points.add("e10").log10().log10().pow(0.5).pow_base(10))
	if (hasUpgrade('rq',11)) mult = mult.mul(upgradeEffect("rq",11))
        if (hasUpgrade('rq',12)) mult = mult.mul(upgradeEffect("rq",12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "401",
            description: "Boost rq based on Qt",
            
            cost: new Decimal(10000),
            effect(){
                return player.q.points.log10().log10()
            },
             effectDisplay() {
				return "nice"
            }
	},
        12: {
            title: "402",
            description: "Boosted by Qt",
            
            cost: new Decimal("1e26"),
            unlocked() {
		    return true
	    },
            effect(){
		base = new Decimal(0.5)
		    if (hasUpgrade('rQc',13)) base = base.add(0.02)
                return player.q.points.log10().log10().pow(base).pow_base(10)
            },
             effectDisplay() {
				return upgradeEffect('rq',12) + "x rq"
            }
	},
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade("e",14)}
})
addLayer("rQc", {
    name: "Ripped Qc", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "rQc", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Ripped Qc", // Name of prestige currency
    baseResource: "rQc", // Name of resource prestige is based on
    baseAmount() {return player.rq.points.add(1).log10()}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    branches: ["rq"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	    if (hasUpgrade("e",15)) mult = mult.mul(player.rq.points.add(10).log10().log10().pow(0.5).pow_base(10))
	    if (hasUpgrade('rQc',11)) mult = mult.mul(upgradeEffect("rQc",11))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "411",
            description: "Boost rQc based on Qc",
            
            cost: new Decimal(10000),
            effect(){
		base = new Decimal(0.25)
		    if (hasUpgrade('rQc',13)) base = base.mul(2)
                return player.Qc.points.log10().log10().pow(base).pow_base(10)
            },
             effectDisplay() {
				return "nice"
            }
	},
        12: {
            title: "412",
            description: "10x Booster",
            
            cost: new Decimal("1e15"),
            unlocked() {
		    return true
	    },
            effect(){
                return player.q.points.log10().log10().pow(0.5).pow_base(10)
            },
             effectDisplay() {
				return upgradeEffect('rq',12) + "x rq"
            }
	},
        13: {
            title: "413",
            description: "Upg402,411 formula better",
            
            cost: new Decimal("1e16"),
            unlocked() {
		    return true
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return upgradeEffect('rq',12) + "x rq"
            }
	},
        14: {
            title: "414",
            description: "Upg402,411 formula better",
            
            cost: new Decimal("1e26"),
            unlocked() {
		    return true
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "???(endgame)"
            }
	},
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade("e",14)}
})
addLayer("rT", {
    name: "Ripped T", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "rT", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF7F00",
    requires: new Decimal("e6160"), // Can be a function that takes requirement increases into account
    resource: "Ripped T", // Name of prestige currency
    baseResource: "rq", // Name of resource prestige is based on
    baseAmount() {return player.rq.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    branches: ["rq"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	    if (hasUpgrade("e",15)) mult = mult.mul(player.rq.points.mul("1e6160").log10().div(6161).log10().mul(3.32))
	    if (true) mult = mult.log10().log10().pow(0.54).pow_base(10)
	    if (true) mult = mult.sub(player.rT.points)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade("e",14)}
})
