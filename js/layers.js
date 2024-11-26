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
	    if (hasUpgrade('SL',11) && hasUpgrade('a',25)) base.max(upgradeEffect('q',24).div(5).pow(2))
	    if (hasUpgrade('I', 22)) base = base.max(10)
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
	    if (hasUpgrade("ID",11)) exp = exp.mul(upgradeEffect('ID',11))
	    if (hasUpgrade('t', 14)) exp = exp.pow(upgradeEffect("t",14))
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
                return player.q.points.mul("1e6160").log10().div(6161).log10().mul(3.32)
            },
            effectDisplay() {
                return upgradeEffect('q',25) + "T Base (formula:(base^2+base)/2)"
            },
        },
	31: {
            title: "11",
            description: "Qt slightly boost Qc expo",
            cost: new Decimal("1e200000"),
            unlocked() {
		    return hasUpgrade("q", 24)
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
	35: {
            title: "15",
            description: "Add new layer(WIP)",
            cost: new Decimal("ee10000"),
            unlocked() {
		    return hasAchievement("A", 32)
	    },
              effect(){
                return true
            },
            effectDisplay() {
                return "Nice"
            },
        },
        41: {
            title: "??",
            description: "+0.3to QF gen",
            
            cost: new Decimal("e250"),
            effect(){
                return true
            },
             effectDisplay() {
				return "nice"
            }
	},
    },
		doReset(resettingLayer) {
			let keep = [];
			if (hasAchievement("A", 34)) keep.push("upgrades")
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
        31: {
            name: "Quark",
            tooltip: "Get Quark",
            done() {
                return (player.Qk.points.gte("1"))
            },
            onComplete() {
                addPoints("A",1)
            }
        },
        32: {
            name: "Extreme",
            tooltip: "Get ee100Qt without Q,Qc upgrade. Reward: 1 AP, Auto IP,A, Unlock ID, Add new QF upgrade,Keep Qc Upgrade",
            done() {
                return (player.q.points.gte("ee100") && !hasUpgrade("q",11) && !hasUpgrade("Qc",11) && !hasUpgrade("t",11))
            },
            onComplete() {
                addPoints("A",1)
            }
        },
        33: {
            name: "Row 4!!!",
            tooltip: "Reward: 1 AP, add 500 to QF gen",
            done() {
                return (player.e.points.gte(1) || player.dp.points.gte(1) || player.SQ.points.gte(1))
            },
            onComplete() {
                addPoints("A",1)
            }
        },
        34: {
            name: "(Row 4)*3",
            tooltip: "Reward: 1 AP, add 1000 to QF gen,Keep SP,SL,S,Q,W2~W4 upgrade",
            done() {
                return (player.e.points.gte(1) && player.dp.points.gte(1) && player.SQ.points.gte(1))
            },
            onComplete() {
                addPoints("A",1)
            }
        },
        35: {
            name: "INF5",
            tooltip: "Reward: 1 AP, add 1000 to QF gen Keep W upgrade",
            done() {
                return (player.e.points.gte(1.79e308))
            },
            onComplete() {
                addPoints("A",1)
            }
        },
        36: {
            name: "INF6",
            tooltip: "Reward: 1 AP, add 1000 to QF gen",
            done() {
                return (player.W.points.gte(1.79e308))
            },
            onComplete() {
                addPoints("A",1)
            }
        },
        41: {
            name: "Gas",
            tooltip: "get 1e30 Acceleron Reward: 1 AP, add 1000 to QF gen Keep Acc upgrade on reset",
            done() {
                return (player.a.points.gte(1e30))
            },
            onComplete() {
                addPoints("A",1)
            }
        },
        42: {
            name: "New theory",
            tooltip: "Reward: 1 AP, add 1000 to QF gen(WIP)",
            done() {
                return (player.t.points.gte(1e12) && player.Li.points.gte(1e9))
            },
            onComplete() {
                addPoints("A",1)
            }
        },
        43: {
            name: "Many theory",
            tooltip: "req:1000BT Reward: 1 AP, Unlock new upgrades",
            done() {
                return (player.DT.points.gte(1000))
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
        exp = new Decimal(1)
	one = new Decimal(1)
	    if (hasUpgrade('q', 21)) exp = exp.add(1)
	    if (hasUpgrade('q', 22)) exp = exp.add(1)
	    if (hasUpgrade('q', 31)) exp = exp.add(upgradeEffect("q",31))
	    if (hasUpgrade('q', 33)) exp = exp.add(upgradeEffect("q",33))
	    if (hasUpgrade('q', 34)) exp = exp.add(upgradeEffect("q",34))
	    if (hasUpgrade('Wa', 12)) mult = mult.mul(upgradeEffect('Wa',12))
            if (hasUpgrade("e",11)) mult = mult.mul(upgradeEffect('e',11).pow_base(10))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
   	 exp = new Decimal(1)
	    if (hasUpgrade('q', 21)) exp = exp.add(1)
	    if (hasUpgrade('q', 22)) exp = exp.add(1)
	    if (hasUpgrade('q', 31)) exp = exp.add(upgradeEffect("q",31))
	    if (hasUpgrade('q', 33)) exp = exp.add(upgradeEffect("q",33))
	    if (hasUpgrade('q', 34)) exp = exp.add(upgradeEffect("q",34))
	    if (hasUpgrade('e', 11)) exp = exp.pow(0)
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
        31: {
            title: "???",
            description: "add 2 to QF gen",
            
            cost: new Decimal("1"),
            effect(){
                return true
            },
             effectDisplay() {
				return "nice"
            }
	},
    },
		doReset(resettingLayer) {
			let keep = [];
			if (hasAchievement("A", 32)) keep.push("upgrades")
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
        if (hasUpgrade('I', 13)) mult = mult.mul(upgradeEffect('I',13))
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
        14: {
            title: "29",
            description: "Theory and wave make ν,which boost Qt expo!!",
            
            cost: new Decimal(1e9),
            unlocked() {
		    return hasUpgrade('f',14)
	    },
            effect(){
		return player.t.points.add(1e9).mul(player.W.points.add(1)).mul(player.Wa.points.add(1)).mul(player.Wb.points.add(1)).mul(player.Wc.points.add(1)).log10().mul(2.0959).log10().mul(2.0959).add(3).log10().mul(2.0959)
            },
             effectDisplay() {
				return "You have e" + player.t.points.add(1e9).mul(player.W.points.add(1)).mul(player.Wa.points.add(1)).mul(player.Wb.points.add(1)).mul(player.Wc.points.add(1)).log10() +"ν, Which Boost Qt expo by" + upgradeEffect('t',14)
            }
	},
        15: {
            title: "30",
            description: "Add new layer(WIP)",
            
            cost: new Decimal(1e12),
            unlocked() {
		    return true
	    },
            effect(){
		return true
            },
             effectDisplay() {
				return "???"
            }
	},
        21: {
            title: "??",
            description: "Add 10 to QF gen",
            
            cost: new Decimal(2),
            unlocked() {
		    return true
	    },
            effect(){
		return true
            },
             effectDisplay() {
				return "+10 QF gen"
            }
	},
        22: {
            title: "31",
            description: "Unlock New upgrade in row 4",
            
            cost: new Decimal(2e12),
            unlocked() {
		    return hasUpgrade('t',15)
	    },
            effect(){
		return true
            },
             effectDisplay() {
				return "???"
            }
	},
        23: {
            title: "32",
            description: "Unlock New upgrade in row 4",
            
            cost: new Decimal(2e13),
            unlocked() {
		    return hasUpgrade('t',15)
	    },
            effect(){
		return true
            },
             effectDisplay() {
				return "???"
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
	if (hasUpgrade("q", 32) || hasUpgrade("t",13)) multb = multb.add(1)
	if (hasUpgrade("a", 23)) multb = multb.mul(player.t.points)
	if (hasUpgrade("a", 32)) multb = multb.mul(30)
        return multb
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for accelerons", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
update(diff) {
	if (hasAchievement('A', 32)) generatePoints('a',diff);
},
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
        22: {
            title: "46",
            description: "Unlock Wave 4 which is OP(INF req)",
            cost: new Decimal("4e6"),
            unlocked() {
		    return hasUpgrade("I",11)
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "OP"
            }
	},
        23: {
            title: "47",
            description: "T boost Acceleron gain",
            cost: new Decimal("1e10"),
            unlocked() {
		    return hasAchievement("A",33)
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "OP"
            }
	},
        24: {
            title: "48",
            description: "^2 ID effect",
            cost: new Decimal("1e20"),
            unlocked() {
		    return hasAchievement("A",34)
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "OP"
            }
	},
        25: {
            title: "49",
            description: "Booster base formula better",
            cost: new Decimal("1e25"),
            unlocked() {
		    return hasAchievement("A",34)
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "OP"
            }
	},
        31: {
            title: "50",
            description: "Unlock new layer(WIP),Proton Boost Waves",
            cost: new Decimal("1e30"),
            unlocked() {
		    return hasAchievement("A",34)
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "OP"
            }
	},
        32: {
            title: "??",
            description: "Boost A gain",
            cost: new Decimal("1e25"),
            unlocked() {
		    return hasAchievement("A",34)
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "OP"
            }
	},
    },
		doReset(resettingLayer) {
			let keep = [];
			if (hasAchievement("A", 41)) keep.push("upgrades")
		},
    layerShown(){return hasUpgrade("q", 32) || hasUpgrade("t",13)}
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
update(diff) {
	if (hasUpgrade('I', 12)) generatePoints('SL',diff);
},
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
		doReset(resettingLayer) {
			let keep = [];
			if (hasAchievement("A", 34)) keep.push("upgrades")
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
	    if (hasUpgrade('SL',11) && hasUpgrade('a',25)) base.max(upgradeEffect('q',24).div(5).pow(2))
	    if (hasUpgrade('SP', 12)) db = db.add(upgradeEffect("SP",12))
	    if (hasUpgrade("S", 13)) exp = exp.mul(upgradeEffect('S',13))
	    if (true) exp = exp.mul(db.mul(db.add(1)).div(2).pow_base(base).pow(sbase))
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "S", description: "S: Reset for Super Quantum", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
update(diff) {
	if (hasUpgrade('I', 12)) generatePoints('S',diff);
},
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
		doReset(resettingLayer) {
			let keep = [];
			if (hasAchievement("A", 34)) keep.push("upgrades")
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
    branches: ["Qc","Wa","S"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
	base = new Decimal(0.375)
	sf2 = new Decimal(0.125)
	if (hasUpgrade('Qk', 12)) sf2 = sf2.sub(0.125)
	if (hasUpgrade('S', 21)) base = base.mul(1.1)
        mult = player.SL.points.pow(player.S.points.log10().mul(10).log10().mul(3.32))
	if (mult.gte("1.79e308")) mult = mult.div("1.79e308").log10().pow(base).pow_base(10).mul(1.79e308)
	if (mult.gte("1e1100")) mult = mult.div("1e1100").log10().pow(base.sub(sf2)).pow_base(10).mul("1e1100")
	if (mult.gte("1e1900")) mult = mult.div("1e1900").log10().pow(base.sub(sf2)).pow_base(10).mul("1e1900")
	if (mult.gte("1e2400")) mult = mult.div("1e2400").log10().pow(0.37).pow_base(10).mul("1e2400")
	if (mult.gte("1e10500")) mult = mult.div("1e10500").log10().pow(0.37).pow_base(10).mul("1e10500")
	if (mult.gte("1e30000")) mult = mult.div("1e30000").log10().pow(0.05).pow_base(10).mul("1e30000")
	if (hasUpgrade('Qk', 11)) mult = mult.mul(upgradeEffect('Qk',11))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for Spreon", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
update(diff) {
	if (hasUpgrade('I', 12)) generatePoints('SP',diff);
},
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
        13: {
            title: "103",
            description: "Keep Up8 effect on Row 3",
            
            cost: new Decimal("1e1300"),
            unlocked() {
		    return true
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "for achievement"
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
        22: {
            title: "???",
            description: "Add 100 to QF gen!!",
            
            cost: new Decimal("1"),
            unlocked() {
		    return true
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "add 100 to QF gen!!"
            }
        },
    },
		doReset(resettingLayer) {
			let keep = [];
			if (hasAchievement("A", 34)) keep.push("upgrades")
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
	if (hasUpgrade('f', 11)) generatePoints('f',diff*upgradeEffect('f',11));
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
                base = new Decimal(27.7)
		    if (hasUpgrade('q',41)) base = base.add(0.3)
		    if (hasUpgrade('Qc',31)) base = base.add(2)
		    if (hasUpgrade('t',21)) base = base.add(10)
		    if (hasUpgrade('SP',22)) base = base.add(100)
		    if (hasUpgrade('f',41)) base = base.add(10000)
		    if (hasUpgrade('I',21)) base = base.add(100)
		    if (hasUpgrade('ID',12)) base = base.add(100)
		    if (hasAchievement('A',33)) base = base.add(500)
		    if (hasAchievement('A',34)) base = base.add(1000)
		    if (hasAchievement('A',35)) base = base.add(1000)
		    if (hasAchievement('A',36)) base = base.add(1000)
		    if (hasAchievement('A',41)) base = base.add(1000)
		    if (hasAchievement('A',42)) base = base.add(1000)
		    if (hasUpgrade('f',22)) base = base.mul(1.1)
		return base
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
            description: "add 1 theory Upgrade",
            
            cost: new Decimal("2700000"),
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
            description: "boost theory based on view(Max,current 1065)",
            
            cost: new Decimal("2000"),
            unlocked() {
		    return hasUpgrade("f",11)
	    },
            effect(){
                return new Decimal(1.242)
            },
             effectDisplay() {
				return upgradeEffect("f",21) + "xT"
            }
        },
        22: {
            title: "206",
            description: "+10% to QF,Qk gen but expensive",
            
            cost: new Decimal("99999"),
            unlocked() {
		    return hasUpgrade("f",21)
	    },
            effect(){
                return new Decimal(1.1)
            },
             effectDisplay() {
				return "1.1x Qk"
            }
        },
        23: {
            title: "207",
            description: "+70% to Qk gen",
            
            cost: new Decimal("22222"),
            unlocked() {
		    return hasUpgrade("f",22)
	    },
            effect(){
                return new Decimal(1.7)
            },
             effectDisplay() {
				return "1.7x Qk"
            }
        },
        23: {
            title: "208",
            description: "^1.04 Qk so small",
            
            cost: new Decimal("22222222"),
            unlocked() {
		    return hasUpgrade("f",23)
	    },
            effect(){
                return new Decimal(1.7)
            },
             effectDisplay() {
				return "1.7x Qk"
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
        32: {
            title: "a3",
            description: "Unlock new layer(WIP)",
            
            cost: new Decimal("1000000"),
            unlocked() {
		    return hasAchievement("A",32)
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "nice"
            }
        },
        41: {
            title: "h1",
            description: "add 10000 to Up201 base only for dev",
            
            cost: new Decimal(1e18),
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
addLayer("I", {
    name: "Infinity point", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#C68A2C",
    requires: new Decimal(308.3), // Can be a function that takes requirement increases into account
    resource: "IP", // Name of prestige currency
    baseResource: "Qt expo^2", // Name of resource prestige is based on
    baseAmount() {return player.q.points.add("1.8e43").log10().log10()}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    branches: ["Qc","Wa","S"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(player.q.points.add(1.8e43).log10().log10().sub(308.3))
	if (hasUpgrade('Li',11)) mult = mult.mul(upgradeEffect('Li',11))
	if (hasUpgrade('DT',15)) mult = mult.mul(upgradeEffect('DT',15))
        if (hasUpgrade('DT',24)) mult = mult.mul(10)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for IP", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
update(diff) {
	if (hasAchievement('A', 32)) generatePoints('I',diff);
},
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "111",
            description: "IP boost Waves(WIP)",
            
            cost: new Decimal("1"),
            effect(){
                return player.I.points.add(1)
            },
             effectDisplay() {
				return upgradeEffect("I",11) + "x Waves"
            }
	},
        12: {
            title: "112",
            description: "Auto SL,SQ,SP",
            
            cost: new Decimal("1"),
            effect(){
                return true
            },
             effectDisplay() {
				return "nice"
            }
	},
        13: {
            title: "113",
            description: "IP boost Theory",
            
            cost: new Decimal("1"),
            effect(){
                return player.I.points.add(1).log10()
            },
             effectDisplay() {
				return upgradeEffect('I',13) + 'x theory' 
            }
	},
        14: {
            title: "114",
            description: "30ID/s",
            
            cost: new Decimal("1e8"),
            effect(){
                return true
            },
             effectDisplay() {
				return 'OP' 
            }
	},
        21: {
            title: "???",
            description: "Add 100 to QF gen",
            
            cost: new Decimal("1"),
            effect(){
                return true
            },
             effectDisplay() {
				return 'OP' 
            }
	},
        22: {
            title: "???",
            description: "Booster base can't lower than 10",
            cost: new Decimal("1"),
            unlocked() {
		    return upgradeEffect("q",34).gte(36)
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return 'OP' 
            }
	},
    },
    layerShown(){return hasUpgrade("SL",11) || player.I.points.gte(1) || hasUpgrade("I",11)}
})
addLayer("ID", {
    name: "Infinity Dimension", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ID", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFF00",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "ID", // Name of prestige currency
    baseResource: "IP", // Name of resource prestige is based on
    baseAmount() {return player.I.points}, // Get the current amount of baseResource
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
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "151",
            description: "ID boost Qt",
            
            cost: new Decimal("1"),
            effect(){
		    db = new Decimal(0)
		    base = new Decimal(0)
	            if (hasUpgrade('Qc', 11)) db = db.add(0.9)
	            if (hasUpgrade('Qc', 12)) db = db.add(0.9)
	            if (hasUpgrade('Qc', 13)) db = db.add(0.1)
	            if (hasUpgrade('Qc', 14)) db = db.add(0.9)
	            if (hasUpgrade('Qc', 15)) db = db.add(0.1)
	            if (hasUpgrade('Qc', 21)) db = db.add(0.9)
	            if (hasUpgrade('Qc', 22)) db = db.add(1)
	            if (hasUpgrade('Qc', 23)) db = db.add(upgradeEffect("Qc",23))
	            if (hasUpgrade('SP', 11)) db = db.add(upgradeEffect("SP",11))
		    if (true) base = db.mul(7).mul(player.ID.points.add(1).log(10)).pow_base(10)
		    if (hasUpgrade('a',24)) base = base.pow(2)
                return base
            },
             effectDisplay() {
				return "^" + upgradeEffect("ID",11) + "Qt(WIP,OP)"
            }
	},
        12: {
            title: "???",
            description: "Add 100 to QF gen!!",
            
            cost: new Decimal("1"),
            unlocked() {
		    return true
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "add 100 to QF gen!!"
            }
        },
    },
update(diff) {
	if (hasUpgrade('I', 14)) generatePoints('ID',diff*30);
},
    layerShown(){return hasAchievement('A',32)}
})
addLayer("dp", {
    name: "proton", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "γ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF00FF",
    requires: new Decimal(1e12), // Can be a function that takes requirement increases into account
    resource: "proton", // Name of prestige currency
    baseResource: "Theory", // Name of resource prestige is based on
    baseAmount() {return player.t.points.max(1e12)}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade('dp',12)) mult = mult.mul(2)
	if (hasUpgrade('dp',13)) mult = mult.mul(6)
	if (hasUpgrade('DT',13)) mult = mult.mul(upgradeEffect("DT",13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
update(diff) {
	if (hasUpgrade('dp', 11)) generatePoints('dp',diff);
},
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "241",
            description: "auto γ and γ boost PL",
            cost: new Decimal("1"),
            effect(){
		exp = new Decimal(1)
	        db = new Decimal(0)
	        base = new Decimal(2)
	         if (hasUpgrade('f', 15)) base = base.add(0.5)
	         if (hasUpgrade('SL',11)) base = base.add(2.2).add(upgradeEffect('q',24).div(5))
	         if (hasUpgrade('I', 22)) base = base.max(10)
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
     	         if (hasUpgrade("ID",11)) exp = exp.mul(upgradeEffect('ID',11))
    	         if (hasUpgrade('t', 14)) exp = exp.pow(upgradeEffect("t",14))
                return player.dp.points.add(1).log10().div(1.3011).mul(exp.log10().add(upgradeEffect("ID",11).log10())).pow_base(10).pow_base(10)
            },
             effectDisplay() {
				return upgradeEffect("dp",11) + "x PL(WIP)"
            }
	},
      12: {
            title: "242",
            description: "2x Proton",
            
            cost: new Decimal("1500"),
            effect(){
                return hasUpgrade('t',22)
            },
             effectDisplay() {
				return "nice!"
            }
	},
      13: {
            title: "243",
            description: "6x Proton",
            
            cost: new Decimal("20000"),
            effect(){
                return hasUpgrade('t',23)
            },
             effectDisplay() {
				return "nice!"
            }
	},
    },
    layerShown(){return hasUpgrade("t",15)}
})
addLayer("DT", {
    name: "Bosonic Theory", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BT", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF00FF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "BT", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (true) mult = mult.mul(player.SP.points.add(1).log10().div(100))
	if (true) mult = mult.mul(player.q.points.add(1.8e43).log10().log10().div(20000))
	if (true) mult = mult.mul(player.I.points.add(1e8).log10().sub(8))
        mult = mult.sub(player.DT.points)
        mult = mult.max(0)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
update(diff) {
	if (hasUpgrade('g', 51)) generatePoints('BT',diff);
},
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "301",
            description: "Auto W1~4 with Boost",
            
            cost: new Decimal("1"),
            effect(){
                return hasAchievement('A',26)
            },
             effectDisplay() {
				return "nice!"
            }
	},
        12: {
            title: "302",
            description: "Auto Qk",
            
            cost: new Decimal("1"),
            effect(){
                return hasAchievement('A',26)
            },
             effectDisplay() {
				return "nice!"
            }
	},
        13: {
            title: "303",
            description: "Boost γ gain",
            
            cost: new Decimal("8"),
            effect(){
                return player.DT.points.add(8).div(8)
            },
             effectDisplay() {
				return upgradeEffect('DT',13) + "xγ"
            }
	},
        14: {
            title: "304",
            description: "Boost Waves gain",
            
            cost: new Decimal("100"),
            effect(){
                return player.DT.points.add(100)
            },
             effectDisplay() {
				return upgradeEffect('DT',14) + "xWaves"
            }
	},
        15: {
            title: "305",
            description: "Boost IP gain",
            
            cost: new Decimal("309"),
            effect(){
                return player.DT.points.add(308).div(10)
            },
             effectDisplay() {
				return upgradeEffect('DT',15) + "xIP"
            }
	},
        21: {
            title: "306",
            description: "Auto SQk gain with Boost",
            cost: new Decimal("1"),
            unlocked() {
		    return hasAchievement("A",43)
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "1000xSQk"
            }
	},
        22: {
            title: "307",
            description: "1kx light",
            cost: new Decimal("1"),
            unlocked() {
		    return true
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "1000xLight"
            }
	},
        22: {
            title: "307",
            description: "1kx light",
            cost: new Decimal("1"),
            unlocked() {
		    return true
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "1000xLight"
            }
	},
        23: {
            title: "308",
            description: "Auto glueon with Boost",
            cost: new Decimal("1000"),
            unlocked() {
		    return true
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "OP"
            }
	},
        25: {
            title: "309",
            description: "10x IP",
            cost: new Decimal("2000"),
            unlocked() {
		    return true
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "???"
            }
	},
    },
    layerShown(){return hasAchievement("A",42)}
})
