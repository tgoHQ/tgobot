/** removes all the tab characters from a string. helpful for fixing indentation issues when declaring multiline strings */
export function removeTabs(string: string) {
	return string.replaceAll("\t", "");
}
