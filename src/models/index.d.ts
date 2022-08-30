import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type MoodsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UsersMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Moods {
  readonly id: string;
  readonly value?: number | null;
  readonly note?: string | null;
  readonly usersID: string;
  readonly Users?: Users | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Moods, MoodsMetaData>);
  static copyOf(source: Moods, mutator: (draft: MutableModel<Moods, MoodsMetaData>) => MutableModel<Moods, MoodsMetaData> | void): Moods;
}

export declare class Users {
  readonly id: string;
  readonly username?: string | null;
  readonly email?: string | null;
  readonly payment_date?: string | null;
  readonly joined_date?: number | null;
  readonly role?: string | null;
  readonly Moods?: (Moods | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Users, UsersMetaData>);
  static copyOf(source: Users, mutator: (draft: MutableModel<Users, UsersMetaData>) => MutableModel<Users, UsersMetaData> | void): Users;
}