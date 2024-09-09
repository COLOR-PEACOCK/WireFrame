// 유사도
export const getLevenshteinDistance = (a, b) =>{
	var temp;
	if (a.length === 0) { return b.length; }
	if (b.length === 0) { return a.length; }
	if (a.length > b.length) { temp = a; a = b; b = temp; }

	var i, j, result, alen = a.length, blen = b.length, row = Array(alen);
	for (i = 0; i <= alen; i++) { row[i] = i; }

	for (i = 1; i <= blen; i++) {
		result = i;
		for (j = 1; j <= alen; j++) {
			temp = row[j - 1];
			row[j - 1] = result;
			result = Math.min(temp + (b[i - 1] !== a[j - 1]), result + 1, row[j] + 1);
		}
		row[j - 1] = result;
	}
	return result;
}