
			//<![CDATA[
			ALG_POW = Array ('', "2", "'");
			MOV = Array('U',  'R',  'F',  'D',  'L',  'B',  'u',  'r',  'f',  'd',  'l',  'b',  'E',  'M',  'S',  'x',  'y',  'z' );
			MAN = Array('d',  'l',  'b',  'u',  'r',  'f',  'D',  'L',  'B',  'U',  'R',  'F',  's',  's',  's',  '-',  '-',  '-' );
			XTR = Array('B',  'R',  'U',  'F',  'L',  'D',  'b',  'r',  'u',  'f',  'l',  'd',  'S',  'M',  'E-', 'x',  'z-', 'y' );
			YTR = Array('U',  'F',  'L',  'D',  'B',  'R',  'u',  'f',  'l',  'd',  'b',  'r',  'E',  'S-', 'M',  'z',  'y',  'x-');
			ZTR = Array('R',  'D',  'F',  'L',  'U',  'B',  'r',  'd',  'f',  'l',  'u',  'b',  'M',  'E-', 'S',  'y-', 'x',  'z' );
			MTR = Array('U-', 'L-', 'F-', 'D-', 'R-', 'B-', 'u-', 'l-', 'f-', 'd-', 'r-', 'b-', 'E-', 'M',  'S-', 'x',  'y-', 'z-');
			STR = Array('U-', 'R-', 'B-', 'D-', 'L-', 'F-', 'u-', 'r-', 'b-', 'd-', 'l-', 'f-', 'E-', 'M-', 'S',  'x-', 'y-', 'z' );
			ETR = Array('D-', 'R-', 'F-', 'U-', 'L-', 'B-', 'd-', 'r-', 'f-', 'u-', 'l-', 'b-', 'E',  'M-', 'S-', 'x-', 'y',  'z-');
			// Maps move names to a move id
			function move_id(move){
				switch(move){
					case 'U': return 0;
					case 'R': return 1;
					case 'F': return 2;
					case 'D': return 3;
					case 'L': return 4;
					case 'B': return 5;
					case 'u': return 6;
					case 'r': return 7;
					case 'f': return 8;
					case 'd': return 9;
					case 'l': return 10;
					case 'b': return 11;
					case 'E': return 12;
					case 'M': return 13;
					case 'S': return 14;
					case 'x': return 15;
					case 'y': return 16;
					case 'z': return 17;
				}
				return -1;
			}		
			// Returns the power of a move with given suffix
			function move_pow(chr){
				switch(chr){
					case "2" : return 1;
					case "'" : return 2;
					case "3" : return 2;
				}
				return 0;
			}
			function regen(alg){
				document.getElementById('alg').value = alg;
				generate(alg);
			}
			function generate(alg){
				document.getElementById("rt_x").innerHTML = trans_alg(alg, XTR);
				document.getElementById("rt_y").innerHTML = trans_alg(alg, YTR);
				document.getElementById("rt_z").innerHTML = trans_alg(alg, ZTR);
				document.getElementById("invr").innerHTML = invert_alg(alg);
				document.getElementById("mr_m").innerHTML = trans_alg(alg, MTR);
				document.getElementById("mr_s").innerHTML = trans_alg(alg, STR);
				document.getElementById("mr_e").innerHTML = trans_alg(alg, ETR);
				document.getElementById("mn").innerHTML = man_link(alg);
			}
			// Translates an alg according to the given translation table
			function trans_alg(alg, trn, mir){
				var n = alg.length;
				var i = 0;
				var out = '';
				while(i < n){
					var move = move_id(alg.substr(i, 1));
					if(move != -1){
						pow = 0;
						if(i < n -1) pow = move_pow(alg.substr(i + 1, 1));
						out += trn[move].substr(0,1) + (trn[move].length > 1 ?
							ALG_POW[2 - pow] : ALG_POW[pow]) + " ";
					}
					i++;
				}
				return out;
			}
			// Inverts a cube algorithm
			function invert_alg(alg){
				var inverse = "";
				var pow = 0;
				var i = alg.length - 1;
				while(i >= 0){
					var move = move_id(alg.substr(i, 1));
					if(move != -1){
						inverse += alg.substr(i, 1) + ALG_POW[2 - pow] + " ";
						pow = 0;
					}
					else pow = move_pow(alg.substr(i, 1));
					i--;
				}
				return inverse;
			}
			// Manipulates an alg
			function man_alg(idx, mv, pw){
				hide_mn_();
				var alg = document.getElementById('alg').value;
				var n = alg.length;
				var i = 0;
				var j = 0;
				var out = '';
				while(i < n){
					var move = move_id(alg.substr(i, 1));
					if(move != -1){
						pow = 0;
						if(i < n -1) pow = move_pow(alg.substr(i + 1, 1));
						if(j < idx) 
							out += MOV[move] + ALG_POW[pow] + " ";
						else{
							var trn;
							var add;
							switch(mv){
								case 0: trn = get_tr(move);
									pw = (move < 3 || (move >=6 && move < 9) ? 2 - pow : pow);
									add = MAN[move] + ALG_POW[pow] + " "; break;
								case 1: trn = XTR; add = MOV[move] + ALG_POW[pow] + " x" + ALG_POW[pw] + " "; break;
								case 2: trn = YTR; add = MOV[move] + ALG_POW[pow] + " y" + ALG_POW[pw] + " "; break;
								case 3: trn = ZTR; add = MOV[move] + ALG_POW[pow] + " z" + ALG_POW[pw] + " "; break;
								case 4: trn = get_tr(move); pw = 2 - pow; add = ""; break;
							}
							var tail = alg.substring(i + 1, n);
							for(var k = 0; k <= pw; k++) tail = trans_alg(tail, trn)
							out = out + add + tail;
							break;
						}
						j++;
					}
					i++;
				}
				regen(out);
			}
			function get_tr(move){
				if(move == 15) return XTR;
				if(move == 16) return YTR;
				if(move == 17) return ZTR;
				if(move % 3 == 0) return YTR;
				if(move % 3 == 1) return XTR;
				if(move % 3 == 2) return ZTR;
				return MOV;
			}
			// Generates link for alg manipulation
			function man_link(alg){
				var n = alg.length;
				var i = 0;
				var j = 0;
				var out = '';
				while(i < n){
					var move = move_id(alg.substr(i, 1));
					if(move != -1){
						pow = 0;
						if(i < n -1) pow = move_pow(alg.substr(i + 1, 1));
						out += "<a href='#' onclick='show_mn("+j+", \""+ MAN[move] + pow + "\", event);return false'>" + MOV[move] + ALG_POW[pow] + "</a> ";
						j++;
					}
					i++;
				}
				return out;
			}
			// Shows manipulation menu
			function show_mn(idx, mv, e){
				document.getElementById('man_mv').innerHTML = (mv.charAt(0) == 's' ? '' : mv.charAt(0) == '-' ? 
					"<a href='#' onclick='man_alg("+idx+", 4, 0);return false;'>-</a>" :
					"<a href='#' onclick='man_alg("+idx+", 0, 0);return false;'>" +
					mv.substr(0,1) + ALG_POW[mv.substr(1,1)] + "</a>");
				document.getElementById('man_x1').innerHTML = "<a href='#' onclick='man_alg("+idx+", 1, 0);return false;'>x</a>";
				document.getElementById('man_x2').innerHTML = "<a href='#' onclick='man_alg("+idx+", 1, 1);return false;'>x2</a>";
				document.getElementById('man_x3').innerHTML = "<a href='#' onclick='man_alg("+idx+", 1, 2);return false;'>x'</a>";
				document.getElementById('man_y1').innerHTML = "<a href='#' onclick='man_alg("+idx+", 2, 0);return false;'>y</a>";
				document.getElementById('man_y2').innerHTML = "<a href='#' onclick='man_alg("+idx+", 2, 1);return false;'>y2</a>";
				document.getElementById('man_y3').innerHTML = "<a href='#' onclick='man_alg("+idx+", 2, 2);return false;'>y'</a>";
				document.getElementById('man_z1').innerHTML = "<a href='#' onclick='man_alg("+idx+", 3, 0);return false;'>z</a>";
				document.getElementById('man_z2').innerHTML = "<a href='#' onclick='man_alg("+idx+", 3, 1);return false;'>z2</a>";
				document.getElementById('man_z3').innerHTML = "<a href='#' onclick='man_alg("+idx+", 3, 2);return false;'>z'</a>";
				var menu = document.getElementById("man_menu");
				menu.style.top = (e.clientY - 3) + "px";
				menu.style.left = (e.clientX - 3) + "px";
				document.getElementById('man_table').className="menu";
			}
			function hide_mn(e){
				var menu = document.getElementById("man_menu");
				var top = parseInt(menu.style.top, 10)
				var left = parseInt(menu.style.left, 10);
				if(e.clientY > top && e.clientY < top + menu.offsetHeight
				&& e.clientX > left && e.clientX < left + menu.offsetWidth) return;
				hide_mn_();
			}
			function hide_mn_(){
				var menu = document.getElementById("man_menu");
				menu.style.top = "0";
				menu.style.left = "0";
				document.getElementById('man_table').className="hidden";
			}
			//]]>
		