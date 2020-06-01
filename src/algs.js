	let defALg = {name: 'Unnamed', img: false, alg: 'Alg missing', desc: 'No description'}
	let algs = {
		oll2 : {
			h : {'name':'H', img : '', alg: "F (R U R' U')3 F'"},
			pi : {'name':'H', img : '', alg:"R U2 (R2 U' R2 U' R2) U2 R"},
			sune :{'name':'H', img : '', alg: "R U R' U R U2 R'"},
			antisune : {'name':'H', img : '', alg:"L' U' L U' L' U2 L"},
			l :{'name':'H', img : '', alg: "x (R' U R D') (R' U' R D)"},
			t :{'name':'H', img : '', alg: "x (L U R' U') (L' U R U')"},
			u :{'name':'H', img : '', alg: "R2 D R' U2 R D' R' U2 R'"},
		},
		pll1 : {
			'dswap' : {'name':'diagonal swap', img : '', alg:"(FRU'R'U'RUR'F')(RUR'U'R'FRF')"},
			'aswap' :{'name':'adjacent swap', img : '', alg: "(RUR'U'R'FRF')(FRU'R'U'RUR'F')"},
		},
		pll2 : {
			te1: {'name':'3-edge cycle 1', img : '', alg:"R U' R U R U R U' R' U' R2"},
			te2: {'name':'3-edge cycle 2', img : '', alg: "R U' R U R U R U' R' U' R2"},
			feopp: {'name':'4-Edges opposites switch', img : '', alg: "M2 U' M2 U2 M2 U' M2"},
			feadj: {'name':'4-Edges adjacent switch', img : '', alg: "M' U' M2 U' M2 U' M' U2 M2"},
		}
	}
	let alg_keys = Object.keys(algs)

export {algs, alg_keys}