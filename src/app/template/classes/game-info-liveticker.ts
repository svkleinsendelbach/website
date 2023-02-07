export type GameInfoLiveticker = {
  id: string;
  competition: {
    name: string;
    link: string;
    gameDay: number;
  };
  result: {
      home: number;
      away: number;
  }
  date: string,
  homeTeam: GameInfoLiveticker.Team;
  awayTeam: GameInfoLiveticker.Team;
  adress: string | undefined;
  adressDescription: string | undefined;
  livetickers: ({ id: string; } & BfvLiveticker)[];
};

export namespace GameInfoLiveticker {
  export type Team = {
    id: string;
    name: string;
    imageId: string;
  }
}

export type BfvLiveticker = {
  loadNew: boolean;
  ifModifiedSinceTimestamp: string;
  results: BfvLiveticker.Result[];
};

export namespace BfvLiveticker {
  export type Result = Result.Comment | Result.Section | Result.TitledResult | Result.Goal | Result.Substitute | Result.Card;

  export namespace Result {
    export type ResultProperties<Type extends string> = {
      type: Type;
      resultLikes: {
        likes: number;
        liked: boolean;
        likeApiRoute: string;
        unlikeApiRoute: string;
      };
      text: string | null;
      time: number | null;
      reportLink: string | null;
    }

    export type Player = {
      id: string;
      name: string;
      number: number;
    }

    export type Comment = ResultProperties<'comment'>;

    export type Section = {
      type: 'section',
      text: string;
    }

    export type TitledResult = ResultProperties<'whistle' | 'corner' | 'penalty' | 'ownGoal' | 'time' | 'specialAction' | 'freeKick' | 'shotOnGoal'> & {
      headline: string | null;
    }

    export type Goal = ResultProperties<'goal' | 'penaltyGoal'> & {
      headline: string | null;
      team: 'home' | 'away';
      player: Player;
      result: {
          home: number,
          away: number
      };
    }

    export type Substitute = ResultProperties<'substitute'> & {
      headline: string | null;
      team: 'home' | 'away';
      playerIn: Player;
      playerOut: Player;
    }

    export type Card = ResultProperties<'yellowCard' | 'secondYellowCard' | 'redCard'> & {
      headline: string | null;
      team: 'home' | 'away';
      player: Player;
      entries: Record<'games' | 'goals' | 'yellowCards' | 'secondYellowCards' | 'redCards', number> | null;
    }
  }
}
