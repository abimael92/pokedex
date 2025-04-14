import { useState } from 'react';
import { Pokemon } from '../types/pokemon';

export const usePokemonAudio = () => {
    const [audioError, setAudioError] = useState<string | null>(null);

    const playAudio = (url: string): void => {
        try {
            const audio = new Audio(url);
            audio.play().catch(e => {
                setAudioError(`Error playing audio: ${e.message}`);
                console.error('Error playing audio:', e);
            });
        } catch (e) {
            setAudioError('Failed to initialize audio');
            console.error('Error initializing audio:', e);
        }
    };

    const playCry = (pokemon: Pokemon | null): void => {
        if (!pokemon?.cries?.latest) return;
        playAudio(pokemon.cries.latest);
    };

    const playMonologue = (pokemon: Pokemon | null): void => {
        if (pokemon?.name?.toLowerCase() === 'mewtwo') {
            playAudio('/images/monologo.mp4');
        }
    };

    return {
        audioError,
        playCry,
        playMonologue
    };
};