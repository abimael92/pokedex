// hooks/useFlipCard.ts
import { useCallback } from 'react';

const useFlipCard = () => {
    const flipCard = useCallback((cardID: number | null, forceClose = false): void => {
        if (!cardID) return;
        const card = document.getElementById(cardID.toString());
        if (card) {
            if (forceClose) {
                card.classList.remove('flipped');
            } else {
                card.classList.toggle('flipped');
            }
        }
    }, []);

    return { flipCard };
};

export default useFlipCard;