import * as fs from 'node:fs';
import axios from 'axios';
import * as cheerio from 'cheerio';

async function fetchNailBrands(url: string): Promise<string[]> {
	try {
		const response = await axios.get(url);
		const html = response.data;
		const $ = cheerio.load(html);
		const brands: string[] = [];

		$('.col a').each((index, element) => {
			const text = $(element).clone().text().trim().split('\n')[0].trim();
			if (text) {
				brands.push(text);
			}
		});

		return brands;
	} catch (error) {
		console.error('Error fetching the brand list:', error);
		return [];
	}
}

const url = 'https://nailnes.com/shop/user_data/brand-list.php';
fetchNailBrands(url).then((brands) => {
	fs.writeFileSync('brandlist.json', JSON.stringify(brands, null, 2));
});

const brandlist = [];
