export interface User {
  id: number;
  name: string;
  email: string;
}

let users: User[] = [
  { id: 1, name: "Ahmed", email: "ahmed@example.com" },
  { id: 2, name: "Sara", email: "sara@example.com" },
];
let nextId = 3;

export function getAll(): User[] {
  return users;
}

export function getById(id: number): User | undefined {
  return users.find((u) => u.id === id);
}

export function create(name: string, email: string): User {
  const user: User = { id: nextId++, name, email };
  users.push(user);
  return user;
}

export function update(id: number, name: string, email: string): User | undefined {
  const user = getById(id);
  if (!user) return undefined;
  user.name = name;
  user.email = email;
  return user;
}

export function remove(id: number): boolean {
  const before = users.length;
  users = users.filter((u) => u.id !== id);
  return users.length < before;
}