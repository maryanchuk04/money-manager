/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				textColor: "#F3F7F7",
				formItemsBackground: "#29182A",
				background: "#1C1F24",
				backgroundForm: "#472D48",
			},
			height: {
				screen: "var(--webkit-fill-available)",
			},
		},
		screens: {
			"3xl": { min: "1000px" },

			md: { max: "767px" },
			// => @media (max-width: 767px) { ... }

			sm: { max: "639px" },

			xs: { max: "321px" },
			// => @media (max-width: 639px) { ... }
		},
	},
	plugins: [],
};
