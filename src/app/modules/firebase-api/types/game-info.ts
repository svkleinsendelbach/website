export type GameInfo = {
  id: string;
  competition: {
      name: string;
      link: string;
      gameDay: number;
  };
  result: {
      home: number | undefined;
      away: number | undefined;
  };
  date: string;
  homeTeam: GameInfo.Team;
  awayTeam: GameInfo.Team;
  adress: string | undefined;
  adressDescription: string | undefined;
  livetickers: Array<{
      id: string;
  } & BfvLiveticker>;
};

export namespace GameInfo {
  export type Team = {
      id: string;
      name: string;
      imageId: string;
  };
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
      };

      export type Player = {
          id: string;
          imageId: string;
          name: string;
          number: number;
      };

      export type Comment = ResultProperties<'comment'>;

      export type Section = {
          type: 'section';
          text: string;
      };

      export type TitledResult = ResultProperties<'whistle' | 'corner' | 'penalty' | 'ownGoal' | 'time' | 'specialAction' | 'freeKick' | 'shotOnGoal'> & {
          headline: string | null;
      };

      export type Goal = ResultProperties<'goal' | 'penaltyGoal'> & {
          headline: string | null;
          team: 'home' | 'away';
          player: Player;
          result: {
              home: number;
              away: number;
          };
      };

      export type Substitute = ResultProperties<'substitute'> & {
          headline: string | null;
          team: 'home' | 'away';
          playerIn: Player;
          playerOut: Player;
      };

      export type Card = ResultProperties<'yellowCard' | 'secondYellowCard' | 'redCard'> & {
          headline: string | null;
          team: 'home' | 'away';
          player: Player;
          entries: Record<'games' | 'goals' | 'yellowCards' | 'secondYellowCards' | 'redCards', number> | null;
      };
  }
}

export type BfvApiLiveticker = {
  loadNew: boolean;
  ifModifiedSinceTimestamp: string;
  results: BfvApiLiveticker.Result[];
};

export namespace BfvApiLiveticker {
  export type Result =
      | Result.Comment
      | Result.Whistle
      | Result.SpecialAction
      | Result.Football
      | Result.Substitute
      | Result.YellowCard
      | Result.SecondYellowCard
      | Result.RedCard
      | Result.Corner
      | Result.FreeKick
      | Result.ShotOnGoal
      | Result.Penalty
      | Result.PenaltyGoal
      | Result.OwnGoal
      | Result.Time;

  export namespace Result {
      export type Comment = {
          headline: null | string;
          eventIcon: null;
          likes: number;
          liked: boolean;
          likeApiRoute: null | string;
          unlikeApiRoute: null | string;
          ownGoal: boolean;
          text: null | string;
          time: null | string;
          section: null | string;
          options: null | Utils.Options;
      };

      export type Whistle = Utils.DefaultProperties & {
          headline: string;
      };

      export type SpecialAction = Utils.DefaultProperties & {
          headline: null | string;
      };

      export type Football = Utils.DefaultProperties & {
          headline: string;
          goal: null | Utils.Goal;
      };

      export type Substitute = Utils.DefaultProperties & {
          headline: string;
          substitution: null | Utils.Substitution;
      };

      export type YellowCard = Utils.DefaultProperties & {
          headline: string;
          card: string;
          statistic: null | Utils.Statistic;
          team: Utils.Team;
      };

      export type SecondYellowCard = Utils.DefaultProperties & {
          headline: string;
          card: string;
          statistic: null | Utils.Statistic;
          team: Utils.Team;
      };

      export type RedCard = Utils.DefaultProperties & {
          headline: string;
          card: string;
          statistic: null | Utils.Statistic;
          team: Utils.Team;
      };

      export type Corner = Utils.DefaultProperties & {
          headline: string;
      };

      export type FreeKick = Utils.DefaultProperties & {
          headline: null | string;
      };

      export type ShotOnGoal = Utils.DefaultProperties & {
          headline: null | string;
      };

      export type Penalty = Utils.DefaultProperties & {
          headline: string;
      };

      export type PenaltyGoal = Utils.DefaultProperties & {
          headline: string;
          goal: null | Utils.Goal;
      };

      export type OwnGoal = Utils.DefaultProperties & {
          headline: string;
      };

      export type Time = Utils.DefaultProperties & {
          headline: string;
      };

      export namespace Utils {
          export type Options = {
              reportLink: {
                  href: string;
                  text: string;
                  title: string;
              };
              socialsharing: {
                  services: unknown[];
              };
          };

          export type DefaultProperties = {
              eventIcon: string;
              likes: number;
              liked: boolean;
              likeApiRoute: string;
              unlikeApiRoute: string;
              ownGoal: boolean;
              text: string;
              time: string;
              options: Options;
          };

          export type TeamLogo = {
              teamName: string;
              teamIcon: string;
          };

          export type Player = {
              id: string;
              name: string;
              number: string;
              teamLogo: TeamLogo;
              image: {
                  src: string;
                  alt: string;
                  title: string;
              };
              link: {
                  href: string;
              };
          };

          export type Goal = {
              teamName: string;
              player: Player;
              result: {
                  halftime: boolean;
                  teams: Array<{
                      teamIcon: string;
                      actualGoals: number;
                      type: string;
                  }>;
              };
          };

          export type Substitution = {
              headline: string;
              player: Player;
              player2: Player;
              teamLogo: TeamLogo;
          };

          export type Statistic = {
              text: null | string;
              player: Player;
              entries: null | Array<{
                  count: number;
                  icon: string;
              }>;
          };

          export type Team = {
              name: string;
          };
      }
  }
}
