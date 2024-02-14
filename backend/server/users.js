const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Generate a unique username if there's a collision
  let uniqueName = name;
  let count = 2;
  while (users.find((user) => user.name === uniqueName && user.room === room)) {
    uniqueName = `${name}${count}`;
    count++;
  }

  const newUser = { id, name: uniqueName, room };
  users.push(newUser);
  return newUser;
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom, users };
