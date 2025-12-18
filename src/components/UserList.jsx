import { useState, useEffect } from 'react';
import './UserList.css';

function UserList() {
  // состояния
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // загрузка данных
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

  // запрос при монтировании
  useEffect(() => {
    fetchUsers();
  }, []);

  // состояния интерфейса
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
    <div className="user-list">
      <h2>Пользователи ({users.length})</h2>

      <div className="users-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Телефон:</strong> {user.phone}</p>
            <p><strong>Город:</strong> {user.address.city}</p>
            <p><strong>Компания:</strong> {user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
