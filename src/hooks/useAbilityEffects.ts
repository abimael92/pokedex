import { useEffect, useState } from 'react';

interface Ability {
  ability: {
    name: string;
    url: string;
  };
}

const useAbilityEffects = (abilities: Ability[]) => {
  const [abilityEffects, setAbilityEffects] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (abilities.length === 0) return;

    // Fetch effect data for each ability
    abilities.forEach((ability) => {
      if (abilityEffects[ability.ability.name]) return; // Skip if already fetched

      fetch(ability.ability.url)
        .then((res) => res.json())
        .then((data) => {
          const effect = data.effect_entries.find((entry: any) => entry.language.name === 'en');
          if (effect) {
            setAbilityEffects((prev) => ({
              ...prev,
              [ability.ability.name]: effect.short_effect,
            }));
          }
        })
        .catch((error) => console.error(`Error fetching ability data: ${error}`));
    });
  }, [abilities, abilityEffects]);

  return abilityEffects;
};

export default useAbilityEffects;
