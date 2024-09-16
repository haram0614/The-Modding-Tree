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
	db = new Decimal(0)
	    if (hasUpgrade('q', 11)) exp = exp.add(1)
	    if (hasUpgrade('q', 12)) exp = exp.add(1)
	    if (hasUpgrade('q', 14)) exp = exp.add(1)
	    if (hasUpgrade('q', 15)) exp = exp.add(8)
	    if (hasUpgrade('q', 24)) exp = exp.add(player.q.points.add("1e2000").div("1e308").log10().log10().mul(10))
	    if (hasUpgrade('Qc', 11)) db = db.add(0.9)
	    if (hasUpgrade('Qc', 12)) db = db.add(0.9)
	    if (hasUpgrade('Qc', 13)) db = db.add(0.1)
	    if (hasUpgrade('Qc', 13)) db = db.add(0.9)
	    if (true) exp = exp.mul(db.mul(db.add(1)).div(2).pow_base(2))
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
            description: "Qt,Qc expo +1",
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
                return player.q.points.add(1000).div(1000).pow(0.05).min(1e15) + "xPL"
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
	15: {
            title: "5",
            description: "Qt expo +8",
            cost: new Decimal("1e400"),
            unlocked() {
		    return hasUpgrade("q", 14)
	    },
            effect(){
                return true
            },
            effectDisplay() {
                return player.points.pow(8) + "xQt"
            }
        },
	21: {
            title: "6",
            description: "Qc expo +1",
            
            cost: new Decimal(4e88),
            effect(){
                return hasUpgrade("q", 11)
            },
             effectDisplay() {
                return player.q.points.log10() + "xQc"
            }
        },
	22: {
            title: "7",
            description: "Qc expo +1",
            
            cost: new Decimal(1e145),
            effect(){
                return hasUpgrade("q", 12)
            },
             effectDisplay() {
                return player.q.points.log10() + "xQt"
            }
        },
	23: {
            title: "8",
            description: "quantum boost PL after Upgrade3 cap",
            cost: new Decimal("1e1290"),
            unlocked() {
		    return hasUpgrade("q", 15)
	    },
              effect(){
                return true
            },
            effectDisplay() {
                return player.q.points.add(1e308).log10().mul(2).add(0.25).pow(0.5).pow_base(1.165).mul(169000) + "xPL"
            },
        },
	24: {
            title: "9",
            description: "quantum boost PL after Upgrade3 cap",
            cost: new Decimal("1e4920"),
            unlocked() {
		    return hasUpgrade("q", 23)
	    },
              effect(){
                return true
            },
            effectDisplay() {
                return "+" + player.q.points.add("1e2000").div("1e308").log10().log10().mul(10) + "Qt expo"
            },
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
            name: "Start with googol",
            tooltip: "Get 1e100 Qt. Reward: 1 AP.",
            done() {
                return player.q.points.gte(1e100)
            },
            onComplete() {
                addPoints("a",1)
            }
        },
        12: {
            name: "INF",
            tooltip: "Get 1.79e308 Qt. Reward: 1 AP.",
            done() {
                return player.q.points.gte("1.79e308")
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
    baseResource: "Qt expo", // Name of resource prestige is based on
    baseAmount() {return player.q.points.add(1).log10()}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    branches: ["q"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
   	 exp = new Decimal(1)
	    if (hasUpgrade('q', 21)) exp = exp.add(1)
	    if (hasUpgrade('q', 22)) exp = exp.add(1)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "c: Reset for Quantum Charge", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "11",
            description: "Qt expo *1.8",
            
            cost: new Decimal(1e7),
            effect(){
                return true
            },
             effectDisplay() {
				return "1.8x Qt expo"
            }
	},
        12: {
            title: "12",
            description: "Qt expo *3.18",
            
            cost: new Decimal(1e13),
            effect(){
                return true
            },
             effectDisplay() {
				return "3.18x Qt expo"
            }
	},
        13: {
            title: "13",
            description: "Qt expo *1.14",
            
            cost: new Decimal(1e13),
            effect(){
                return true
            },
             effectDisplay() {
				return "1.14x Qt expo"
            }
        },
        14: {
            title: "14",
            description: "Qt expo *5.91",
            
            cost: new Decimal(1e14),
            effect(){
                return true
            },
             effectDisplay() {
				return "5.19x Qt expo!"
            }
        },
    },
    layerShown(){return true}
})
