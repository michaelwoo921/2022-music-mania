import { Song } from '../song/song';

export class User {
	constructor(
		public username = '',
		public password = '',
		public role?: string, // "customer", "employee", "admin"
		public credits?: number,
		public playlist?: string[],
		public favorites?: Song[],
		public bought?: Song[]
	) {}
}

// temporaily here need to be moved to the correct folder
