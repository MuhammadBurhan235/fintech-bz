import { useEffect, useState } from "preact/hooks";
import "./app.css";

export function App() {
  const [users, setUsers] = useState<any[]>([]);
  const [userId, setUserId] = useState("");
  const [periduser, setPeriduser] = useState<any | null>(null);
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

  const handleSearch = async (e: Event) => {
    e.preventDefault();
    if (!userId) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/users/${userId}`);

      if (!res.ok) {
        setPeriduser(null);
        return;
      }

      const data = await res.json();
      setPeriduser(data);
    } catch (err) {
      console.error("Error fetching user:", err);
      setPeriduser(null);
    } finally {
      setLoading(false);
    }
  };

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
          <div>
            <h1>Search User by ID</h1>

            {/* Form Input */}
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Enter User ID (UUID)"
                value={userId}
                onInput={(e: any) => setUserId(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>

            {/* Hasil */}
            <div style={{ marginTop: "1rem" }}>
              {loading ? (
                <p>Loading...</p>
              ) : periduser ? (
                <p>
                  {periduser.full_name} — <b>{periduser.role}</b>
                </p>
              ) : (
                <p>No user found</p>
              )}
            </div>
          </div>
        </ul>
      )}
    </>
  );
}
