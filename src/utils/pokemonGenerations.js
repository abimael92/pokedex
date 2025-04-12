export const generationRanges = {
    1: { start: 1, end: 151 },
    2: { start: 152, end: 251 },
    3: { start: 252, end: 386 },
    4: { start: 387, end: 493 },
    5: { start: 494, end: 649 },
    6: { start: 650, end: 721 },
    7: { start: 722, end: 809 },
    8: { start: 810, end: 905 },
};

export const getRandomPokemonId = (generation) => {
    const range = generationRanges[generation] || generationRanges[1];
    return Math.floor(Math.random() * (range.end - range.start + 1)) + range.start;
};

export const getGenerationPokemonList = (generation) => {
    const range = generationRanges[generation] || generationRanges[1];
    return Array.from(
        { length: range.end - range.start + 1 },
        (_, i) => (i + range.start).toString()
    );
};