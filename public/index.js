// const UserContext = require("./user.context.js");

function Spa(){
    const [ user, setUser ] = React.useState({"id":"629a8df15ca5ddcf05d4321d","name":"jbeckius","email":"j@j.com","token":"aaa-bbb-ccc"});


    return (
        //<NavBar/>
        <HashRouter>
            <div>
                <NavBar/>
                <UserContext.Provider value={{user}}> 
                    <div className = "container" style={{padding: "20px"}}>
                     
                        <Route path="/" exact component={Home}></Route>
                        <Route path="/CreateAccount/" component={CreateAccount}></Route>
                        <Route path="/login/" render={() => <Login setUser={setUser} />}></Route>
                        <Route path="/deposit/" component={Deposit}></Route>
                        <Route path="/withdraw/" component={Withdraw}></Route>
                        {/* <Route path="/balance/" component={Balance}></Route> */}
                        <Route path="/alldata/" component={AllData}></Route>
                     </div>
                </UserContext.Provider>      
            </div>
        </HashRouter>

    )
}

//ReactDOM.render(<Spa/>, document.getElementById('root'))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Spa />)

