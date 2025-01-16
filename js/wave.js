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
	if (hasUpgrade("Wc", 13)) multw = multw.mul(upgradeEffect('Wc',13).pow(3))
	if (hasUpgrade("Wd", 13)) multw = multw.mul(upgradeEffect('Wc',13).pow(4))
	if (hasUpgrade("I", 11)) multw = multw.mul(upgradeEffect('I',11))
	if (hasUpgrade("a", 31)) multw = multw.mul(player.dp.points)
        return multw
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
	    if (hasUpgrade('g',13)) exp = exp.mul(upgradeEffect('g',13))
	return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "W: Reset for Waves", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
update(diff) {
	if (hasUpgrade('W', 11)) generatePoints('W',diff);
	if (hasUpgrade('DT', 11)) generatePoints('W',diff*900);
	if (hasUpgrade('DT', 25)) generatePoints('W',diff*1e43);
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
		base = player.W.points.add(100).log10().mul(1.107)
		    if (hasUpgrade('g',14)) base = base.pow(upgradeEffect('g',14))
                return base
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
        15: {
            title: "55",
            description: "Unlock new layer!(WIP)",
            
            cost: new Decimal(1e80),
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
    },
		doReset(resettingLayer) {
			let keep = [];
			if (hasAchievement("A", 34)) keep.push("upgrades")
		},
    layerShown(){return hasUpgrade("a", 13) && !hasUpgrade("e", 14)}
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
	if (hasUpgrade("Wc", 13)) multw = multw.mul(upgradeEffect('Wc',13).pow(2))
	if (hasUpgrade("Wd", 13)) multw = multw.mul(upgradeEffect('Wd',13).pow(3))
	if (hasUpgrade("I", 11)) multw = multw.mul(upgradeEffect('I',11))
	if (hasUpgrade("a", 31)) multw = multw.mul(player.dp.points)
        return multw
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
	    if (hasUpgrade('g',13)) exp = exp.mul(upgradeEffect('g',13))
	return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
update(diff) {
	if (hasUpgrade('Wa', 11)) generatePoints('Wa',diff);
	if (hasUpgrade('DT', 11)) generatePoints('Wa',diff*900);
	if (hasUpgrade('DT', 25)) generatePoints('Wa',diff*1e43);
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
        15: {
            title: "60",
            description: "Unlock new layer WIP",
            
            cost: new Decimal(1e80),
            unlocked() {
		    return hasUpgrade("f",33)
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
			if (hasAchievement("A", 34)) keep.push("upgrades")
		},
    layerShown(){return hasUpgrade("a", 13) && !hasUpgrade("e", 14)}
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
	if (hasUpgrade("Wc", 13)) multw = multw.mul(upgradeEffect('Wc',13))
	if (hasUpgrade("I", 11)) multw = multw.mul(upgradeEffect('I',11))
	if (hasUpgrade("a", 31)) multw = multw.mul(player.dp.points)
        return multw
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
	    if (hasUpgrade('g',13)) exp = exp.mul(upgradeEffect('g',13))
	return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
update(diff) {
	if (hasUpgrade('Wb', 11)) generatePoints('Wb',diff);
	if (hasUpgrade('DT', 11)) generatePoints('Wb',diff*900);
	if (hasUpgrade('DT', 25)) generatePoints('Wb',diff*1e43);
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
		doReset(resettingLayer) {
			let keep = [];
			if (hasAchievement("A", 34)) keep.push("upgrades")
		},
    layerShown(){return hasUpgrade("a", 13) && !hasUpgrade("e", 14)}
})
addLayer("Wc", {
    name: "Wave4", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W4", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#989898",
    requires: new Decimal(1.8e7), // Can be a function that takes requirement increases into account
    resource: "Wave4", // Name of prestige currency
    baseResource: "Theory", // Name of resource prestige is based on
    baseAmount() {return player.t.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    branches: ["Wa","Wb"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        multw = new Decimal(0)
	if (hasUpgrade("a", 22)) multw = multw.add(0.01)
	if (hasUpgrade("Wc", 12)) multw = multw.mul(upgradeEffect('Wc',12))
	if (hasUpgrade("I", 11)) multw = multw.mul(upgradeEffect('I',11))
	if (hasUpgrade("a", 31)) multw = multw.mul(player.dp.points)
        return multw
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
	    if (hasUpgrade('g',13)) exp = exp.mul(upgradeEffect('g',13))
	return exp
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
update(diff) {
	if (hasUpgrade('Wc', 11)) generatePoints('Wc',diff);
	if (hasUpgrade('DT', 11)) generatePoints('Wc',diff*900);
	if (hasUpgrade('DT', 25)) generatePoints('Wc',diff*1e43);
},
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "66",
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
            title: "67",
            description: "Qt boost wave4",
            
            cost: new Decimal(1),
            unlocked() {
		    return true
	    },
            effect(){
                return player.q.points.add("e9e15").log10().div(500).log10()
            },
             effectDisplay() {
				return upgradeEffect('Wc',12) + "x waves"
            }
	},
        13: {
            title: "68",
            description: "Wave4 Boost Wave1~3",
            
            cost: new Decimal(1),
            unlocked() {
		    return true
	    },
            effect(){
                return player.Wc.points.add("1")
            },
             effectDisplay() {
				return "nice and OP"
            }
	},
    },
		doReset(resettingLayer) {
			let keep = [];
			if (hasAchievement("A", 34)) keep.push("upgrades")
		},
    layerShown(){return hasUpgrade("a", 22) && !hasUpgrade("e", 14)}
})
addLayer("Qk", {
    name: "Quark", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Qk", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#00FF7F",
    requires: new Decimal(1e80), // Can be a function that takes requirement increases into account
    resource: "Quark", // Name of prestige currency
    baseResource: "Waves", // Name of resource prestige is based on
    baseAmount() {return player.W.points.add(1e80)}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    branches: ["Wa","Wb"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        multw = new Decimal(1)
	if (hasUpgrade("f", 22)) multw = multw.mul(1.1)
        if (hasUpgrade("f", 23)) multw = multw.mul(1.7)
	if (hasUpgrade('SQ',11)) multw = multw.mul(upgradeEffect("SQ",11))
        return multw
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
	        if (hasUpgrade('g',21)) exp = exp.mul(upgradeEffect('g',21))
	return exp
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
update(diff) {
	if (hasUpgrade('Qk',11)) generatePoints('Qk',diff);
	if (hasUpgrade('DT', 11)) generatePoints('Qk',diff);
},
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "131",
            description: "Qk boost SP also Auto Quark gain",
            
            cost: new Decimal(1),
            effect(){
		base = new Decimal(9)
		if (hasAchievement("A",32)) base = base.add(41)
		if (hasUpgrade("Qk",13)) base = base.mul(1.5)
		if (hasUpgrade("Qk",14)) base = base.add(25)
                return player.Qk.points.add(1).pow(base)
            },
             effectDisplay() {
				return upgradeEffect('Qk',11)
            }
	},
        12: {
            title: "132",
            description: "Reduce 2th Spreon Softcap",
            
            cost: new Decimal(1),
            effect(){
                return true
            },
             effectDisplay() {
				return true
            }
	},
        13: {
            title: "133",
            description: "^1.5 up131effect",
            
            cost: new Decimal(1e10),
            effect(){
                return true
            },
             effectDisplay() {
				return true
            }
	},
        14: {
            title: "134",
            description: "^(4/3) up131effect",
            
            cost: new Decimal("1.8e308"),
            effect(){
                return true
            },
             effectDisplay() {
				return true
            }
	},
        21: {
            title: "???",
            description: "Bugged get achievement32",
            
            cost: new Decimal(1),
            unlocked() {
		    return (hasAchievement('A',31))
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return true
            }
	},
    },
		doReset(resettingLayer) {
			let keep = [];
			if (hasAchievement("A", 34)) keep.push("upgrades")
		},
    layerShown(){return hasUpgrade("W", 15) || hasUpgrade('Qk',11)}
})
addLayer("e", {
    name: "electron", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "e", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFF00",
    requires: new Decimal(1e80), // Can be a function that takes requirement increases into account
    resource: "electron", // Name of prestige currency
    baseResource: "Wave2", // Name of resource prestige is based on
    baseAmount() {return player.Wa.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
	dc = new Decimal(1)
	    if (hasUpgrade('q', 21)) dc = dc.add(1)
	    if (hasUpgrade('q', 22)) dc = dc.add(1)
	    if (hasUpgrade('q', 31)) dc = dc.add(upgradeEffect("q",31))
	    if (hasUpgrade('q', 33)) dc = dc.add(upgradeEffect("q",33))
	    if (hasUpgrade('q', 34)) dc = dc.add(upgradeEffect("q",34))
        mult = (player.q.points.add("ee100").log10().log10().add(player.W.points.add(1e80).log10()).mul(dc.add(3)).div(100000).pow_base(10).div(10))
	    if (hasUpgrade('e', 12)) mult = mult.mul(10000)
            if (hasUpgrade('e', 12)) mult = mult.mul(1e15)
	    if (mult.gte("ee25")) mult = mult.log10().div(1e24).log10().mul(1e25).pow_base(10)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
	    if (hasUpgrade('g',21)) exp = exp.mul(upgradeEffect('g',21))
	return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "e: Reset for electron", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "231",
            description: "e mult qc",
            
            cost: new Decimal("1"),
            effect(){
		dim = new Decimal(1)
		if (hasUpgrade('q',24)) dim = dim.add(upgradeEffect("q",24))
                   return player.e.points.mul(1e43).pow(dim).log10()
            },
             effectDisplay() {
				return "e" + upgradeEffect('e',11) + "x Qc"
            }
	},
        12: {
            title: "232",
            description: "10000x e",
            
            cost: new Decimal("1e30"),
            unlocked() {
		    return (hasUpgrade('t',22) || hasUpgrade('e',12))
	    },
            effect(){
                   return true
            },
             effectDisplay() {
				return "1e4x e"
            }
	},
        13: {
            title: "233",
            description: "1e15x e",
            
            cost: new Decimal("1e180"),
            unlocked() {
		    return (hasUpgrade('t',23) || hasUpgrade('e',12))
	    },
            effect(){
                   return true
            },
             effectDisplay() {
				return "1e15x e"
            }
	},
        14: {
            title: "234",
            description: "Hide some layer",
            
            cost: new Decimal("1"),
            unlocked() {
		    return (hasUpgrade('DT',44))
	    },
            effect(){
                   return true
            },
             effectDisplay() {
				return "1e15x e"
            }
	},
    },
update(diff) {
	if (player.e.points.gte(1.79e308)) generatePoints('e',diff*0.01);	
	if (hasUpgrade('DT', 31)) generatePoints('e',diff*900);
},
    layerShown(){return hasUpgrade("Wa",15)}
})
addLayer("SQ", {
    name: "SQuark", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SQ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#00FF7F",
    requires: new Decimal("1.8e308"), // Can be a function that takes requirement increases into account
    resource: "SQuark", // Name of prestige currency
    baseResource: "Spreon", // Name of resource prestige is based on
    baseAmount() {return player.SP.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    branches: ["Wc"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        multw = new Decimal(1)
	exp = new Decimal(0.1875)
        if (hasUpgrade('DT',34)) exp = exp.mul(2.2)
	if (true) multw = multw.mul(player.SP.points.add(1).log10().div(308.26).pow(exp).sub(1).pow_base(10))
        return multw
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
	return exp
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
update(diff) {
	if (hasUpgrade('SQ',11)) generatePoints('SQ',diff);
	if (hasUpgrade('DT',21)) generatePoints('SQ',diff*999);
},
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "131",
            description: "SQk boost Qk also Auto SQuark gain",
            
            cost: new Decimal(1),
            effect(){
                return player.SQ.points.add(1).pow(3)
            },
             effectDisplay() {
				return upgradeEffect('SQ',11) + "×Qk"
            }
	},
    },
    layerShown(){return hasUpgrade("q", 35) || player.SQ.points.gte(1)}
})
addLayer("g", {
    name: "glueon", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "g", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    requires: new Decimal("1.8e308"), // Can be a function that takes requirement increases into account
    resource: "glueon", // Name of prestige currency
    baseResource: "Wave", // Name of resource prestige is based on
    baseAmount() {return player.W.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    branches: ["Wc"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        multw = new Decimal(1)
        if (hasUpgrade('DT',41)) multw = multw.mul(1000)
        if (hasUpgrade('DT',42)) multw = multw.mul(10000000)
        if (hasUpgrade('DT',43)) multw = multw.mul(100000000)
        return multw
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
	return exp
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
update(diff) {
	if (hasUpgrade('DT',23)) generatePoints('g',diff*1000);
},
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "311",
            description: "Unlock first glueon effect",
            
            cost: new Decimal(1),
            effect(){
		three = new Decimal(3)
                return three.div(upgradeEffect('g',41).add(1).log10().pow(0.375)).pow_base(upgradeEffect('g',41))
            },
             effectDisplay() {
				return upgradeEffect('g',11) + "x waves"
            }
	},
        12: {
            title: "312",
            description: "Unlock Second effect",
            
            cost: new Decimal(1),
            effect(){
                return upgradeEffect('g',41).add(1).log10().div(130.11).add(1)
            },
             effectDisplay() {
				return upgradeEffect('g',13) + "xBooster Expo!!"
            }
	},
        13: {
            title: "313",
            description: "Unlock Third effect",
            
            cost: new Decimal(1),
            effect(){
                return upgradeEffect('g',41).add(1).log10().div(130.11).add(1)
            },
             effectDisplay() {
				return upgradeEffect('g',14) + "Waves Expo!!"
            }
	},
        14: {
            title: "314",
            description: "Unlock fourth effect",
            
            cost: new Decimal(1),
            effect(){
                return upgradeEffect('g',41).add(1).log10().div(130.11).add(1)
            },
             effectDisplay() {
				return upgradeEffect('g',12) + "to Upg52 Expo!!"
            }
	},
        21: {
            title: "??1",
            description: "Unlock new glueon effect(didn'tboosted by g upg41)",
            
            cost: new Decimal(1),
            unlocked() {
		    return (hasUpgrade('g',21) || player.Wa.points.gte("1.8e308"))
	    },
            effect(){
                return player.g.points.add(1).log10().div(1.3223).add(1)
            },
             effectDisplay() {
				return upgradeEffect('g',21) + "to Qk Expo!!"
            }
	},
        22: {
            title: "??2",
            description: "Unlock more new glueon effect(didn'tboosted by g upg41)",
            
            cost: new Decimal(1),
            unlocked() {
		    return (hasUpgrade('g',21))
	    },
            effect(){
                return player.g.points.add(1).log10().div(132.23).add(1)
            },
             effectDisplay() {
				return "^" + upgradeEffect('g',21) + "to QC Expo!!(WIP)"
            }
	},
        23: {
            title: "??3",
            description: "Unlock more new glueon effect(didn'tboosted by g upg41)",
            
            cost: new Decimal(1),
            unlocked() {
		    return (hasUpgrade('g',22))
	    },
            effect(){
                return player.g.points.pow(0).add(1)
            },
             effectDisplay() {
				return "*" + upgradeEffect('g',21) + "to accelatron!!(WIP)"
            }
	},
        41: {
            title: "Wave Boost glueon effect",
            description: "WIP",
            
            cost: new Decimal(1),
            effect(){
		base = player.g.points
		    if (hasUpgrade('g',41)) base = base.pow(player.W.points.add(1.79e308).log10().div(308.26).ln().add(1))
                return base
            },
             effectDisplay() {
				return upgradeEffect("g",41) + "eff glueon WIP"
            }
	},
        51: {
            title: "The end",
            description: "WIP",
            
            cost: new Decimal(1.79e308),
            effect(){
                return player.SQ.points.add(1).pow(3)
            },
             effectDisplay() {
				return "WIP you can't get it"
            }
	},
    },
    layerShown(){return hasUpgrade("q", 35) && player.e.points.gte(1e70)}
})
addLayer("Li", {
    name: "light", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    requires: new Decimal("1"), // Can be a function that takes requirement increases into account
    resource: "light", // Name of prestige currency
    baseResource: "γ", // Name of resource prestige is based on
    baseAmount() {return player.dp.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        multw = new Decimal(21.76)
        return multw
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
	return exp
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
update(diff) {
	if (hasUpgrade('a',31)) generatePoints('Li',diff);
	if (hasUpgrade('DT',22)) generatePoints('Li',diff*999);
	if (hasUpgrade('DT',22)) generatePoints('SQ',diff*999);
},
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "???",
            description: "Boost IP",
            
            cost: new Decimal(1),
            effect(){
                return player.Li.points.add(1e9).div(1e9)
            },
             effectDisplay() {
				return "So low"
            }
	},
    },
    layerShown(){return hasUpgrade("a", 31)}
})
addLayer("Wd", {
    name: "Wave5", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W5", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#989898",
    requires: new Decimal(2.4e13), // Can be a function that takes requirement increases into account
    resource: "Wave5", // Name of prestige currency
    baseResource: "Theory", // Name of resource prestige is based on
    baseAmount() {return player.t.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    branches: ["Wa","Wb"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        multw = new Decimal(0)
	if (hasAchievement("A", 34)) multw = multw.add(0.01)
	if (hasUpgrade("Wd", 12)) multw = multw.mul(upgradeEffect('Wc',12))
	if (hasUpgrade("I", 11)) multw = multw.mul(upgradeEffect('I',11))
	if (hasUpgrade("a", 31)) multw = multw.mul(player.dp.points)
        return multw
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
update(diff) {
	if (hasUpgrade('Wd', 11)) generatePoints('Wd',diff);
	if (hasUpgrade('DT', 11)) generatePoints('Wd',diff*900);
	if (hasUpgrade('DT', 25)) generatePoints('Wd',diff*1e43);
},
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "81",
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
            title: "82",
            description: "Qt boost wave4",
            
            cost: new Decimal(1),
            unlocked() {
		    return true
	    },
            effect(){
                return player.q.points.add("e9e15").log10().div(500).log10()
            },
             effectDisplay() {
				return upgradeEffect('Wc',12) + "x waves"
            }
	},
        13: {
            title: "83",
            description: "Wave5 Boost Wave1~4",
            
            cost: new Decimal(1),
            unlocked() {
		    return true
	    },
            effect(){
                return player.Wd.points.add("1")
            },
             effectDisplay() {
				return "nice and OP"
            }
	},
    },
    layerShown(){return hasAchievement("A", 34)}
})
addLayer("We", {
    name: "Wave6", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W6", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#989898",
    requires: new Decimal(2.4e99), // Can be a function that takes requirement increases into account
    resource: "Wave6", // Name of prestige currency
    baseResource: "Theory", // Name of resource prestige is based on
    baseAmount() {return player.t.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    branches: ["Wa","Wb"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        multw = new Decimal(0)
	if (hasAchievement("A", 34)) multw = multw.add(0.01)
	if (hasUpgrade("We", 12)) multw = multw.mul(upgradeEffect('We',12))
	if (hasUpgrade("I", 11)) multw = multw.mul(upgradeEffect('I',11))
	if (hasUpgrade("a", 31)) multw = multw.mul(player.dp.points)
        return multw
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
update(diff) {
	if (hasUpgrade('Wd', 11)) generatePoints('Wd',diff);
	if (hasUpgrade('DT', 11)) generatePoints('Wd',diff*900);
	if (hasUpgrade('DT', 25)) generatePoints('Wd',diff*1e43);
},
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "81",
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
            title: "82",
            description: "Qt boost wave4",
            
            cost: new Decimal(1),
            unlocked() {
		    return true
	    },
            effect(){
                return player.q.points.add("e9e15").log10().div(500).log10()
            },
             effectDisplay() {
				return upgradeEffect('Wc',12) + "x waves"
            }
	},
        13: {
            title: "83",
            description: "Wave5 Boost Wave1~4",
            
            cost: new Decimal(1),
            unlocked() {
		    return true
	    },
            effect(){
                return player.Wd.points.add("1")
            },
             effectDisplay() {
				return "nice and OP"
            }
	},
    },
    layerShown(){return false}
})
