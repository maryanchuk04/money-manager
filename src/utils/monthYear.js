const monthsInUkrainian = [
	"січень",
	"лютий",
	"березень",
	"квітень",
	"травень",
	"червень",
	"липень",
	"серпень",
	"вересень",
	"жовтень",
	"листопад",
	"грудень",
];

const currentDate = new Date();
export const currentYear = currentDate.getFullYear();
export const currentMonth = monthsInUkrainian[currentDate.getMonth()];
