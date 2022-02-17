import type { User } from './User';
import type { Turn, Phase } from './enums';

export interface Room {
	step: number,
	bestOf: 3 | 5
	turn: Turn;
	phase: Phase;
	blueTeam: string
	redTeam: string
	bans: string[];
	picks: {
		[mapId: string]: Side;
	};
	users: User[];
}

export interface Side {
	attacker?: 100 | 200;
	defender?: 100 | 200;
}
