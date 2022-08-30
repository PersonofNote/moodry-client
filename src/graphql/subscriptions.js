/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMoods = /* GraphQL */ `
  subscription OnCreateMoods {
    onCreateMoods {
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
export const onUpdateMoods = /* GraphQL */ `
  subscription OnUpdateMoods {
    onUpdateMoods {
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
export const onDeleteMoods = /* GraphQL */ `
  subscription OnDeleteMoods {
    onDeleteMoods {
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
export const onCreateUsers = /* GraphQL */ `
  subscription OnCreateUsers {
    onCreateUsers {
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
export const onUpdateUsers = /* GraphQL */ `
  subscription OnUpdateUsers {
    onUpdateUsers {
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
export const onDeleteUsers = /* GraphQL */ `
  subscription OnDeleteUsers {
    onDeleteUsers {
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
