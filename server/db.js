// In-memory mock DB for local development (no MySQL required)
const users = [];
const properties = [
  { id: 1, title: "2BHK in Bhubaneswar", location: "Bhubaneswar", rent: 8000, description: "Spacious flat near KIIT", contact: "9876543210" },
  { id: 2, title: "1BHK in Cuttack", location: "Cuttack", rent: 5500, description: "Nice room, fully furnished", contact: "9123456789" },
  { id: 3, title: "PG in Puri", location: "Puri", rent: 4000, description: "PG with meals included", contact: "9000000001" },
];

const db = {
  query: (sql, paramsOrCallback, callback) => {
    const cb = typeof paramsOrCallback === "function" ? paramsOrCallback : callback;
    const params = typeof paramsOrCallback === "function" ? [] : paramsOrCallback;

    if (sql.includes("SELECT * FROM users WHERE mobile")) {
      const mobile = params[0];
      const result = users.filter(u => u.mobile === mobile);
      cb(null, result);
    } else if (sql.includes("SELECT * FROM users")) {
      cb(null, [...users]);
    } else if (sql.includes("INSERT INTO users")) {
      const data = params[0] || params;
      data.id = users.length + 1;
      users.push(data);
      cb(null, { insertId: data.id });
    } else if (sql.includes("SELECT * FROM properties")) {
      cb(null, [...properties]);
    } else {
      cb(null, []);
    }
  }
};

console.log("[DEV] Using in-memory mock database (no MySQL needed)");
module.exports = db;