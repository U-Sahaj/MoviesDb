export type CastType = {
    castId: number;
    name: string;
}

export type CrewType = {
    crewId: number;
    job: string;
    name: string;
}

export type CreditsType = {
    movie_id: number;
    title: string;
    cast: CastType[];
    crew: CrewType[];
}
