export const colors = {
	primary: '#ffcb05', // Pikachu yellow
	secondary: '#3b4cca', // Pokémon blue
	background: '#f5f5f5',
	text: '#333333',
};

export const getRandomColor = (): string => {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};
