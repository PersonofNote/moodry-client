/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMoods = /* GraphQL */ `
  mutation CreateMoods(
    $input: CreateMoodsInput!
    $condition: ModelMoodsConditionInput
  ) {
    createMoods(input: $input, condition: $condition) {
      id
      value
      note
      usersID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateMoods = /* GraphQL */ `
  mutation UpdateMoods(
    $input: UpdateMoodsInput!
    $condition: ModelMoodsConditionInput
  ) {
    updateMoods(input: $input, condition: $condition) {
      id
      value
      note
      usersID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteMoods = /* GraphQL */ `
  mutation DeleteMoods(
    $input: DeleteMoodsInput!
    $condition: ModelMoodsConditionInput
  ) {
    deleteMoods(input: $input, condition: $condition) {
      id
      value
      note
      usersID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createUsers = /* GraphQL */ `
  mutation CreateUsers(
    $input: CreateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    createUsers(input: $input, condition: $condition) {
      id
      username
      email
      payment_date
      joined_date
      role
      Moods {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUsers = /* GraphQL */ `
  mutation UpdateUsers(
    $input: UpdateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    updateUsers(input: $input, condition: $condition) {
      id
      username
      email
      payment_date
      joined_date
      role
      Moods {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUsers = /* GraphQL */ `
  mutation DeleteUsers(
    $input: DeleteUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    deleteUsers(input: $input, condition: $condition) {
      id
      username
      email
      payment_date
      joined_date
      role
      Moods {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
