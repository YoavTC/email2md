let lastRightClicked = null;

document.addEventListener('contextmenu', (e) => {
	lastRightClicked = e.target;
});

browser.runtime.onMessage.addListener((msg) => {
	if (msg.action !== "copyMarkdown") return;

	const md = extractEmail();
	if (md) navigator.clipboard.writeText(md);
});

function extractEmail() {
	const msg = lastRightClicked?.closest('.h7');
	if (!msg) return null;

	const from = msg.querySelector('[email]')?.getAttribute('email') ?? '?';
	const toEl = msg.querySelector('.g2');
	const to = toEl?.getAttribute('email') ?? toEl?.innerText?.trim() ?? '?';
	const dateRaw = msg.querySelector('.g3')?.getAttribute('title') ?? '?';
	const body = msg.querySelector('.a3s')?.innerText?.trim().replace(/\n{3,}/g, '\n\n') ?? '';

	const date = formatDate(dateRaw);
	const bodyLines = body.split('\n').map(line => `> ${line}`).join('\n');
	return `> From: ${from}\n> To: ${to}\n> At: ${date}\n> \`\`\`\n${bodyLines}\n> \`\`\``;
}

function formatDate(raw) {
	const d = new Date(raw);
	if (isNaN(d)) return raw;
	const dd = String(d.getDate()).padStart(2, '0');
	const mm = String(d.getMonth() + 1).padStart(2, '0');
	const hh = String(d.getHours()).padStart(2, '0');
	const min = String(d.getMinutes()).padStart(2, '0');
	return `${dd}-${mm}-${d.getFullYear()} ${hh}:${min}`;
}