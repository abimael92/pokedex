import bug from './bug.svg';
import dark from './dark.svg';
import dragon from './dragon.svg';
import electric from './electric.svg';
import fire from './fire.svg';
import flying from './flying.svg';
import fighting from './fighting.svg';
import ghost from './ghost.svg';
import grass from './grass.svg';
import ground from './ground.svg';
import ice from './ice.svg';
import normal from './normal.svg';
import poison from './poison.svg';
import psychic from './psychic.svg';
import rock from './rock.svg';
import steel from './steel.svg';
import water from './water.svg';
import fairy from './fairy.svg';

const Icons = {
	bug,
	dark,
	dragon,
	electric,
	fire,
	flying,
	fighting,
	ghost,
	grass,
	ground,
	ice,
	normal,
	poison,
	psychic,
	rock,
	steel,
	water,
	fairy,
} as const;

export type IconType = keyof typeof Icons;
// Add this line at the bottom of your icons/index.ts file
export default Icons; // Keep all your existing code, just add this
