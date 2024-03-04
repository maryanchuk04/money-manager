/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				textColor: "#F3F7F7",
				formItemsBackground: "#29182A",
			},
		},
	},
	plugins: [],
};
