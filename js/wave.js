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
	if (hasUpgrade("Wc", 13)) multw = multw.mul(upgradeEffect('Wc',13))
	if (hasUpgrade("I", 11)) multw = multw.mul(upgradeEffect('I',11))
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
	if (hasUpgrade("Wc", 13)) multw = multw.mul(upgradeEffect('Wc',13).pow(2))
	if (hasUpgrade("I", 11)) multw = multw.mul(upgradeEffect('I',11))
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
        15: {
            title: "60",
            description: "Unlock new layer WIP",
            
            cost: new Decimal(1e80),
            unlocked() {
		    return hasUpgrade("f",23)
	    },
            effect(){
                return true
            },
             effectDisplay() {
				return "OP"
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
	if (hasUpgrade("Wc", 13)) multw = multw.mul(upgradeEffect('Wc',13))
	if (hasUpgrade("I", 11)) multw = multw.mul(upgradeEffect('I',11))
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
        return multw
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
update(diff) {
	if (hasUpgrade('Wc', 11)) generatePoints('Wc',diff);
},
	 upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "71",
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
            title: "72",
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
            title: "73",
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
    layerShown(){return hasUpgrade("a", 22)}
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
	return exp
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
update(diff) {
	if (hasUpgrade('Qk',11)) generatePoints('Qk',diff);
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
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
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
		if (hasUpgrade('q',24)) dim.add(upgradeEffect("q",24))
                   return player.e.points.mul(1e43).pow(dim)
            },
             effectDisplay() {
				return upgradeEffect('e',11) + "x Qc"
            }
	},
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
    branches: ["W4"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        multw = new Decimal(1)
	if (true) multw = multw.mul(player.SP.points.add(1).log10().div(308.26).pow(0.1875).sub(1).pow_base(10))
        return multw
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
	return exp
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
update(diff) {
	if (hasUpgrade('SQ',11)) generatePoints('SQ',diff);
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
    layerShown(){return hasUpgrade("W", 15) || hasUpgrade('Qk',11)}
})
