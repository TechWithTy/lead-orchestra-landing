const fs = require("fs");

const files = [
	"src/components/ui/pixelated-voice-clone-card.tsx",
	"src/components/ui/pixelated-voice-overlay.tsx",
];

files.forEach((file) => {
	let content = fs.readFileSync(file, "utf8");
	content = content.replace(
		/DealScale's neural voice stack /g,
		"Lead Orchestra's AI models your best customers to find lookalike leads across the web. Clone your audience once, generate leads forever.",
	);
	fs.writeFileSync(file, content, "utf8");
	console.log(`Updated ${file}`);
});
