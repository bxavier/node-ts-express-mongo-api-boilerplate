db.createCollection('users');

// Insert mock user documents
db.users.insertMany([
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2a$10$IiUBB.0.WBRlVwJOgGJJdO8AZVO8wR9soDzY5OUaE031sCxlj9FR2', // hashed 'password123'
    role: 'admin',
    createdAt: new Date(),
  },
  {
    name: 'Regular User',
    email: 'user@example.com',
    password: '$2a$10$IiUBB.0.WBRlVwJOgGJJdO8AZVO8wR9soDzY5OUaE031sCxlj9FR2', // hashed 'password123'
    role: 'user',
    createdAt: new Date(),
  },
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: '$2a$10$IiUBB.0.WBRlVwJOgGJJdO8AZVO8wR9soDzY5OUaE031sCxlj9FR2',
    role: 'user',
    createdAt: new Date(),
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: '$2a$10$IiUBB.0.WBRlVwJOgGJJdO8AZVO8wR9soDzY5OUaE031sCxlj9FR2',
    role: 'user',
    createdAt: new Date(),
  },
  {
    name: 'Super Admin',
    email: 'superadmin@example.com',
    password: '$2a$10$IiUBB.0.WBRlVwJOgGJJdO8AZVO8wR9soDzY5OUaE031sCxlj9FR2',
    role: 'admin',
    createdAt: new Date(),
  },
]);
