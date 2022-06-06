import argon2 from 'argon2';

// /User POST
const createUser = async (username, password) => {
  const hashedPassword = await argon2.hash(password);

  addUser(username, hashedPassword);

  return true;
}

// /Authenticate POST
const authenticate = async (username, password) => {
  const hashedPassword = await argon2.hash(password);

  const user = getUser(username, hashedPassword);

  return user;
}