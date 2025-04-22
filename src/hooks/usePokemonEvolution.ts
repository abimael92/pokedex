import { log } from 'console';
import { useState, useEffect } from 'react';

interface EvolutionDetail {
  min_level?: number;
  trigger?: {
    name: string;
  };
  item?: {
    name: string;
  };
  held_item?: {
    name: string;
  };
}

interface EvolutionChainStep {
  species: {
    name: string;
  };
  evolution_details?: EvolutionDetail[];
  evolves_to: EvolutionChainStep[];
}

interface EvolutionStep {
  species: string;
  minLevel?: number;
  trigger?: string;
  item?: string;
  heldItem?: string;
}

export const usePokemonEvolution = (speciesUrl: string | undefined) => {
  const [evolutionInfo, setEvolutionInfo] = useState<{
    evolutionChain?: EvolutionStep[];
    evolvesFrom?: string;
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!speciesUrl) return;

    const fetchEvolution = async () => {
      try {
        setLoading(true);
        setError(false);

        const speciesRes = await fetch(speciesUrl);
        const speciesData = await speciesRes.json();
        console.log("speciesData", speciesData);
        const evolvesFrom = speciesData.evolves_from_species?.name;
        console.log("evolvesFrom", evolvesFrom);

        const chainRes = await fetch(speciesData.evolution_chain.url);
        const chainData = await chainRes.json();

        console.log("chainData", chainData);
        

        const extractChain = (chain: EvolutionChainStep): EvolutionStep[] => {
          const details = chain.evolution_details?.[0];
          const currentStep: EvolutionStep = {
            species: chain.species.name,
            minLevel: details?.min_level,
            trigger: details?.trigger?.name,
            item: details?.item?.name,
            heldItem: details?.held_item?.name
          };
          const nextSteps = chain.evolves_to.flatMap(extractChain);
          return [currentStep, ...nextSteps];
        };

        const evolutionChain = extractChain(chainData.chain);

        setEvolutionInfo({
          evolutionChain,
          evolvesFrom
        });
      } catch (err) {
        console.error('Error fetching evolution info:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvolution();
  }, [speciesUrl]);

  return { 
    evolutionInfo, 
    loading, 
    error 
  };
};
