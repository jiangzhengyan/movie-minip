module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; var desp = Object.getOwnPropertyDescriptor(m.exports, k); if(desp && desp.configurable) Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1581584712947, function(require, module, exports) {

module.exports = require('./spinners.json');

}, function(modId) {var map = {"./spinners.json":1581584712948}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584712948, function(require, module, exports) {
module.exports = {
	"dots": {
		"interval": 80,
		"frames": [
			"⠋",
			"⠙",
			"⠹",
			"⠸",
			"⠼",
			"⠴",
			"⠦",
			"⠧",
			"⠇",
			"⠏"
		]
	},
	"dots2": {
		"interval": 80,
		"frames": [
			"⣾",
			"⣽",
			"⣻",
			"⢿",
			"⡿",
			"⣟",
			"⣯",
			"⣷"
		]
	},
	"dots3": {
		"interval": 80,
		"frames": [
			"⠋",
			"⠙",
			"⠚",
			"⠞",
			"⠖",
			"⠦",
			"⠴",
			"⠲",
			"⠳",
			"⠓"
		]
	},
	"dots4": {
		"interval": 80,
		"frames": [
			"⠄",
			"⠆",
			"⠇",
			"⠋",
			"⠙",
			"⠸",
			"⠰",
			"⠠",
			"⠰",
			"⠸",
			"⠙",
			"⠋",
			"⠇",
			"⠆"
		]
	},
	"dots5": {
		"interval": 80,
		"frames": [
			"⠋",
			"⠙",
			"⠚",
			"⠒",
			"⠂",
			"⠂",
			"⠒",
			"⠲",
			"⠴",
			"⠦",
			"⠖",
			"⠒",
			"⠐",
			"⠐",
			"⠒",
			"⠓",
			"⠋"
		]
	},
	"dots6": {
		"interval": 80,
		"frames": [
			"⠁",
			"⠉",
			"⠙",
			"⠚",
			"⠒",
			"⠂",
			"⠂",
			"⠒",
			"⠲",
			"⠴",
			"⠤",
			"⠄",
			"⠄",
			"⠤",
			"⠴",
			"⠲",
			"⠒",
			"⠂",
			"⠂",
			"⠒",
			"⠚",
			"⠙",
			"⠉",
			"⠁"
		]
	},
	"dots7": {
		"interval": 80,
		"frames": [
			"⠈",
			"⠉",
			"⠋",
			"⠓",
			"⠒",
			"⠐",
			"⠐",
			"⠒",
			"⠖",
			"⠦",
			"⠤",
			"⠠",
			"⠠",
			"⠤",
			"⠦",
			"⠖",
			"⠒",
			"⠐",
			"⠐",
			"⠒",
			"⠓",
			"⠋",
			"⠉",
			"⠈"
		]
	},
	"dots8": {
		"interval": 80,
		"frames": [
			"⠁",
			"⠁",
			"⠉",
			"⠙",
			"⠚",
			"⠒",
			"⠂",
			"⠂",
			"⠒",
			"⠲",
			"⠴",
			"⠤",
			"⠄",
			"⠄",
			"⠤",
			"⠠",
			"⠠",
			"⠤",
			"⠦",
			"⠖",
			"⠒",
			"⠐",
			"⠐",
			"⠒",
			"⠓",
			"⠋",
			"⠉",
			"⠈",
			"⠈"
		]
	},
	"dots9": {
		"interval": 80,
		"frames": [
			"⢹",
			"⢺",
			"⢼",
			"⣸",
			"⣇",
			"⡧",
			"⡗",
			"⡏"
		]
	},
	"dots10": {
		"interval": 80,
		"frames": [
			"⢄",
			"⢂",
			"⢁",
			"⡁",
			"⡈",
			"⡐",
			"⡠"
		]
	},
	"dots11": {
		"interval": 100,
		"frames": [
			"⠁",
			"⠂",
			"⠄",
			"⡀",
			"⢀",
			"⠠",
			"⠐",
			"⠈"
		]
	},
	"dots12": {
		"interval": 80,
		"frames": [
			"⢀⠀",
			"⡀⠀",
			"⠄⠀",
			"⢂⠀",
			"⡂⠀",
			"⠅⠀",
			"⢃⠀",
			"⡃⠀",
			"⠍⠀",
			"⢋⠀",
			"⡋⠀",
			"⠍⠁",
			"⢋⠁",
			"⡋⠁",
			"⠍⠉",
			"⠋⠉",
			"⠋⠉",
			"⠉⠙",
			"⠉⠙",
			"⠉⠩",
			"⠈⢙",
			"⠈⡙",
			"⢈⠩",
			"⡀⢙",
			"⠄⡙",
			"⢂⠩",
			"⡂⢘",
			"⠅⡘",
			"⢃⠨",
			"⡃⢐",
			"⠍⡐",
			"⢋⠠",
			"⡋⢀",
			"⠍⡁",
			"⢋⠁",
			"⡋⠁",
			"⠍⠉",
			"⠋⠉",
			"⠋⠉",
			"⠉⠙",
			"⠉⠙",
			"⠉⠩",
			"⠈⢙",
			"⠈⡙",
			"⠈⠩",
			"⠀⢙",
			"⠀⡙",
			"⠀⠩",
			"⠀⢘",
			"⠀⡘",
			"⠀⠨",
			"⠀⢐",
			"⠀⡐",
			"⠀⠠",
			"⠀⢀",
			"⠀⡀"
		]
	},
	"line": {
		"interval": 130,
		"frames": [
			"-",
			"\\",
			"|",
			"/"
		]
	},
	"line2": {
		"interval": 100,
		"frames": [
			"⠂",
			"-",
			"–",
			"—",
			"–",
			"-"
		]
	},
	"pipe": {
		"interval": 100,
		"frames": [
			"┤",
			"┘",
			"┴",
			"└",
			"├",
			"┌",
			"┬",
			"┐"
		]
	},
	"simpleDots": {
		"interval": 400,
		"frames": [
			".  ",
			".. ",
			"...",
			"   "
		]
	},
	"simpleDotsScrolling": {
		"interval": 200,
		"frames": [
			".  ",
			".. ",
			"...",
			" ..",
			"  .",
			"   "
		]
	},
	"star": {
		"interval": 70,
		"frames": [
			"✶",
			"✸",
			"✹",
			"✺",
			"✹",
			"✷"
		]
	},
	"star2": {
		"interval": 80,
		"frames": [
			"+",
			"x",
			"*"
		]
	},
	"flip": {
		"interval": 70,
		"frames": [
			"_",
			"_",
			"_",
			"-",
			"`",
			"`",
			"'",
			"´",
			"-",
			"_",
			"_",
			"_"
		]
	},
	"hamburger": {
		"interval": 100,
		"frames": [
			"☱",
			"☲",
			"☴"
		]
	},
	"growVertical": {
		"interval": 120,
		"frames": [
			"▁",
			"▃",
			"▄",
			"▅",
			"▆",
			"▇",
			"▆",
			"▅",
			"▄",
			"▃"
		]
	},
	"growHorizontal": {
		"interval": 120,
		"frames": [
			"▏",
			"▎",
			"▍",
			"▌",
			"▋",
			"▊",
			"▉",
			"▊",
			"▋",
			"▌",
			"▍",
			"▎"
		]
	},
	"balloon": {
		"interval": 140,
		"frames": [
			" ",
			".",
			"o",
			"O",
			"@",
			"*",
			" "
		]
	},
	"balloon2": {
		"interval": 120,
		"frames": [
			".",
			"o",
			"O",
			"°",
			"O",
			"o",
			"."
		]
	},
	"noise": {
		"interval": 100,
		"frames": [
			"▓",
			"▒",
			"░"
		]
	},
	"bounce": {
		"interval": 120,
		"frames": [
			"⠁",
			"⠂",
			"⠄",
			"⠂"
		]
	},
	"boxBounce": {
		"interval": 120,
		"frames": [
			"▖",
			"▘",
			"▝",
			"▗"
		]
	},
	"boxBounce2": {
		"interval": 100,
		"frames": [
			"▌",
			"▀",
			"▐",
			"▄"
		]
	},
	"triangle": {
		"interval": 50,
		"frames": [
			"◢",
			"◣",
			"◤",
			"◥"
		]
	},
	"arc": {
		"interval": 100,
		"frames": [
			"◜",
			"◠",
			"◝",
			"◞",
			"◡",
			"◟"
		]
	},
	"circle": {
		"interval": 120,
		"frames": [
			"◡",
			"⊙",
			"◠"
		]
	},
	"squareCorners": {
		"interval": 180,
		"frames": [
			"◰",
			"◳",
			"◲",
			"◱"
		]
	},
	"circleQuarters": {
		"interval": 120,
		"frames": [
			"◴",
			"◷",
			"◶",
			"◵"
		]
	},
	"circleHalves": {
		"interval": 50,
		"frames": [
			"◐",
			"◓",
			"◑",
			"◒"
		]
	},
	"squish": {
		"interval": 100,
		"frames": [
			"╫",
			"╪"
		]
	},
	"toggle": {
		"interval": 250,
		"frames": [
			"⊶",
			"⊷"
		]
	},
	"toggle2": {
		"interval": 80,
		"frames": [
			"▫",
			"▪"
		]
	},
	"toggle3": {
		"interval": 120,
		"frames": [
			"□",
			"■"
		]
	},
	"toggle4": {
		"interval": 100,
		"frames": [
			"■",
			"□",
			"▪",
			"▫"
		]
	},
	"toggle5": {
		"interval": 100,
		"frames": [
			"▮",
			"▯"
		]
	},
	"toggle6": {
		"interval": 300,
		"frames": [
			"ဝ",
			"၀"
		]
	},
	"toggle7": {
		"interval": 80,
		"frames": [
			"⦾",
			"⦿"
		]
	},
	"toggle8": {
		"interval": 100,
		"frames": [
			"◍",
			"◌"
		]
	},
	"toggle9": {
		"interval": 100,
		"frames": [
			"◉",
			"◎"
		]
	},
	"toggle10": {
		"interval": 100,
		"frames": [
			"㊂",
			"㊀",
			"㊁"
		]
	},
	"toggle11": {
		"interval": 50,
		"frames": [
			"⧇",
			"⧆"
		]
	},
	"toggle12": {
		"interval": 120,
		"frames": [
			"☗",
			"☖"
		]
	},
	"toggle13": {
		"interval": 80,
		"frames": [
			"=",
			"*",
			"-"
		]
	},
	"arrow": {
		"interval": 100,
		"frames": [
			"←",
			"↖",
			"↑",
			"↗",
			"→",
			"↘",
			"↓",
			"↙"
		]
	},
	"arrow2": {
		"interval": 80,
		"frames": [
			"⬆️ ",
			"↗️ ",
			"➡️ ",
			"↘️ ",
			"⬇️ ",
			"↙️ ",
			"⬅️ ",
			"↖️ "
		]
	},
	"arrow3": {
		"interval": 120,
		"frames": [
			"▹▹▹▹▹",
			"▸▹▹▹▹",
			"▹▸▹▹▹",
			"▹▹▸▹▹",
			"▹▹▹▸▹",
			"▹▹▹▹▸"
		]
	},
	"bouncingBar": {
		"interval": 80,
		"frames": [
			"[    ]",
			"[=   ]",
			"[==  ]",
			"[=== ]",
			"[ ===]",
			"[  ==]",
			"[   =]",
			"[    ]",
			"[   =]",
			"[  ==]",
			"[ ===]",
			"[====]",
			"[=== ]",
			"[==  ]",
			"[=   ]"
		]
	},
	"bouncingBall": {
		"interval": 80,
		"frames": [
			"( ●    )",
			"(  ●   )",
			"(   ●  )",
			"(    ● )",
			"(     ●)",
			"(    ● )",
			"(   ●  )",
			"(  ●   )",
			"( ●    )",
			"(●     )"
		]
	},
	"smiley": {
		"interval": 200,
		"frames": [
			"😄 ",
			"😝 "
		]
	},
	"monkey": {
		"interval": 300,
		"frames": [
			"🙈 ",
			"🙈 ",
			"🙉 ",
			"🙊 "
		]
	},
	"hearts": {
		"interval": 100,
		"frames": [
			"💛 ",
			"💙 ",
			"💜 ",
			"💚 ",
			"❤️ "
		]
	},
	"clock": {
		"interval": 100,
		"frames": [
			"🕛 ",
			"🕐 ",
			"🕑 ",
			"🕒 ",
			"🕓 ",
			"🕔 ",
			"🕕 ",
			"🕖 ",
			"🕗 ",
			"🕘 ",
			"🕙 ",
			"🕚 "
		]
	},
	"earth": {
		"interval": 180,
		"frames": [
			"🌍 ",
			"🌎 ",
			"🌏 "
		]
	},
	"moon": {
		"interval": 80,
		"frames": [
			"🌑 ",
			"🌒 ",
			"🌓 ",
			"🌔 ",
			"🌕 ",
			"🌖 ",
			"🌗 ",
			"🌘 "
		]
	},
	"runner": {
		"interval": 140,
		"frames": [
			"🚶 ",
			"🏃 "
		]
	},
	"pong": {
		"interval": 80,
		"frames": [
			"▐⠂       ▌",
			"▐⠈       ▌",
			"▐ ⠂      ▌",
			"▐ ⠠      ▌",
			"▐  ⡀     ▌",
			"▐  ⠠     ▌",
			"▐   ⠂    ▌",
			"▐   ⠈    ▌",
			"▐    ⠂   ▌",
			"▐    ⠠   ▌",
			"▐     ⡀  ▌",
			"▐     ⠠  ▌",
			"▐      ⠂ ▌",
			"▐      ⠈ ▌",
			"▐       ⠂▌",
			"▐       ⠠▌",
			"▐       ⡀▌",
			"▐      ⠠ ▌",
			"▐      ⠂ ▌",
			"▐     ⠈  ▌",
			"▐     ⠂  ▌",
			"▐    ⠠   ▌",
			"▐    ⡀   ▌",
			"▐   ⠠    ▌",
			"▐   ⠂    ▌",
			"▐  ⠈     ▌",
			"▐  ⠂     ▌",
			"▐ ⠠      ▌",
			"▐ ⡀      ▌",
			"▐⠠       ▌"
		]
	},
	"shark": {
		"interval": 120,
		"frames": [
			"▐|\\____________▌",
			"▐_|\\___________▌",
			"▐__|\\__________▌",
			"▐___|\\_________▌",
			"▐____|\\________▌",
			"▐_____|\\_______▌",
			"▐______|\\______▌",
			"▐_______|\\_____▌",
			"▐________|\\____▌",
			"▐_________|\\___▌",
			"▐__________|\\__▌",
			"▐___________|\\_▌",
			"▐____________|\\▌",
			"▐____________/|▌",
			"▐___________/|_▌",
			"▐__________/|__▌",
			"▐_________/|___▌",
			"▐________/|____▌",
			"▐_______/|_____▌",
			"▐______/|______▌",
			"▐_____/|_______▌",
			"▐____/|________▌",
			"▐___/|_________▌",
			"▐__/|__________▌",
			"▐_/|___________▌",
			"▐/|____________▌"
		]
	},
	"dqpb": {
		"interval": 100,
		"frames": [
			"d",
			"q",
			"p",
			"b"
		]
	},
	"weather": {
		"interval": 100,
		"frames": [
			"☀️ ",
			"☀️ ",
			"☀️ ",
			"🌤 ",
			"⛅️ ",
			"🌥 ",
			"☁️ ",
			"🌧 ",
			"🌨 ",
			"🌧 ",
			"🌨 ",
			"🌧 ",
			"🌨 ",
			"⛈ ",
			"🌨 ",
			"🌧 ",
			"🌨 ",
			"☁️ ",
			"🌥 ",
			"⛅️ ",
			"🌤 ",
			"☀️ ",
			"☀️ "
		]
	},
	"christmas": {
		"interval": 400,
		"frames": [
			"🌲",
			"🎄"
		]
	},
	"grenade": {
		"interval": 80,
		"frames": [
			"،   ",
			"′   ",
			" ´ ",
 			" ‾ ",
			"  ⸌",
			"  ⸊",
			"  |",
			"  ⁎",
			"  ⁕",
			" ෴ ",
			"  ⁓",
			"   ",
			"   ",
			"   "
		]
	},
	"point": {
		"interval": 125,
		"frames": [
			"∙∙∙",
			"●∙∙",
			"∙●∙",
			"∙∙●",
			"∙∙∙"
		]
	},
	"layer": {
		"interval": 150,
		"frames": [
			"-",
			"=",
			"≡"
		]
	}
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1581584712947);
})()
//# sourceMappingURL=index.js.map