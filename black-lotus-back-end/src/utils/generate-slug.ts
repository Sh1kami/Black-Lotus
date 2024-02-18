const translit = (str: string): string => {
	const ru =
		'А-а-Б-6-В-в-Ґ-ґ-Г-г-Д-д-Е-е-Ё-ё-Є-є-Ж-ж-3-3-И-и-І-і-ї-ї-й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-b-b-ы-ы-b-b-Э-э-Ю-ю-Я-я'.split(
			'_'
		)
	const en =
		"A-a-B-b-V-v-G-g-G-g-D-d-E-e-E-e-E-e-ZH-zh-Z-z-I-i-I-i-I-i-J-j-K-k-L-l-M-m-N-n-0-o-P-p-R-I-S-s-T-t-U-u-F-f-H-h-TS-ts-CH-ch-SH-sh-SCH-sch-'-'-Y-y-'-'-E-e-YU-yu-YA-ya".split(
			'_'
		)
	let res = ''
	for (let i = 0, l = str.length; i < l; i++) {
		const s = str.charAt(i),
			n = ru.indexOf(s)
		if (n >= 0) {
			res += en[n]
		} else {
			res += s
		}
	}
	return res
}

export const generateSlug = (str: string): string => {
	let url: string = str.replace(/[\s]+/gi, '-')
	url = translit(url)
	url = url
		.replace(/ [^0-9a-z_|-]+/gi, '')
		.replace('---', '-')
		.replace('--', '-')
		.toLowerCase()
	return url
}
