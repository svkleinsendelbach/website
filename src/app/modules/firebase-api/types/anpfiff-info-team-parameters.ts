export type AnpfiffInfoTeamParameters = {
    ligaId: number;
    men: number;
    saisonId: number;
    spielkreis: number;
    teamId: number;
    vereinId: number;
};

export namespace AnpfiffInfoTeamParameters {
    export type Type = 'first-team' | 'second-team';
}
