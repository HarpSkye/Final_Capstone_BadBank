// const UserContext = require("./user.context.js");

function Spa() {
  const [user, setUserData] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const setUser = (data) => {
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
      setUserData({ ...data, id: data.id || data._id, _id: data.id || data._id });
    } else {
      localStorage.removeItem('user');
      setUserData(null);
    }
  };

  return (
    <HashRouter>
      <div>
        <UserContext.Provider value={{ user, setUser }}>
          <NavBar setUser={setUser} />
          <div className="container" style={{ padding: "20px" }}>
            <Route path="/" exact component={Home}></Route>
            {!user ? (
              <>
                <Route path="/CreateAccount/" component={CreateAccount}></Route>
                <Route
                  path="/login/"
                  render={(props) => <Login {...props} setUser={setUser} />}
                ></Route>
              </>
            ) : (
              <>
                <Route path="/deposit/" component={Deposit}></Route>
                <Route path="/withdraw/" component={Withdraw}></Route>
                <Route path="/balance/" component={Balance}></Route>
                {user.isAdmin && (
                  <Route path="/alldata/" component={AllData}></Route>
                )}
              </>
            )}
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

//ReactDOM.render(<Spa/>, document.getElementById('root'))
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Spa />);
