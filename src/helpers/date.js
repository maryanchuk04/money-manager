import dayjs from "dayjs";
import "dayjs/locale/uk";

dayjs.locale("uk");

export const formatUkrainianDateTime = (dateString) =>
	dayjs(dateString).format("D MMMM, YYYY");
