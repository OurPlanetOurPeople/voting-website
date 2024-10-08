// @ts-ignore
import {
    __modelMeta__,
    LazyLoading,
    LazyLoadingDisabled,
    ManagedIdentifier,
    ModelInit,
    MutableModel
} from "@aws-amplify/datastore";

export enum Choice {
    YES = "YES",
    NO = "NO"
}


type EagerEvent = {
    readonly [__modelMeta__]: {
        identifier: ManagedIdentifier<Event, 'id'>;
        readOnlyFields: 'createdAt' | 'updatedAt';
    };
    readonly id: string;
    readonly userId?: string | null;
    readonly eventName?: string | null;
    readonly attributes?: string | null;
    readonly createdAt?: string | null;
    readonly updatedAt?: string | null;
}

type LazyEvent = {
    readonly [__modelMeta__]: {
        identifier: ManagedIdentifier<Event, 'id'>;
        readOnlyFields: 'createdAt' | 'updatedAt';
    };
    readonly id: string;
    readonly userId?: string | null;
    readonly eventName?: string | null;
    readonly attributes?: string | null;
    readonly createdAt?: string | null;
    readonly updatedAt?: string | null;
}

export declare type Event = LazyLoading extends LazyLoadingDisabled ? EagerEvent : LazyEvent

export declare const Event: (new (init: ModelInit<Event>) => Event) & {
    copyOf(source: Event, mutator: (draft: MutableModel<Event>) => MutableModel<Event> | void): Event;
}

type EagerVote = {
    readonly [__modelMeta__]: {
        identifier: ManagedIdentifier<Vote, 'id'>;
        readOnlyFields: 'createdAt' | 'updatedAt';
    };
    readonly id: string;
    readonly voterId?: string | null;
    readonly choice: Choice | keyof typeof Choice;
    readonly questionId?: string | null;
    readonly country?: string | null;
    readonly createdAt?: string | null;
    readonly updatedAt?: string | null;
}

type LazyVote = {
    readonly [__modelMeta__]: {
        identifier: ManagedIdentifier<Vote, 'id'>;
        readOnlyFields: 'createdAt' | 'updatedAt';
    };
    readonly id: string;
    readonly voterId?: string | null;
    readonly choice: Choice | keyof typeof Choice;
    readonly questionId?: string | null;
    readonly country?: string | null;
    readonly createdAt?: string | null;
    readonly updatedAt?: string | null;
}

export declare type Vote = LazyLoading extends LazyLoadingDisabled ? EagerVote : LazyVote

export declare const Vote: (new (init: ModelInit<Vote>) => Vote) & {
    copyOf(source: Vote, mutator: (draft: MutableModel<Vote>) => MutableModel<Vote> | void): Vote;
}