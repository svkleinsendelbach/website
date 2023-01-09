import { EditType } from "../classes/edit-type";
import { Event, EventGroup } from "../classes/event";
import { News } from "../classes/news";
import { TeamSquad } from "../classes/team-squad";

export type UserAuthenticationType = 'websiteEditing';

export namespace AnpfiffTeamParameter {
  export type Type = 'first-team' | 'second-team';
}

export namespace AcceptDeclineWaitingUserFunction {
  export type Parameters = {
    type: UserAuthenticationType,
    hashedUserId: string,
    action: 'accept' | 'decline'
  }

  export type ReturnType = void;
}

export namespace AddUserForWaitingFunction {
  export type Parameters = {
    type: UserAuthenticationType,
    firstName: string,
    lastName: string
  }

  export type ReturnType = void;
}

export namespace CheckUserAuthenticationFunction {
  export type Parameters = {
    type: UserAuthenticationType
  }

  export type ReturnType = void;
}

export namespace EditEventFunction {
  type NewType = Event.CallParameters;

  export type Parameters<GroupId> = {
    editType: EditType.Value,
    groupId: GroupId,
    eventId: string,
    event: NewType | undefined
  }

  export type ReturnType = void;
}

export namespace EditNewsFunction {
  export type Parameters = {
    editType: EditType.Value,
    id: string,
    news: News.CallParameters | undefined
  }

  export type ReturnType = string;
}

export namespace GetEventsFunction {
  export type Parameters<GroupId> = {
    groupIds: GroupId[]
  }

  export type ReturnType<GroupId> = EventGroup<GroupId>[];
}
export namespace GetNewsFunction {
  export type Parameters = {
    numberNews?: number
  }

  export interface ReturnType {
    news: News.ReturnType[],
    hasMore: boolean
  }
}

export namespace GetSingleNewsFunction {
  export type Parameters = {
    newsId: string
  }

  export type ReturnType = News.ReturnType;
}

export namespace GetTeamSquadFunction {
  export type Parameters = {
    type: AnpfiffTeamParameter.Type
  }

  export type ReturnType = TeamSquad;
}

export namespace GetUnauthenticatedUsersFunction {
  export type Parameters = {
    type: UserAuthenticationType
  }

  export type ReturnType = {
    hashedUserId: string,
    firstName: string,
    lastName: string
  }[];
}

export namespace SendContactMailFunction {
  export type Parameters = {
    senderName: string
    senderAddress: string
    receiverName: string
    receiverAddress: string
    message: string
  }

  export interface ReturnType {
    success: boolean
    message: string
  }
}

export namespace VerifyRecaptchaFunction {
  export type Parameters = {
    actionType: 'contactForm',
    token: string
  }

  export type ReturnType = {
    success: boolean;
    challenge_ts: string;
    hostname: string;
    errorCodes?: string[];
  }
}

export namespace DeleteAllDataFunction {
  export type Parameters = Record<string, never>;

  export type ReturnType = void;
}
