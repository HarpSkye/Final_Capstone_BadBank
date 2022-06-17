function Login({ setUser, history }) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState('');

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  const handleLogin = async () => {
    try {
      console.log(email, password);
      if (!validate(email, "email")) return;
      if (!validate(password, "password")) return;
      const url = `/accounts/login`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      var data = await res.json();
      await firebaseAuth.signInWithEmailAndPassword(email, password);
      setUser(data);
      setShow(false);
      history.push("/deposit/");
    } catch (err) {
      console.log("err loggin in", err);
      setError(err.message);
    }
  };

  function clearForm() {
    setEmail("");
    setPassword("");
    setShow(true);
  }

  return (
    <Card
      bgcolor="warning"
      header="Login"
      status={status}
      body={
        show ? (
          <form onSubmit={handleLogin}>
            Email
            <br />
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button type="submit" className="btn btn-light">
              Login
            </button>
            {error && <p>{error}</p>}
          </form>
        ) : (
          <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Login another account
            </button>
          </>
        )
      }
    />
  );
}
