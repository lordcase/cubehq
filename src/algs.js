	let defALg = {name: 'Unnamed', img: false, alg: 'Alg missing', desc: 'No description'}
	let algs = {
		oll2 : {
			h : {'name':'H', img : '', alg: "F (R U R' U')3 F'", seq: "F R U R' U' R U R' U' R U R' U' F"},
			pi : {'name':'Pi', img : '', alg:"R U2 (R2 U' R2 U' R2) U2 R", seq: "R U2 R2 U' R2 U' R2 U2 R"},
			sune :{'name':'Sune', img : '', alg: "R U R' U R U2 R'", seq: "R U R' U R U2 R'"},
			antisune : {'name':'Antisune', img : '', alg:"L' U' L U' L' U2 L", seq: "L' U' L U' L' U2 L"},
			l :{'name':'L', img : '', alg: "x (R' U R D') (R' U' R D)", seq: "R' F R B' R' F' R B"},
			t :{'name':'T', img : '', alg: "x (L U R' U') (L' U R U')", seq: "L F R' F' L' F R F'"},
			u :{'name':'U', img : '', alg: "R2 D R' U2 R D' R' U2 R'", seq: "R2 D R' U2 R D' R' U2 R"},
		},
		pll1 : {
			'dswap' : {'name':'diagonal swap', img : '', alg:"(FRU'R'U'RUR'F')(RUR'U'R'FRF')", seq: "F R U' R' U' R U R' F' R U R' U' R' F R F'"},
			'aswap' :{'name':'adjacent swap', img : '', alg: "(RUR'U'R'FRF')(FRU'R'U'RUR'F')", seq: "R U R' U' R' F R F' F R U' R' U' R U R' F'"},
		},
		pll2 : {
			te1: {'name':'3-edge cycle 1', img : '', alg:"R U' R U R U R U' R' U' R2", seq: "R U' R U R U R U' R' U' R2"},
			te2: {'name':'3-edge cycle 2', img : '', alg: "R2 U R U R' U' R' U' R' U R'", seq: "R2 U R U R' U' R' U' R' U R'"},
			feopp: {'name':'4-Edges opposites switch', img : '', alg: "M2 U' M2 U2 M2 U' M2", seq: "M2 U' M2 U2 M2 U' M2"},
			feadj: {'name':'4-Edges adjacent switch', img : '', alg: "M' U' M2 U' M2 U' M' U2 M2", seq: "M' U' M2 U' M2 U' M' U2 M2"},
		}
	}
	let alg_keys = Object.keys(algs)
	let alg_list = Object.entries(algs)

export {algs, alg_keys, alg_list}