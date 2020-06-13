	let algs = {
		oll2 : {
			h : {'name':'H', img : '', alg: "F (R U R' U')3 F'", seq: "F R U R' U' R U R' U' R U R' U' F'", video: "https://www.youtube.com/watch?v=GhmYBgLoQQg&list=PLI24ciRbl8BUHEeOBaLXY4GpaVXSULYp4&t=165s"},
			pi : {'name':'Pi', img : '', alg:"R U2 (R2 U' R2 U' R2) U2 R", seq: "R U2 R2 U' R2 U' R2 U2 R", video: "https://www.youtube.com/watch?v=GhmYBgLoQQg&list=PLI24ciRbl8BUHEeOBaLXY4GpaVXSULYp4&t=188s"},
			sune :{'name':'Sune', img : '', alg: "R U R' U R U2 R'", seq: "R U R' U R U2 R'", video: "https://youtu.be/GhmYBgLoQQg?t=112"},
			antisune : {'name':'Antisune', img : '', alg:"L' U' L U' L' U2 L", seq: "L' U' L U' L' U2 L", video: "https://youtu.be/GhmYBgLoQQg?t=142"},
			l :{'name':'L', img : '', alg: "x (R' U R D') (R' U' R D)", seq: "R' F R B' R' F' R B", video: "https://www.youtube.com/watch?v=GhmYBgLoQQg&list=PLI24ciRbl8BUHEeOBaLXY4GpaVXSULYp4&t=224s"},
			t :{'name':'T', img : '', alg: "x (L U R' U') (L' U R U') x'", seq: "L F R' F' L' F R F'", video: "https://www.youtube.com/watch?v=GhmYBgLoQQg&list=PLI24ciRbl8BUHEeOBaLXY4GpaVXSULYp4&t=275s"},
			u :{'name':'U', img : '', alg: "R2 D R' U2 R D' R' U2 R'", seq: "R2 D R' U2 R D' R' U2 R", video: "https://www.youtube.com/watch?v=GhmYBgLoQQg&list=PLI24ciRbl8BUHEeOBaLXY4GpaVXSULYp4&t=320s"},
		},
		pll1 : {
			'dswap' : {'name':'diagonal swap', img : '', alg:"(FRU'R'U'RUR'F')(RUR'U'R'FRF')", seq: "F R U' R' U' R U R' F' R U R' U' R' F R F'", video:'nyeff' },
			'aswap' :{'name':'adjacent swap', img : '', alg: "(RUR'U'R'FRF')(FRU'R'U'RUR'F')", seq: "R U R' U' R' F R F' F R U' R' U' R U R' F'"},
		},
		pll2 : {
			te1: {'name':'3-edge cycle 1', img : '', alg:"R U' R U R U R U' R' U' R2", seq: "R U' R U R U R U' R' U' R2"},
			te2: {'name':'3-edge cycle 2', img : '', alg: "L' U L' U' L' U' L' U L U L2", seq: "L' U L' U' L' U' L' U L U L2"},
			feopp: {'name':'4-Edges opposites switch', img : '', alg: "M2 U' M2 U2 M2 U' M2", seq: "M2 D' M2 U2 M2 D' M2"},
			feadj: {'name':'4-Edges adjacent switch', img : '', alg: "M' U' M2 U' M2 U' M' U2 M2", seq: "M' F' M2 B' M2 F' M' D2 M2"},
		}
	}

export {algs}