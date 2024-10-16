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
	base = new Decimal(2)
	    if (hasUpgrade('f', 15)) base = base.add(0.5)
	    if (hasUpgrade('SL',11)) base = base.add(2.2).add(upgradeEffect('q',24).div(5))
	    if (hasUpgrade('q', 11)) exp = exp.add(1)
	    if (hasUpgrade('q', 12)) exp = exp.add(1)
	    if (hasUpgrade('q', 14)) exp = exp.add(1)
            if (hasUpgrade('q', 15)) exp = exp.add(8)
	    if (hasUpgrade('q', 24)) exp = exp.add(player.q.points.add("1e2000").div("1e308").log10().log10().mul(10))
	    if (hasUpgrade('f', 31)) exp = exp.mul(2)
	    if (hasUpgrade('t', 11)) exp = exp.mul(upgradeEffect("t",11))
	    if (hasUpgrade('Qc', 11)) db = db.add(0.9)
	    if (hasUpgrade('Qc', 12)) db = db.add(0.9)
	    if (hasUpgrade('Qc', 13)) db = db.add(0.1)
	    if (hasUpgrade('Qc', 14)) db = db.add(0.9)
	    if (hasUpgrade('Qc', 15)) db = db.add(0.1)
	    if (hasUpgrade('Qc', 21)) db = db.add(0.9)
	    if (hasUpgrade('Qc', 22)) db = db.add(1)
	    if (hasUpgrade('Qc', 23)) db = db.add(upgradeEffect("Qc",23))
	    if (hasUpgrade('SP', 11)) db = db.add(upgradeEffect("SP",11))
	    if (true) exp = exp.mul(db.mul(db.add(1)).div(2).pow_base(base))
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "q", description: "Q: Reset for Quantum", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
update(diff) {
	if (hasAchievement('A', 12)) generatePoints('q',diff);
},
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
            title: "11",
            description: "Qt slightly boost Qc expo",
            cost: new Decimal("1e200000"),
            unlocked() {
		    return hasUpgrade("q", 25)
	    },
              effect(){
                return upgradeEffect("q",24).sub(48).min(100).div(20)
            },
            effectDisplay() {
                return upgradeEffect("q",31) + "+Qc expo"
            },
        },
	32: {
            title: "12",
            description: "Unlock new layer!",
            cost: new Decimal("ee12"),
            unlocked() {
		    return hasUpgrade("q", 31)
	    },
              effect(){
                return true
            },
            effectDisplay() {
                return "new layer!"
            },
        },
	33: {
            title: "13",
            description: "Boost Qc expo after 8",
            cost: new Decimal("e9e15"),
            unlocked() {
		    return hasUpgrade("q", 32)
	    },
              effect(){
                return upgradeEffect("q",24).sub(148).min(840).div(120)
            },
            effectDisplay() {
                return upgradeEffect("q",33) + "+Qc expo"
            },
        },
	34: {
            title: "14",
            description: "Boost Qc expo after 15",
            cost: new Decimal("ee100"),
            unlocked() {
		    return hasAchievement("A", 24)
	    },
              effect(){
                return upgradeEffect("q",24).mul(1000).pow(0.5).sub(1000).div(120)
            },
            effectDisplay() {
                return upgradeEffect("q",34) + "+Qc expo"
            },
        },
    },
    layerShown(){return true}
})
addLayer("A", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
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
                addPoints("A",1)
            }
        },
        12: {
            name: "INF",
            tooltip: "Get 1.79e308 Qt. Reward: 1 AP,Auto gain Qt,Unlock new upgrade",
            done() {
                return player.q.points.gte("1.79e308")
            },
            onComplete() {
                addPoints("A",1)
            }
        },
        13: {
            name: "Googol II",
            tooltip: "Get 1e100 PL. Reward: 1 AP.",
            done() {
                return player.points.gte("1e100")
            },
            onComplete() {
                addPoints("A",1)
            }
        },
        14: {
            name: "INF II",
            tooltip: "Get 1.79e308 PL. Reward: 1 AP.",
            done() {
                return player.points.gte("1.79e308")
            },
            onComplete() {
                addPoints("A",1)
            }
        },
        15: {
            name: "Double A",
            tooltip: "Unlock Acceleron. Reward: 1 AP.",
            done() {
                return player.a.points.gte("1")
            },
            onComplete() {
                addPoints("A",1)
            }
        },
        16: {
            name: "Wave",
            tooltip: "Unlock Waves. Reward: 1 AP.",
            done() {
                return player.W.points.gte("1")
            },
            onComplete() {
                addPoints("A",1)
            }
        },
        21: {
            name: "Google 3",
            tooltip: "Get (1e100^2) Qc. Reward: 1 AP.",
            done() {
                return player.Qc.points.gte("1e200")
            },
            onComplete() {
                addPoints("A",1)
            }
        },
        22: {
            name: "Inf^3",
            tooltip: "Get 1.79e308 Qc. Reward: 1 AP,Auto 100% of Qc gain",
            done() {
                return player.Qc.points.gte("1.79e308")
            },
            onComplete() {
                addPoints("A",1)
            }
        },
        23: {
            name: "easy",
            tooltip: "Get e4e11Qt without Q,Qc upgrade. Reward: 1 AP,Unlock 1 upgrade",
            done() {
                return (player.q.points.gte("e4e11") && !hasUpgrade("q",11) && !hasUpgrade("Qc",11) && !hasUpgrade("t",11))
            },
            onComplete() {
                addPoints("A",1)
            }
        },
        24: {
            name: "Medium",
            tooltip: "Get ee13Qt without Q,Qc upgrade. Reward: 1 AP,add 1 Qt upgrade also boost SP boost based on Qt",
            done() {
                return (player.q.points.gte("ee13") && !hasUpgrade("q",11) && !hasUpgrade("Qc",11) && !hasUpgrade("t",11))
            },
            onComplete() {
                addPoints("A",1)
            }
        },
        25: {
            name: "Hard",
            tooltip: "Get ee18Qt without Q,Qc upgrade. Reward: 1 AP,SP upgrade formula better",
            done() {
                return (player.q.points.gte("ee18") && !hasUpgrade("q",11) && !hasUpgrade("Qc",11) && !hasUpgrade("t",11))
            },
            onComplete() {
                addPoints("A",1)
            }
        },
        26: {
            name: "Inf4",
            tooltip: "Get 1.79e308SL",
            done() {
                return (player.SL.points.gte("1.79e308"))
            },
            onComplete() {
                addPoints("A",1)
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
	    if (hasUpgrade('Wa', 12)) mult = mult.mul(upgradeEffect('Wa',12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
   	 exp = new Decimal(1)
	    if (hasUpgrade('q', 21)) exp = exp.add(1)
	    if (hasUpgrade('q', 22)) exp = exp.add(1)
	    if (hasUpgrade('q', 31)) exp = exp.add(upgradeEffect("q",31))
	    if (hasUpgrade('q', 33)) exp = exp.add(upgradeEffect("q",33))
	    if (hasUpgrade('q', 34)) exp = exp.add(upgradeEffect("q",34))
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "c: Reset for Quantum Charge", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
update(diff) {
	if (hasAchievement('A', 22)) generatePoints('Qc',diff);
},
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "16",
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
            title: "17",
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
            title: "18",
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
            title: "19",
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
            title: "20",
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
            title: "21",
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
            title: "22",
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
        23: {
            title: "23",
            description: "add booster based on Qc",
            
            cost: new Decimal(1e90),
            unlocked() {
		    return hasUpgrade("Qc", 22)
	    },
            effect(){
                return player.Qc.points.add("1e90").log10().div(3.2).log10().mul(3.321).sub(3.8)
            },
             effectDisplay() {
				return upgradeEffect("Qc",23) + "+Booster"
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
    branches: ["q","a","W"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        multb = new Decimal(0)
	mult = player.q.points.mul("1e6160").log10().div(6161).log10().mul(3.32)
        mult = mult.mul(mult.add(1).div(2))
        if (hasUpgrade('W', 12)) mult = mult.mul(upgradeEffect('W',12))
        if (hasUpgrade('f', 21)) mult = mult.mul(upgradeEffect('f',21))
        mult = mult.sub(player.t.points)
        mult = mult.max(0)
	if (hasUpgrade('q', 25) || hasUpgrade("f",32)) multb = multb.add(1)
        return mult.mul(multb)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
   	 exp = new Decimal(1)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "t: Reset for Theory", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "26",
            description: "Boost Qt based on theory",
            
            cost: new Decimal(1),
            effect(){
		base = player.t.points
		mult = new Decimal(1)
		    	if (hasUpgrade("W", 14)) base = base.mul(upgradeEffect('W',14))
		        if (hasUpgrade("f", 13)) base = base.pow(3)
		        if (base.gte(1e10)) mult = mult.mul(2.09)
		        if (hasUpgrade("f", 13) && base.gte(1e10)) mult = mult.mul(base.log10().mul(2.09).log10())
                return base.add(10).log10().mul(mult)
            },
             effectDisplay() {
				return "^" + upgradeEffect("t",11)
            }
	},
        12: {
            title: "27",
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
        13: {
            title: "28",
            description: "Keep Acceleron on reset",
            
            cost: new Decimal(1000),
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
        multb = new Decimal(0)
	if (hasUpgrade("q", 33) || hasUpgrade("t",13)) multb = multb.add(1)
        return multb
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for accelerons", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
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
        13: {
            title: "43",
            description: "unlock wave",
            
            cost: new Decimal(400),
            unlocked() {
		    return true
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "nice2"
            }
	},
        14: {
            title: "44",
            description: "unlock new layer",
            
            cost: new Decimal(2000),
            unlocked() {
		    return true
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "nice2"
            }
	},
        21: {
            title: "45",
            description: "Qt boost SQ",
            
            cost: new Decimal(500000),
            unlocked() {
		    return hasAchievement("A",24)
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "nice2"
            }
	},
    },
    layerShown(){return hasUpgrade("q", 32) || hasUpgrade("t",13)}
})
addLayer("W", {
    name: "Waves", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#989898",
    requires: new Decimal(24), // Can be a function that takes requirement increases into account
    resource: "Waves", // Name of prestige currency
    baseResource: "Theory", // Name of resource prestige is based on
    baseAmount() {return player.t.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        multw = new Decimal(0)
	if (hasUpgrade("a", 13)) multw = multw.add(1)
	if (hasUpgrade("W", 13)) multw = multw.mul(upgradeEffect('W',13))
	if (hasUpgrade("Wa", 14)) multw = multw.mul(upgradeEffect('Wa',14))
        return multw
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "W: Reset for Waves", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
update(diff) {
	if (hasUpgrade('W', 11)) generatePoints('W',diff);
},
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "51",
            description: "auto gain waves",
            
            cost: new Decimal(1),
            effect(){
                return true
            },
             effectDisplay() {
				return "nice"
            }
	},
        12: {
            title: "52",
            description: "Boost theory",
            
            cost: new Decimal(100),
            unlocked() {
		    return true
	    },
            effect(){
                return player.W.points.add(100).log10().mul(1.107)
            },
             effectDisplay() {
				return upgradeEffect('W',12) + "x theory"
            }
	},
        13: {
            title: "53",
            description: "Qt boost waves",
            
            cost: new Decimal(400),
            unlocked() {
		    return true
	    },
            effect(){
                return player.q.points.add("e9e15").log10().div(500).log10()
            },
             effectDisplay() {
				return upgradeEffect('W',13) + "x waves"
            }
	},
        14: {
            title: "54",
            description: "Wave boost Up26 base",
            
            cost: new Decimal(1000),
            unlocked() {
		    return hasUpgrade("f",12)
	    },
            effect(){
                return player.W.points.add(1000)
            },
             effectDisplay() {
				return upgradeEffect('W',14) + "x Up26base"
            }
	},
    },
    layerShown(){return hasUpgrade("a", 13)}
})
addLayer("Wa", {
    name: "Wave2", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W2", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#989898",
    requires: new Decimal(240), // Can be a function that takes requirement increases into account
    resource: "Wave2", // Name of prestige currency
    baseResource: "Theory", // Name of resource prestige is based on
    baseAmount() {return player.t.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    branches: ["W"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        multw = new Decimal(0)
	if (hasUpgrade("a", 13)) multw = multw.add(1)
	if (hasUpgrade("Wa", 13)) multw = multw.mul(upgradeEffect('W',13))
	if (hasUpgrade("Wb", 13)) multw = multw.mul(upgradeEffect('Wb',13))
        return multw
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
update(diff) {
	if (hasUpgrade('Wa', 11)) generatePoints('Wa',diff);
},
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "56",
            description: "auto gain waves",
            
            cost: new Decimal(1),
            effect(){
                return true
            },
             effectDisplay() {
				return "nice"
            }
	},
        12: {
            title: "57",
            description: "Boost Qc base",
            
            cost: new Decimal(100),
            unlocked() {
		    return true
	    },
            effect(){
                return player.Wa.points.add(100)
            },
             effectDisplay() {
				return upgradeEffect('Wa',12) + "x Qc base"
            }
	},
        13: {
            title: "58",
            description: "Qt boost waves",
            
            cost: new Decimal(400),
            unlocked() {
		    return true
	    },
            effect(){
                return player.q.points.add("e9e15").log10().div(500).log10()
            },
             effectDisplay() {
				return upgradeEffect('Wa',13) + "x waves"
            }
	},
        14: {
            title: "59",
            description: "Wave2 Boost Waves",
            
            cost: new Decimal(100000),
            unlocked() {
		    return true
	    },
            effect(){
                return player.Wa.points.add("100000")
            },
             effectDisplay() {
				return upgradeEffect('Wa',14) + "x waves"
            }
	},
    },
    layerShown(){return hasUpgrade("a", 13)}
})
addLayer("Wb", {
    name: "Wave3", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W3", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#989898",
    requires: new Decimal(24000), // Can be a function that takes requirement increases into account
    resource: "Wave3", // Name of prestige currency
    baseResource: "Theory", // Name of resource prestige is based on
    baseAmount() {return player.t.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    branches: ["W"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        multw = new Decimal(0)
	if (hasUpgrade("a", 13)) multw = multw.add(1)
	if (hasUpgrade("Wb", 12)) multw = multw.mul(upgradeEffect('Wb',12))
        return multw
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
update(diff) {
	if (hasUpgrade('Wb', 11)) generatePoints('Wb',diff);
},
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "61",
            description: "auto gain waves",
            
            cost: new Decimal(1),
            effect(){
                return true
            },
             effectDisplay() {
				return "nice"
            }
	},
        12: {
            title: "62",
            description: "Qt boost wave3",
            
            cost: new Decimal(400),
            unlocked() {
		    return true
	    },
            effect(){
                return player.q.points.add("e9e15").log10().div(500).log10()
            },
             effectDisplay() {
				return upgradeEffect('Wb',12) + "x waves"
            }
	},
        13: {
            title: "63",
            description: "Wave3 Boost Wave2",
            
            cost: new Decimal(10000),
            unlocked() {
		    return true
	    },
            effect(){
                return player.Wb.points.add("10000")
            },
             effectDisplay() {
				return upgradeEffect('Wb',13) + "x waves"
            }
	},
    },
    layerShown(){return hasUpgrade("a", 13)}
})
addLayer("SL", {
    name: "Super PL", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SL", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF00FF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Super PL", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	base = new Decimal(0.375)
	if (hasUpgrade("S", 12)) base = base.mul(1.1)
	if (hasUpgrade("S", 12)) mult = mult.mul(upgradeEffect('S',12))
	if (hasUpgrade("S", 15)) mult = mult.mul(upgradeEffect('S',15))
	if (hasUpgrade("S", 22)) mult = mult.mul(upgradeEffect('S',22))
	if (true) mult = mult.log10().pow(base).pow_base(10)
	if (true) mult = mult.mul(1.8e43)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "l", description: "L: Reset for Super PL", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "??",
            description: "Qt boost Booster base and new layer(WIP)",
            
            cost: new Decimal("1.79e308"),
            effect(){
                return hasAchievement('A',26)
            },
             effectDisplay() {
				return "nice!"
            }
	},
    },
    layerShown(){return hasUpgrade("a",14)}
})

addLayer("S", {
    name: "Super Quantum", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#00FFFF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Super Quantum", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.SL.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    branches: ["SL"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = player.SL.points.add(1).log10().pow(0.375).pow_base(10)
	if (hasUpgrade("S", 11)) mult = mult.mul(upgradeEffect('S',11))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
	db = new Decimal(0)
	base = new Decimal(2)
	sbase = new Decimal(0.375)
	    if (hasUpgrade("S", 21)) sbase = sbase.mul(1.1)
	    if (hasUpgrade('a', 21) && hasUpgrade('q', 31)) base = base.add(upgradeEffect("q",31).div(5))
	    if (hasUpgrade('a', 21) && hasUpgrade('q', 33)) base = base.add(upgradeEffect("q",33).div(5))
	    if (hasUpgrade('a', 21) && hasUpgrade('q', 34)) base = base.add(upgradeEffect("q",34).div(5))
	    if (hasUpgrade('SP', 12)) db = db.add(upgradeEffect("SP",12))
	    if (hasUpgrade("S", 13)) exp = exp.mul(upgradeEffect('S',13))
	    if (true) exp = exp.mul(db.mul(db.add(1)).div(2).pow_base(base).pow(sbase))
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "S", description: "S: Reset for Super Quantum", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "71",
            description: "Qt boost SQ",
            
            cost: new Decimal(1),
            effect(){
                return player.q.points.add("e9e15").log10().pow(5)
            },
             effectDisplay() {
				return upgradeEffect('S',11) + "xSQ"
            }
	},
        12: {
            title: "72",
            description: "Boost SL",
            
            cost: new Decimal(1e100),
            unlocked() {
		    return true
	    },
            effect(){
                return player.S.points.add(1e100).pow(0.0511).min(1e15)
            },
             effectDisplay() {
				return upgradeEffect('S',12) + "x Qc base"
            }
	},
        13: {
            title: "73",
            description: "SQ boost SQ expo",
            
            cost: new Decimal(1e100),
            unlocked() {
		    return true
	    },
            effect(){
		base = new Decimal(0.375)
		    if (hasUpgrade("S",21)) base = base.mul(1.1)
                return player.S.points.log10().mul(10).log10().mul(3.32).pow(base)
            },
             effectDisplay() {
				return upgradeEffect('S',13) + "x Expo"
            }
	},
        14: {
            title: "74",
            description: "Unlock row3",
            
            cost: new Decimal(1.79e308),
            unlocked() {
		    return true
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return ("row3!!")
            }
	},
	15: {
            title: "75",
            description: "SQ boost SL after Upgrade72 cap",
            cost: new Decimal("ee7"),
            unlocked() {
		    return hasUpgrade("SP", 12)
	    },
              effect(){
		return player.S.points.add(1e308).log10().mul(2).add(0.25).pow(0.5).pow_base(1.125)
            },
            effectDisplay() {
                return upgradeEffect("S",15)+ "xPL"
            },
        },
	21: {
            title: "76",
            description: "reduce S softcaps",
            cost: new Decimal("ee11"),
            unlocked() {
		    return hasUpgrade("SP", 12)
	    },
              effect(){
		return true
            },
            effectDisplay() {
                return "^1.1 expo"
            },
        },
	22: {
            title: "77",
            description: "SP boost PL",
            cost: new Decimal("e1.1e11"),
            unlocked() {
		    return hasUpgrade("SP", 12)
	    },
              effect(){
		return upgradeEffect("SP",21)
            },
            effectDisplay() {
                return upgradeEffect("SP",21) + "xPL"
            },
        },
    },
    layerShown(){return hasUpgrade("a",14)}
})
addLayer("SP", {
    name: "Spreon", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    requires: new Decimal("1.79e308"), // Can be a function that takes requirement increases into account
    resource: "Spreon", // Name of prestige currency
    baseResource: "SQt", // Name of resource prestige is based on
    baseAmount() {return player.S.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    branches: ["Qc","Y","Wa","S"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
	base = new Decimal(0.375)
	if (hasUpgrade('S', 21)) base = base.mul(1.1)
        mult = player.SL.points.pow(player.S.points.log10().mul(10).log10().mul(3.32))
	if (mult.gte("1.79e308")) mult = mult.div("1.79e308").log10().pow(base).pow_base(10).mul(1.79e308)
	if (mult.gte("1e1100")) mult = mult.div("1e1100").log10().pow(base.sub(0.125)).pow_base(10).mul("1e1100")
	if (mult.gte("1e1900")) mult = mult.div("1e1900").log10().pow(0.125).pow_base(10).mul("1e1900")
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for Spreon", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "101",
            description: "add booster based on SP",
            
            cost: new Decimal(1e90),
            unlocked() {
		    return true
	    },
            effect(){
                return player.SP.points.add("1e90").log10().div(3.2).log10().mul(3.321).add(1)
            },
             effectDisplay() {
				return upgradeEffect("SP",11) + "+Booster"
            }
        },
        12: {
            title: "102",
            description: "add booster based on SP on super Quantum",
            
            cost: new Decimal("2e316"),
            unlocked() {
		    return true
	    },
            effect(){
		db = upgradeEffect('SP',11).add(4.8).add(upgradeEffect('Qc',23))
		base = upgradeEffect('SP',11)
		qe = upgradeEffect('Qc',23)
		if (hasAchievement('A',25)) base =db.mul(db.add(1).div(2)).sub(qe.mul(qe.add(1).div(2))).pow(0.5)
                return base
            },
             effectDisplay() {
				return upgradeEffect("SP",11) + "+Booster"
            }
        },
        21: {
            title: "?",
            description: "SP boost PL",
            
            cost: new Decimal("1"),
            unlocked() {
		    return hasAchievement('A',23)
	    },
            effect(){
                return player.SP.points.add("1e308").pow(player.SP.points.add("1e308").log10())
            },
             effectDisplay() {
				return upgradeEffect("SP",21) + "xPL"
            }
        },
    },
    layerShown(){return true}
})
addLayer("f", {
    name: "Quantum form", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "QF", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Quantum form", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
update(diff) {
	if (hasUpgrade('f', 11)) generatePoints('f',diff*27.7);
},
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "201",
            description: "Generate QF",
            
            cost: new Decimal(1),
            unlocked() {
		    return true
	    },
            effect(){
                return new Decimal(27.7)
            },
             effectDisplay() {
				return upgradeEffect("f",11) + "/s"
            }
        },
        12: {
            title: "202",
            description: "unlock new Wave upgrade",
            
            cost: new Decimal("1000"),
            unlocked() {
		    return hasUpgrade("f",11)
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return true
            }
        },
        13: {
            title: "203",
            description: "Up26formula is better",
            
            cost: new Decimal("10000"),
            unlocked() {
		    return hasUpgrade("f",12)
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return true
            }
        },
        14: {
            title: "204",
            description: "unlock new layer (WIP)",
            
            cost: new Decimal("1e10"),
            unlocked() {
		    return hasUpgrade("f",11)
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return true
            }
        },
        15: {
            title: "205",
            description: "booster base +0.5",
            
            cost: new Decimal("600000"),
            unlocked() {
		    return hasUpgrade("f",13)
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return true
            }
        },
        21: {
            title: "g1",
            description: "boost theory based on view(Max,current 915)",
            
            cost: new Decimal("2000"),
            unlocked() {
		    return hasUpgrade("f",11)
	    },
            effect(){
                return new Decimal(1.213)
            },
             effectDisplay() {
				return upgradeEffect("f",21) + "xT"
            }
        },
        31: {
            title: "a1",
            description: "^2 Qt nice",
            
            cost: new Decimal("100"),
            unlocked() {
		    return hasUpgrade("f",11)
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "nice"
            }
        },
        32: {
            title: "a2",
            description: "theory doesn't need Up10",
            
            cost: new Decimal("7000"),
            unlocked() {
		    return hasUpgrade("f",31)
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "nice"
            }
        },
    },
    layerShown(){return true}
})
