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
  sprite?: string;
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
        // console.log("speciesData", speciesData);
        const evolvesFrom = speciesData.evolves_from_species?.name;
        // console.log("evolvesFrom", evolvesFrom);

        const chainRes = await fetch(speciesData.evolution_chain.url);
        const chainData = await chainRes.json();

        // console.log("chainData", chainData);

        const extractChain = async (chain: EvolutionChainStep): Promise<EvolutionStep[]> => {
					const details = chain.evolution_details?.[0];

					// Fetch sprite for the current species
					const fetchSprite = async (speciesName: string) => {
						try {
							const response = await fetch(
								`https://pokeapi.co/api/v2/pokemon/${speciesName}`
							);
							const data = await response.json();
							return (
								data.sprites?.front_default || '/images/default-sprite.png'
							);
						} catch (err) {
							return '/images/default-sprite.png';
						}
					};

					const currentStep: EvolutionStep = {
						species: chain.species.name,
						sprite: await fetchSprite(chain.species.name),
						minLevel: details?.min_level,
						trigger: details?.trigger?.name,
						item: details?.item?.name,
						heldItem: details?.held_item?.name,
					};
				const nextSteps = await Promise.all(
					chain.evolves_to.map(extractChain)
				);
				return [currentStep, ...nextSteps.flat()];
				};

        const evolutionChain = await extractChain(chainData.chain);

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
