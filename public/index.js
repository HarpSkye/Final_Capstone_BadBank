function Spa(){
    return (
        //<NavBar/>
        <HashRouter>
            <div>
                <NavBar/>
                <UserContext.Provider value={{users:[{name:'able', email:'able@mit.edu', password:'secret', balance:100}]}}> 
                    <div className = "container" style={{padding: "20px"}}>
                     
                        <Route path="/" exact component={Home}></Route>
                        <Route path="/CreateAccount/" component={CreateAccount}></Route>
                        <Route path="/login/" component={Login}></Route>
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

