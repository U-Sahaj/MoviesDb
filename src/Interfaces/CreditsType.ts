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
    creditsId: number;
    title: string;
    cast: CastType[];
    crew: CrewType[];
}
