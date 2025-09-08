import { useEffect, useState } from "preact/hooks";
import "./app.css";

export function App() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1>Users List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.full_name} — <b>{user.role}</b>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
