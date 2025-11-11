import { importDirectory } from '@iconify/tools/lib/import/directory.cjs';
import { isEmptyColor, parseColors } from '@iconify/tools/lib/colors/parse.cjs';
import { cleanupSVG } from '@iconify/tools/lib/svg/cleanup.cjs';
import { promises as fs } from 'fs';
import { runSVGO } from '@iconify/tools/lib/optimise/svgo.cjs';

const generateDifficultyIcons = async () => {
	const iconSet = await importDirectory('difficulty-icons', {
		prefix: 'difficulty'
	});

	iconSet.forEachSync((name, type) => {
		if (!name.startsWith('difficulty')) return;

		const finalName = name.replace('difficulty', '');

		if (type !== 'icon') {
			return;
		}

		const svg = iconSet.toSVG(name);
		if (!svg) {
			// Invalid icon
			iconSet.remove(name);
			return;
		}

		runSVGO(svg);

		// Update icon
		iconSet.remove(name);

		iconSet.fromSVG(finalName, svg);
	});

	// Export as IconifyJSON
	const exported = JSON.stringify(iconSet.export(), null, '\t') + '\n';

	// Save to file
	await fs.writeFile(`../src/lib/icons/difficulty.json`, exported, 'utf8');
};

const generateTagIcons = async () => {
	const iconSet = await importDirectory('tag-icons', {
		prefix: 'tag'
	});

	iconSet.forEachSync((name, type) => {
		if (type !== 'icon') {
			return;
		}

		const svg = iconSet.toSVG(name);
		if (!svg) {
			// Invalid icon
			iconSet.remove(name);
			return;
		}

		// Clean up and optimise icons
		cleanupSVG(svg);
		parseColors(svg, {
			defaultColor: 'currentColor',
			callback: (attr, colorStr, color) => {
				return !color || isEmptyColor(color) ? colorStr : 'currentColor';
			}
		});
		runSVGO(svg);

		// Update icon
		iconSet.fromSVG(name, svg);
	});

	// Export as IconifyJSON
	const exported = JSON.stringify(iconSet.export(), null, '\t') + '\n';

	// Save to file
	await fs.writeFile(`../src/lib/icons/tag.json`, exported, 'utf8');
};

(async () => {
	await generateDifficultyIcons();
	await generateTagIcons();
})();
