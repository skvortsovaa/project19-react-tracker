import { useState, useEffect } from 'react';

export default function ApiUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <p>Загрузка пользователей...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Ошибка: {error}</p>
        <button onClick={fetchUsers}>Повторить</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Пользователи из API</h1>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong><br />
            Email: {user.email}<br />
            Город: {user.address.city}
          </li>
        ))}
      </ul>
    </div>
  );
}
