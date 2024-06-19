export interface Genre {
	name: string,
	slug: string
}


export interface MovieCard {
	id: number;
	name: string;
	description: string,
	poster: {
		url: string,
		previewUrl: string
	}
	
	year: number,
	genres: Genre[],
	rating: {
		kp: number;
		imdb: number;
	};
}
