// import hey from './alldata';

function CreateAccount(props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [error, setError] = React.useState('');

  const {setUser} = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleCreate() {
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    const url = `/accounts`;
    (async () => {
      try {
        // `${url}?${new URLSearchParams({name, email, password})}`
        var res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({ name, email, password, isAdmin }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        var data = await res.json();
        await firebaseAuth.createUserWithEmailAndPassword(email, password);
        setUser(data);
        setShow(false);
        props.history.push("/deposit/");        
      } catch (err) {
        console.log("some err==>>",  typeof err, err.message);
        setError(err.message);
      }
    })();
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={
        show ? (
          <form onSubmit={handleCreate}>
            Name
            <br />
            <input
              type="input"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <br />
            Email address
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
            Admin?
            <br />
            <input
              type="checkbox"
              className="form-control"
              id="admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.currentTarget.checked)}
            />
            <br />
            <button type="submit" className="btn btn-light">
              Create Account
            </button>
            {error && <p>{error}</p>}
          </form>
        ) : (
          <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Add another account
            </button>
          </>
        )
      }
    />
  );
}
