export default {
	/** get the number of milliseconds in a given number of seconds */
	seconds: (seconds: number) => seconds * 1000,
	/** get the number of milliseconds in a given number of minutes */
	minutes: (minutes: number) => minutes * 60 * 1000,
	/** get the number of milliseconds in a given number of hours */
	hours: (hours: number) => hours * 60 * 60 * 1000,
	/** get the number of milliseconds in a given number of days */
	days: (days: number) => days * 24 * 60 * 60 * 1000,
};
