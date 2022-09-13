/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMoods = /* GraphQL */ `
  query GetMoods($id: ID!) {
    getMoods(id: $id) {
      id
      value
      note
      usersID
      createdAt
      updatedAt
      
      
    }
  }
`;
export const listMoods = /* GraphQL */ `
  query ListMoods(
    $filter: ModelMoodsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMoods(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        value
        note
        usersID
        createdAt
        updatedAt
        
        
      }
      nextToken
      
    }
  }
`;
export const syncMoods = /* GraphQL */ `
  query SyncMoods(
    $filter: ModelMoodsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMoods(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        value
        note
        usersID
        createdAt
        updatedAt
        
        
      }
      nextToken
      
    }
  }
`;
export const getUsers = /* GraphQL */ `
  query GetUsers($id: ID!) {
    getUsers(id: $id) {
      id
      username
      email
      payment_date
      joined_date
      role
      Moods {
        nextToken
        
      }
      createdAt
      updatedAt
      
      
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        payment_date
        joined_date
        role
        createdAt
        updatedAt
        
        
      }
      nextToken
      
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        username
        email
        payment_date
        joined_date
        role
        createdAt
        updatedAt
        
        
      }
      nextToken
      
    }
  }
`;
