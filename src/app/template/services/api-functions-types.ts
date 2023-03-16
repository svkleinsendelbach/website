import { EditType } from '../classes/edit-type';
import { Event, EventGroup } from '../classes/event';
import { GameInfo } from '../classes/game-info';
import { News } from '../classes/news';
import { TeamSquad } from '../classes/team-squad';

export type UserAuthenticationType = 'websiteEditing';

export namespace AnpfiffInfoTeamParameters {
  export type Type = 'first-team' | 'second-team';
}

export namespace DeleteAllDataFunction {
  export type Parameters = Record<string, never>;

  export type ReturnType = void;
}

export namespace EventEditFunction {
  export type Parameters<GroupId> = {
    editType: EditType;
    groupId: GroupId;
    eventId: string;
    event: Omit<Event.Flatten, 'id'> | undefined;
  };

  export type ReturnType = void;
}

export namespace EventGetFunction {
  export type Parameters<GroupId> = {
      groupIds: GroupId[];
  };

  export type ReturnType<GroupId>  = EventGroup.Flatten<GroupId> [];
}

export namespace GameInfoGetFunction {
  export type Parameters = {
      gameId: string;
  };

  export type ReturnType = GameInfo;
}

export namespace NewsDisableFunction {
  export type Parameters = {
      editType: 'disable' | 'enable';
      newsId: string;
  };

  export type ReturnType = void;
}

export namespace NewsEditFunction {
  export type Parameters = {
    editType: EditType;
    newsId: string;
    news: Omit<News.Flatten, 'id'> | undefined;
  };

  export type ReturnType = string;
}

export namespace NewsGetFunction {
  export type Parameters = {
      numberNews: number | undefined;
      alsoDisabled: boolean;
  };

  export type ReturnType = {
      news: News.Flatten[];
      hasMore: boolean;
  };
}

export namespace NewsGetSingleFunction {
  export type Parameters = {
      newsId: string;
  };

  export type ReturnType = News.Flatten;
}

export namespace SendMailContactFunction {
  export type Parameters = {
      senderName: string;
      senderAddress: string;
      receiverName: string;
      receiverAddress: string;
      message: string;
  };

  export type ReturnType = {
      success: boolean;
      message: string;
  };
}

export namespace TeamSquadGetFunction {
  export type Parameters = {
      type: AnpfiffInfoTeamParameters.Type;
  };

  export type ReturnType = TeamSquad;
}

export namespace UserAuthenticationAcceptDeclineFunction {
  export type Parameters = {
      type: UserAuthenticationType;
      hashedUserId: string;
      action: 'accept' | 'decline';
  };

  export type ReturnType = void;
}

export namespace UserAuthenticationAddFunction {
  export type Parameters = {
      type: UserAuthenticationType;
      firstName: string;
      lastName: string;
  };

  export type ReturnType = void;
}

export namespace UserAuthenticationCheckFunction {
  export type Parameters = {
      type: UserAuthenticationType;
  };

  export type ReturnType = void;
}

export namespace UserAuthenticationGetAllUnauthenticatedFunction {
  export type Parameters = {
      type: UserAuthenticationType;
  };

  export type ReturnType = Array<{
      hashedUserId: string;
      firstName: string;
      lastName: string;
  }>;
}

export namespace VerifyRecaptchaFunction {
  export type Parameters = {
      token: string;
  };

  export type ReturnType = {
      success: boolean;
      score: number;
      action: string;
      challenge_ts: string;
      hostname: string;
      errorCodes?: string[];
  };
}
