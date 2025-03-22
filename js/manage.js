addLayer("tm", {
    name: "treemanager", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "TM", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
		currentTree: 1,
		p_upg: new Decimal(0),
    }},
    color: "#FFFFFF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "trees", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
            {key: "m", description: "M: Show Tree Manager<br>Hotkeys below this line are based on the current tree.<br>", onPress(){if(hasUpgrade("tptc_p",13))document.getElementById("tm").click();}},
			{key: "ifyoucantseethehotkeys", description: "If you can't see the hotkeys below, re-enter the info tab", onPress(){}},
	],
    layerShown(){return hasUpgrade("tptc_p",13);},
	tabFormat: {
		"Tree Manager":{
			content(){
				let ret=["main-display"];
				for(i=1;player.tm.points.gte(i);i++){
					ret.push(["row",[["display-text",TREES[i]+" <br>Author: "+TREEAUTHOR[i]+" <br>Version: "+TREEVERS[i][player.tm.buyables[i].toNumber()]],["buyable",i],["clickable",i]]]);
				}
				if(hasUpgrade("tptc_sp",13)){
					ret.push(["buyable",0]);
				}
				ret.push(["display-text","Greatly thanks to these TMT mod authors that inspired me (loader3229): "]);
				ret.push(["display-text","Jacorb90, who made The Prestige Tree Classic/Rewritten."]);
				if(hasUpgrade("tptc_sp",13))ret.push(["display-text","Acamaeda, who made The Modding Tree."]);
				if(player.tm.points.gte(2))ret.push(["display-text","okamii17, who made The Stardust Tree, the first known TMT mod."]);
				if(player.tm.points.gte(3))ret.push(["display-text","unpingabot, who made The Prestige Forest."]);
				if(player.tm.points.gte(4))ret.push(["display-text","thefinaluptake, who made The Burning Tree. (thefinaluptake is a layer in the Communitree!)"]);
				if(player.tm.points.gte(5))ret.push(["display-text","pg132, who made The Incrementreeverse."]);
				if(player.tm.points.gte(6))ret.push(["display-text","thepaperpilot, who made The Game Dev Tree, Lit and Profectus."]);
				if(player.tm.points.gte(9))ret.push(["display-text","ducdat0507, who made The Dynas Tree."]);
				if(player.tm.points.gte(8))ret.push(["display-text","And me, loader3229, who made The Milestone Tree and The Multitree."]);
				else ret.push(["display-text","And me, loader3229, who made The Multitree."]);
				return ret;
			}
		},"Multitree Upgrades":{content:["upgrades"],unlocked(){return player.tptc_mb.best.gte(3)}}
		,"Rewrite TPT":{content:[["display-text","Rewrite TPT upgrades counts as Multitree upgrades.<br>Upgrade The Prestige Tree Rewritten to unlock more."]
		,["upgrade",16]
		],unlocked(){return player.tm.buyables[0].gte(6) && player.tm.buyables[1].gte(20)}},
	buyables: {
            0: {
                title: "The Modding Tree", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = [new Decimal("eeee66000"),new Decimal("1e4000"),new Decimal("1e20000"),new Decimal("1e100000"),new Decimal("1e500000"),new Decimal("e2e7"),new Decimal("e2e8"),new Decimal("e2e12"),new Decimal(Infinity)][player[this.layer].buyables[this.id].toNumber()];
                    return cost
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Level: "+formatWhole(player[this.layer].buyables[this.id])+"<br>Cost: "+format(data.cost)+" points<br>Effect: Multiply point gain by "+format(data.effect)+", and Unlock "+formatWhole(player[this.layer].buyables[this.id])+" new trees";
                },
                unlocked() { return player[this.layer].points.gte(this.id) }, 
                canAfford() {
                    return player.points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player.points = player.points.sub(cost)
					player[this.layer].points = player[this.layer].buyables[this.id].add(1)
				},
                buyMax() {}, // You'll have to handle this yourself if you want
				effect() {
					return Decimal.pow(1e20,player[this.layer].buyables[this.id].pow(2));
				},
                style: {'height':'200px','width':'200px'},
            },
            1: {
                title: "Upgrade", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = [new Decimal(0),new Decimal("eeee66000"),new Decimal(1e6),new Decimal(1e30),new Decimal(1e50),new Decimal(1e150),new Decimal(1e300),new Decimal("1e700"),new Decimal("1e1500"),new Decimal("1e3000"),new Decimal("1e7000"),new Decimal("1e13000"),new Decimal("1e30000"),new Decimal("1e80000"),new Decimal("1e200000"),new Decimal("1e800000"),new Decimal("e15e5"),new Decimal("e5e6"),new Decimal("e12e6"),new Decimal("e2e7"),new Decimal(Infinity)][player[this.layer].buyables[this.id].toNumber()];
                    return cost
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Level: "+formatWhole(player[this.layer].buyables[this.id])+"<br>Cost: "+format(data.cost)+" points";
                },
                unlocked() { return player[this.layer].points.gte(this.id) }, 
                canAfford() {
                    return player.points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player.points = player.points.sub(cost)
				},
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'100px','width':'150px'},
            },
            2: {
                title: "Upgrade", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
					x=new Decimal(x);
					if(x.lt(0.5))return new Decimal(0);
					if(x.lt(11.5))return Decimal.pow(10,x.pow(2).mul(500).add(1500).sub(x.mul(750)));
					return Decimal.dInf
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Level: "+formatWhole(player[this.layer].buyables[this.id])+"<br>Cost: "+format(data.cost)+" points";
                },
                unlocked() { return player[this.layer].points.gte(this.id) }, 
                canAfford() {
                    return player.points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player.points = player.points.sub(cost)
				},
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'100px','width':'150px'},
            },
            3: {
                title: "Upgrade", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
					x=new Decimal(x);
                    if(x.lt(0.5))return new Decimal(0);
					if(x.lt(8.5))return Decimal.pow(10,x.pow(2).mul(2500).add(9500).sub(x.mul(2000)));
					return Decimal.dInf
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Level: "+formatWhole(player[this.layer].buyables[this.id])+"<br>Cost: "+format(data.cost)+" points";
                },
                unlocked() { return player[this.layer].points.gte(this.id) }, 
                canAfford() {
                    return player.points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player.points = player.points.sub(cost)
				},
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'100px','width':'150px'},
            },
            4: {
                title: "Upgrade", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
					x=new Decimal(x);
                    if(x.lt(0.5))return new Decimal(0);
					if(x.lt(4.5))return Decimal.pow(10,x.pow(2).mul(7000).add(22000).add(x.mul(3000)));
					return Decimal.dInf
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Level: "+formatWhole(player[this.layer].buyables[this.id])+"<br>Cost: "+format(data.cost)+" points";
                },
                unlocked() { return player[this.layer].points.gte(this.id) }, 
                canAfford() {
                    return player.points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player.points = player.points.sub(cost)
				},
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'100px','width':'150px'},
            },
            5: {
                title: "Upgrade", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
					x=new Decimal(x);
					if(x.lt(0.5))return new Decimal(0);
					if(x.lt(10.5))return Decimal.pow(10,x.pow(2).mul(1e4).add(1e5));
					if(x.lt(30.5))return Decimal.pow(10,x.pow(6));
					if(x.lt(42.5))return Decimal.pow(10,x.pow(x.div(5)));
					return Decimal.dInf
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Level: "+formatWhole(player[this.layer].buyables[this.id])+"<br>Cost: "+format(data.cost)+" points";
                },
                unlocked() { return player[this.layer].points.gte(this.id) }, 
                canAfford() {
                    return player.points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player.points = player.points.sub(cost)
				},
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'100px','width':'150px'},
            },
            6: {
                title: "Upgrade", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    x=new Decimal(x);
					if(x.lt(0.5))return new Decimal(0);
					if(x.lt(10.5))return Decimal.pow(10,x.pow(2).mul(5e4).sub(x.mul(25e3)).add(5e5));
					return Decimal.dInf
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Level: "+formatWhole(player[this.layer].buyables[this.id])+"<br>Cost: "+format(data.cost)+" points";
                },
                unlocked() { return player[this.layer].points.gte(this.id) }, 
                canAfford() {
                    return player.points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player.points = player.points.sub(cost)
				},
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'100px','width':'150px'},
            },
            7: {
                title: "Upgrade", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
					x=new Decimal(x);
					if(x.lt(0.5))return new Decimal(0);
					if(x.lt(13.5))return Decimal.pow(10,x.pow(2).mul(1e6).add(x.mul(5e5)).add(2e7));
					if(x.lt(20.5))return Decimal.pow(10,x.pow(3).mul(1e5));
					if(x.lt(30.5))return Decimal.pow(10,x.pow(x.div(4)).mul(300));
					return Decimal.dInf
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Level: "+formatWhole(player[this.layer].buyables[this.id])+"<br>Cost: "+format(data.cost)+" points";
                },
                unlocked() { return player[this.layer].points.gte(this.id) }, 
                canAfford() {
                    return player.points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player.points = player.points.sub(cost)
				},
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'100px','width':'150px'},
            },
            8: {
                title: "Upgrade", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
					x=new Decimal(x);
					if(x.lt(0.5))return new Decimal(0);
					if(x.lt(15.5))return Decimal.pow(10,x.pow(4).mul(5e8).add(x.mul(5e8)));
					if(x.lt(16.5))return Decimal.pow(10,x.mul(1.25).pow(5).mul(14687500));
					return Decimal.dInf
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Level: "+formatWhole(player[this.layer].buyables[this.id])+"<br>Cost: "+format(data.cost)+" points";
                },
                unlocked() { return player[this.layer].points.gte(this.id) }, 
                canAfford() {
                    return player.points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player.points = player.points.sub(cost)
				},
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'100px','width':'150px'},
            },
            9: {
                title: "Upgrade", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
					x=new Decimal(x);
					if(x.lt(0.5))return new Decimal(0);
					if(x.lt(7.5))return Decimal.pow(10,x.add(1).pow(2).mul(1e11).add(2e12));
					if(x.lt(9.5))return Decimal.pow(10,x.add(1).pow(2).mul(2e11));
					if(x.lt(11.5))return Decimal.pow(10,x.pow(x.div(5)).mul(3e11));
					return Decimal.dInf
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Level: "+formatWhole(player[this.layer].buyables[this.id])+"<br>Cost: "+format(data.cost)+" points";
                },
                unlocked() { return player[this.layer].points.gte(this.id) }, 
                canAfford() {
                    return player.points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player.points = player.points.sub(cost)
				},
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'100px','width':'150px'},
            },
	},
            1: {
                title: "Switch to this tree",
                display: "",
                unlocked() { return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)}, 
				canClick(){return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)},
				onClick(){
					player[this.layer].currentTree=this.id;
				},
                style: {'height':'100px','width':'150px'},
            },
            2: {
                title: "Switch to this tree",
                display: "",
                unlocked() { return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)}, 
				canClick(){return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)},
				onClick(){
					player[this.layer].currentTree=this.id;
				},
                style: {'height':'100px','width':'150px'},
            },
            3: {
                title: "Switch to this tree",
                display: "",
                unlocked() { return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)}, 
				canClick(){return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)},
				onClick(){
					player[this.layer].currentTree=this.id;
				},
                style: {'height':'100px','width':'150px'},
            },
            4: {
                title: "Switch to this tree",
                display: "",
                unlocked() { return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)}, 
				canClick(){return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)},
				onClick(){
					player[this.layer].currentTree=this.id;
				},
                style: {'height':'100px','width':'150px'},
            },
            5: {
                title: "Switch to this tree",
                display: "",
                unlocked() { return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)}, 
				canClick(){return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)},
				onClick(){
					player[this.layer].currentTree=this.id;
				},
                style: {'height':'100px','width':'150px'},
            },
            6: {
                title: "Switch to this tree",
                display: "",
                unlocked() { return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)}, 
				canClick(){return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)},
				onClick(){
					player[this.layer].currentTree=this.id;
				},
                style: {'height':'100px','width':'150px'},
            },
            7: {
                title: "Switch to this tree",
                display: "",
                unlocked() { return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)}, 
				canClick(){return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)},
				onClick(){
					player[this.layer].currentTree=this.id;
				},
                style: {'height':'100px','width':'150px'},
            },
            8: {
                title: "Switch to this tree",
                display: "",
                unlocked() { return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)}, 
				canClick(){return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)},
				onClick(){
					player[this.layer].currentTree=this.id;
				},
                style: {'height':'100px','width':'150px'},
            },
            9: {
                title: "Switch to this tree",
                display: "",
                unlocked() { return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)}, 
				canClick(){return player[this.layer].points.gte(this.id) && hasUpgrade("tptc_sp",13)},
				onClick(){
					player[this.layer].currentTree=this.id;
				},
                style: {'height':'100px','width':'150px'},
            },
	},
	update(){
		for(i=1;player.tm.points.gte(i);i++){
			if(player.tm.buyables[i].lt(1))player.tm.buyables[i]=new Decimal(1);
		}
		player.tm.points=player.tm.buyables[0].add(1);
		
		if(player.tm.currentTree!=currentTreeTemp){
			currentTreeTemp=player.tm.currentTree;
			hotkeys = {};
			hotkeys[layers.tm.hotkeys[0].key] = layers.tm.hotkeys[0];
			hotkeys[layers.tm.hotkeys[0].key].layer = 'tm';
			hotkeys[layers.tm.hotkeys[0].key].id = 0;
			hotkeys[layers.tm.hotkeys[0].key].unlocked = true;
			//hotkeys[layers.tm.hotkeys[1].key] = layers.tm.hotkeys[1];
			//hotkeys[layers.tm.hotkeys[1].key].layer = 'tm';
			//hotkeys[layers.tm.hotkeys[1].key].id = 1;
			//hotkeys[layers.tm.hotkeys[1].key].unlocked = true;
			for (layer in layers){
				if(!layer.startsWith(["_","tptc_","stardust_","forest_","burning_","incrementy_","gd_","tptr_"][currentTreeTemp]))continue;
				hk = layers[layer].hotkeys
				if (hk){
					for (id in hk){
						hotkeys[hk[id].key] = hk[id]
						hotkeys[hk[id].key].layer = layer
						hotkeys[hk[id].key].id = id
						if (hk[id].unlocked === undefined)
							hk[id].unlocked = true
					}
				}
			}
		}
	},
	upgrades:{
		rows: 5,
		cols: 5,
		11: {
				title: "Multitree Upgrade 11",
                description: "Unlock some Row 2 upgrades in The Prestige Tree Classic.",
                cost: new Decimal("1e400000"),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		12: {
				title: "Multitree Upgrade 12",
                description: "Unlock some Stardust upgrades in The Stardust Tree.",
                cost: new Decimal("1e700000"),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		13: {
				title: "Multitree Upgrade 13",
                description: "Unlock some Row 2 upgrades in The Burning Tree.",
                cost: new Decimal("e1e6"),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		14: {
				title: "Multitree Upgrade 14",
                description: "Unlock some Particle upgrades in The Prestige Forest.",
                cost: new Decimal("e14e5"),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		15: {
				title: "Multitree Upgrade 15",
                description: "Unlock a Prestige Upgrade in The Prestige Tree Classic.",
                cost: new Decimal("e25e5"),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		21: {
				title: "Multitree Upgrade 21",
                description: "Unlock some Stardust upgrades in The Stardust Tree.",
                cost: new Decimal("e85e5"),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		22: {
				title: "Multitree Upgrade 22",
                description: "Unlock some Row 2 upgrades in The Prestige Tree Classic and Rewritten.",
                cost: new Decimal("e223e5"),
                unlocked() { return player[this.layer].points.gte(7); }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		23: {
				title: "Multitree Upgrade 23",
                description: "Unlock some upgrades in The Prestige Tree Classic.",
                cost: new Decimal("e268e5"),
                unlocked() { return player[this.layer].points.gte(7); }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		24: {
				title: "Multitree Upgrade 24",
                description: "Unlock some Row 2 upgrades in The Burning Tree.",
                cost: new Decimal("e33333333"),
                unlocked() { return player[this.layer].points.gte(7); }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		25: {
				title: "Multitree Upgrade 25",
                description: "Unlock some Row 2 upgrades in The Game Dev Tree.",
                cost: new Decimal("e376e5"),
                unlocked() { return player[this.layer].points.gte(7); }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		31: {
				title: "Multitree Upgrade 31",
                description: "Unlock some Row 3 upgrades in The Prestige Tree Classic.",
                cost: new Decimal("e448e5"),
                unlocked() { return player[this.layer].points.gte(7); }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		32: {
				title: "Multitree Upgrade 32",
                description: "Unlock some Stardust upgrades in The Stardust Tree.",
                cost: new Decimal("e548e5"),
                unlocked() { return player[this.layer].points.gte(7); }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		33: {
				title: "Multitree Upgrade 33",
                description: "Unlock some Prestige upgrades in The Prestige Tree Classic.",
                cost: new Decimal("e57777777"),
                unlocked() { return player[this.layer].points.gte(7); }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		34: {
				title: "Multitree Upgrade 34",
                description: "Unlock some Row 3 upgrades in The Prestige Tree Rewritten.",
                cost: new Decimal("e775e5"),
                unlocked() { return player[this.layer].points.gte(7); }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		35: {
				title: "Multitree Upgrade 35",
                description: "Unlock some Row 3 upgrades in The Prestige Tree Classic.",
                cost: new Decimal("e22e7"),
                unlocked() { return player[this.layer].points.gte(7); }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		41: {
				title: "Multitree Upgrade 41",
                description: "Unlock the 4th row of Prestige upgrades in The Prestige Tree Classic.",
                cost: new Decimal("e475e6"),
                unlocked() { return player[this.layer].points.gte(7); }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		42: {
				title: "Multitree Upgrade 42",
                description: "Unlock some Super-Prestige upgrades in The Prestige Tree Classic.",
                cost: new Decimal("e839e8"),
                unlocked() { return player[this.layer].points.gte(7); }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		43: {
				title: "Multitree Upgrade 43",
                description: "Unlock more upgrades in The Game Dev Tree.",
                cost: new Decimal("ee11"),
                unlocked() { return player[this.layer].points.gte(7); }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		44: {
				title: "Multitree Upgrade 44",
                description: "Unlock some balance upgrades in The Prestige Tree Rewritten.",
                cost: new Decimal("e111111111111"),
                unlocked() { return player[this.layer].points.gte(7); }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		45: {
				title: "Multitree Upgrade 45",
                description: "Unlock more Update Upgrades in The Game Dev Tree.",
                cost: new Decimal("e95e10"),
                unlocked() { return player[this.layer].points.gte(7); }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		51: {
				title: "Multitree Upgrade 51",
                description: "Unlock a new feature in Tree Manager.",
                cost: Decimal.pow(10,7e13/9),
                unlocked() { return player[this.layer].points.gte(9); }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		52: {
				title: "Multitree Upgrade 52",
                description: "Unlock new upgrades in Game Dev Tree.",
                cost: new Decimal("e81e11"),
                unlocked() { return player[this.layer].points.gte(9); }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		53: {
				title: "Multitree Upgrade 53",
                description: "Chemical Synthesizer Scaling in The Prestige Forest is weaker.",
                cost: new Decimal("e15555555555555"),
                unlocked() { return player[this.layer].points.gte(9); }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		54: {
				title: "Multitree Upgrade 54",
                description: "Unlock new upgrades in The Incrementreeverse.",
                cost: new Decimal("e27e12"),
                unlocked() { return player[this.layer].points.gte(9); }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },
		55: {
				title: "Multitree Upgrade 55",
                description: "Unlock an effect of Rewritten Points in TPTR.",
                cost: new Decimal("e485e11"),
                unlocked() { return player[this.layer].points.gte(9); }, // The upgrade is only visible when this is true
				effect(){
					let ret=player.modpoints[7].add(1).pow(2);
					if(player.milestone_m.best.gte(60))ret = ret.pow(50);
					return ret;
				},
				currencyDisplayName: "points",
				currencyInternalName: "points",
            },

		16: {
				title: "Rewrite Prestige",
				fullDisplay(){
					return "<h2>Rewrite Prestige</h2><br>Unlock Prestige in The Prestige Tree Rewritten.<br>\
					Costs: "+format(new Decimal("e214e5"))+" points<br>\
					"+format(new Decimal("e14e6"))+" prestige points in The Prestige Tree Classic<br>\
					"+format(Decimal.pow(10,2222))+" hours of work in The Game Dev Tree"
				},canAfford(){
					return player.points.gte(new Decimal("e214e5")) && 
					player.tptc_p.points.gte(new Decimal("e14e6")) && 
					player.modpoints[6].gte(Decimal.pow(10,2222));
				},pay(){},
                unlocked() { return player.tm.buyables[7].gte(1); }, // The upgrade is only visible when this is true
				currencyDisplayName: "points",
				currencyInternalName: "points",
				style(){
					let ret={"width":"200px","height":"200px"};
					if(hasUpgrade("tm",this.id))ret.backgroundColor="#31aeb0";
					return ret;
				}
            },
	}
});
