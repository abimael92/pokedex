import { useState, useEffect } from 'react';

type TypeInfo = {
  name: string;
  url: string;
};

type DamageRelations = {
  double_damage_from: TypeInfo[];
  double_damage_to: TypeInfo[];
  half_damage_from: TypeInfo[];
  half_damage_to: TypeInfo[];
  no_damage_from: TypeInfo[];
  no_damage_to: TypeInfo[];
};

type PokemonTypeDetail = {
  damage_relations: DamageRelations;
};

type PokemonTypeEntry = {
  type: TypeInfo;
};

type PokemonResponse = {
  types: PokemonTypeEntry[];
};

export const usePokemonTypeEffectiveness = (nameOrId: string | number) => {
  const [strengths, setStrengths] = useState<string[]>([]);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEffectiveness = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
        const data: PokemonResponse = await res.json();

        const typeUrls = data.types.map(t => t.type.url);

        const typeDetails: PokemonTypeDetail[] = await Promise.all(
          typeUrls.map(url => fetch(url).then(res => res.json()))
        );

        const allWeaknesses = new Set<string>();
        const allStrengths = new Set<string>();

        typeDetails.forEach(type => {
          type.damage_relations.double_damage_to.forEach(t => allStrengths.add(t.name));
          type.damage_relations.double_damage_from.forEach(t => allWeaknesses.add(t.name));
        });

        const finalStrengths  = [...allWeaknesses].filter(type => !allStrengths.has(type));
        const finalWeaknesses = [...allStrengths].filter(type => !allWeaknesses.has(type));

        setStrengths(finalStrengths);
        setWeaknesses(finalWeaknesses);
      } catch (err: any) {
        setError(err);
      }
      setLoading(false);
    };

    fetchEffectiveness();
  }, [nameOrId]);

  return { strengths, weaknesses, loading, error };
};
