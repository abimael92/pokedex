// src/types/global.d.ts
declare module '*.module.css' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.module.scss' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.module.sass' {
	const classes: { [key: string]: string };
	export default classes;
}

// Add this for regular CSS files (like Pokedex.css, PokedexDataScreen.css, etc.)
declare module '*.css' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.scss' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.sass' {
	const classes: { [key: string]: string };
	export default classes;
}
