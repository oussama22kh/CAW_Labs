import { useState } from "react";

export default function Exo3() {
  const authCred = {
    username: "lokman",
    password: "123123",
  };

  const [users, setUsers] = useState([
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
    { id: 4, name: "Diana", email: "diana@example.com" },
    { id: 5, name: "Eve", email: "eve@example.com" },
    { id: 6, name: "Frank", email: "frank@example.com" },
  ]);

  const [authStatus, setAuthStatus] = useState(null);
  const [cred, setCred] = useState({
    username: "",
    password: "",
  });

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCred((prevCred) => ({
      ...prevCred,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      cred.password === authCred.password &&
      cred.username === authCred.username
    ) {
      setAuthStatus(true);
    } else {
      setAuthStatus(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>Exo 3</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "100px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <p>
            Credentials : username:{authCred.username} , password :
            {authCred.password}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <h2>username</h2>
            <input
              onChange={handleChange}
              name="username"
              value={cred.username}
              type="text"
              style={{
                height: "20px",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <h2>password</h2>
            <input
              onChange={handleChange}
              name="password"
              value={cred.password}
              type="password"
              style={{
                height: "20px",
              }}
            />
          </div>
          {authStatus === true ? (
            <p style={{ color: "green" }}>Successful Auth</p>
          ) : authStatus === false ? (
            <p style={{ color: "red" }}>Wrong Credentials</p>
          ) : (
            ""
          )}
          <button style={{ width: "100%" }}>Submit</button>
        </form>
        {authStatus ? (
          <div>
            {users.map((user) => {
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                  key={user.id}
                >
                  <p>Name : {user.name}</p>
                  <p>Email : {user.email}</p>
                  <button
                    onClick={() => {
                      handleDelete(user.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
