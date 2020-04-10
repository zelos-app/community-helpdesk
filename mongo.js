db.createUser({
  user: "user",
  pwd: "password",
  roles: [
    {
      role: "root",
      db: "admin",
    },
  ],
});
