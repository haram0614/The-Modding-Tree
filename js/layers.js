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
	    if (hasUpgrade('t', 11)) exp = exp.mul(player.t.points.add(10).log10())
	    if (hasUpgrade('Qc', 11)) db = db.add(0.9)
	    if (hasUpgrade('Qc', 12)) db = db.add(0.9)
	    if (hasUpgrade('Qc', 13)) db = db.add(0.1)
	    if (hasUpgrade('Qc', 14)) db = db.add(0.9)
	    if (hasUpgrade('Qc', 15)) db = db.add(0.1)
	    if (hasUpgrade('Qc', 21)) db = db.add(0.9)
	    if (hasUpgrade('Qc', 22)) db = db.add(1)
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
                return player.q.points.add(1000).div(1000).pow(0.05).min(1e15)
            },
            effectDisplay() {
                return upgradeEffect("q",13) + "xPL"
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
                base = new Decimal(1.165)
		bcap = new Decimal(1.898)
		      if (hasUpgrade('a', 11)) bcap = bcap.max(21000)
		      if (hasUpgrade('t', 12)) base = base.add(player.t.points.div(100).max(0)).min(bcap)
		return player.q.points.add(1e308).log10().mul(2).add(0.25).pow(0.5).pow_base(base).mul(169000)
            },
            effectDisplay() {
                return upgradeEffect("q",23)+ "xPL"
            },
        },
	24: {
            title: "9",
            description: "quantum boost Qt expo",
            cost: new Decimal("1e4920"),
            unlocked() {
		    return hasUpgrade("q", 23)
	    },
              effect(){
                return player.q.points.add("1e2000").div("1e308").log10().log10().mul(10)
            },
            effectDisplay() {
                return "+" + upgradeEffect("q",24) + "Qt expo"
            },
        },
	25: {
            title: "10",
            description: "Unlock new layer",
            cost: new Decimal("1e6161"),
            unlocked() {
		    return hasUpgrade("q", 24)
	    },
              effect(){
                return true
            },
            effectDisplay() {
                return player.q.points.mul("1e6160").log10().div(6161).log10().mul(3.32) + "T CAP (WIP)"
            },
        },
	31: {
            title: "?1",
            description: "Qt boost theory",
            cost: new Decimal("1e20000"),
            unlocked() {
		    return hasUpgrade("q", 25)
	    },
              effect(){
                return true
            },
            effectDisplay() {
                return "WIP"
            },
        },
	32: {
            title: "?2",
            description: "Qt slightly boost Qc expo",
            cost: new Decimal("1e200000"),
            unlocked() {
		    return hasUpgrade("q", 31)
	    },
              effect(){
                return upgradeEffect("q",24).sub(48).min(160).div(20)
            },
            effectDisplay() {
                return upgradeEffect("q",32) + "+Qc expo"
            },
        },
	33: {
            title: "?3",
            description: "Unlock new layer!",
            cost: new Decimal("ee12"),
            unlocked() {
		    return hasUpgrade("q", 32)
	    },
              effect(){
                return true
            },
            effectDisplay() {
                return "new layer!"
            },
        },
    },
    layerShown(){return true}
})
addLayer("A", {
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
        13: {
            name: "Googol II",
            tooltip: "Get 1e100 PL. Reward: 1 AP.",
            done() {
                return player.points.gte("1e100")
            },
            onComplete() {
                addPoints("a",1)
            }
        },
        14: {
            name: "INF II",
            tooltip: "Get 1.79e308 PL. Reward: 1 AP.",
            done() {
                return player.points.gte("1.79e308")
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
	    if (hasUpgrade('q', 32)) exp = exp.add(upgradeEffect("q",32))
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
            description: "add 0.9 booster, booster formula:^2^(b*(b+1)/2) Qt",
            
            cost: new Decimal(1e7),
            effect(){
                return true
            },
             effectDisplay() {
				return "add 0.9 booster"
            }
	},
        12: {
            title: "12",
            description: "add 0.9 booster",
            
            cost: new Decimal(1e10),
            unlocked() {
		    return hasUpgrade("Qc", 11)
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "add 0.9 booster"
            }
	},
        13: {
            title: "13",
            description: "add 0.1 booster",
            
            cost: new Decimal(1e13),
            unlocked() {
		    return hasUpgrade("Qc", 12)
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "add 0.1 booster"
            }
        },
        14: {
            title: "14",
            description: "add 0.9 booster",
            
            cost: new Decimal(1e14),
            unlocked() {
		    return hasUpgrade("Qc", 13)
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "add 0.9 booster"
            }
        },
        15: {
            title: "15",
            description: "add 0.1 booster",
            
            cost: new Decimal(1e18),
            unlocked() {
		    return hasUpgrade("Qc", 14)
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "add 0.1 booster"
            }
        },
        21: {
            title: "16",
            description: "add 0.9 booster",
            
            cost: new Decimal(1e19),
            unlocked() {
		    return hasUpgrade("Qc", 15)
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "add 0.9 booster"
            }
        },
        22: {
            title: "17",
            description: "add 1 booster",
            
            cost: new Decimal(1e25),
            unlocked() {
		    return hasUpgrade("Qc", 21)
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "add 1 booster"
            }
        },
    },
    layerShown(){return true}
})
addLayer("t", {
    name: "Theory", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#FFA500",
    requires: new Decimal("e6160"), // Can be a function that takes requirement increases into account
    resource: "Theory", // Name of prestige currency
    baseResource: "Qt", // Name of resource prestige is based on
    baseAmount() {return player.q.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    branches: ["q"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        multb = new Decimal(0)
	mult = player.q.points.mul("1e6160").log10().div(6161).log10().mul(3.32)
        mult = mult.mul(mult.add(1).div(2))
        mult = mult.sub(player.t.points)
        mult = mult.max(0)
	if (hasUpgrade('q', 25)) multb = multb.add(1)
        return mult.mul(multb)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
   	 exp = new Decimal(1)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "t: Reset for Quantum Charge", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "21",
            description: "Boost Qt based on theory",
            
            cost: new Decimal(1),
            effect(){
                return player.t.points.add(10).log10()
            },
             effectDisplay() {
				return "^" + upgradeEffect("t",11)
            }
	},
        12: {
            title: "22",
            description: "theory boost Up8 base",
            
            cost: new Decimal(2),
            unlocked() {
		    return true
	    },
            effect(){
                upg22eff = player.t.points.div(100).max(0)
		    if (hasUpgrade('a', 12)) upg22eff = upg22eff.pow(2)
		return upg22eff
            },
             effectDisplay() {
				return upgradeEffect("t",12) + "+Up8 base"
            }
	},
    },
    layerShown(){return true}
})
addLayer("a", {
    name: "Acceleron", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(84), // Can be a function that takes requirement increases into account
    resource: "Acceleron", // Name of prestige currency
    baseResource: "Theories", // Name of resource prestige is based on
    baseAmount() {return player.t.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "41",
            description: "increase Up8 base cap",
            
            cost: new Decimal(1),
            effect(){
                return true
            },
             effectDisplay() {
				return "1.898=>21000 cap"
            }
	},
        12: {
            title: "42",
            description: "^2 Upg22 effect",
            
            cost: new Decimal(100),
            unlocked() {
		    return true
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "nice"
            }
	},
    },
    layerShown(){return hasUpgrade("q", 33)}
})
