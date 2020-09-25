const DEFAULT_PROJECT_USER = {amount: '0', isPicked: false};

const mapCleanProjectUsers = (users) => {
  return users.map(user => mapClearProjectUser(user))
};

const mapClearProjectUser = (user) => {
  return {
    id: user.id,
    name: user.name,
    ...DEFAULT_PROJECT_USER,
  }
};

export {
  mapCleanProjectUsers,
  mapClearProjectUser,
}
