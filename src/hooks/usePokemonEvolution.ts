import { useState, useEffect } from 'react';

// Define the structure of evolution details
interface EvolutionDetail {
  min_level: number | null;
  trigger: {
    name: string;
  } | null;
  item?: {
    name: string;
  } | null;
}

// Define the structure for each step in the evolution chain
interface EvolutionChainStep {
  species: {
    name: string;
  };
  evolution_details?: EvolutionDetail[];
  evolves_to: EvolutionChainStep[];
}

export const usePokemonEvolution = (speciesUrl: string | undefined) => {
  const [evolutionInfo, setEvolutionInfo] = useState<{
    evolvesFrom?: string | null;
    evolutionChain?: {
      [x: string]: any;
      species: string;
      minLevel: number | null;
      trigger: string | null;
      item?: string | null; 
      evolvesTo?: any[]; 
    }[];
  }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!speciesUrl) return;

    const fetchEvolution = async () => {
      try {
        setLoading(true);
        setError(false);

        // Fetch species data
        const speciesRes = await fetch(speciesUrl);
        const speciesData = await speciesRes.json();

        const evolvesFrom = speciesData.evolves_from_species?.name || null;
        const evolutionChainUrl = speciesData.evolution_chain.url;

        // Fetch evolution chain data
        const chainRes = await fetch(evolutionChainUrl);
        const chainData = await chainRes.json();

        console.log('chainData: ', chainData);

        const extractChain = (node: EvolutionChainStep): any[] => {
          const current = {
            species: node.species.name,
            minLevel: node.evolution_details?.[0]?.min_level ?? null,
            trigger: node.evolution_details?.[0]?.trigger?.name ?? null,
            item: node.evolution_details?.[0]?.item?.name || null, 
            evolvesTo: node.evolves_to.map(extractChain),
          };

          // If trigger is 'use-item', we add the item name (if available)
          if (current.trigger === 'use-item' && current.item) {
            current.item = current.item.replace('-', ' '); // Format item name
          }

          const next = node.evolves_to.flatMap(extractChain);
          return [current, ...next];
        };

        const evolutionChain = extractChain(chainData.chain);
        console.log('Evolution chain:', evolutionChain);

        setEvolutionInfo({
          evolvesFrom,
          evolutionChain,
        });

        setLoading(false);
      } catch (err) {
        console.error('Error fetching evolution info:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchEvolution();
  }, [speciesUrl]);

  return { evolutionInfo, loading, error };
};
