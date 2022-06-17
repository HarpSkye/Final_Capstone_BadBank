function NavBar({setUser}){
    const { user } = React.useContext(UserContext);
    return(
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">BadBank</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            { !user ?
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link active" href="#/CreateAccount/">Create Account</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#/login/">Login</a>
                                        </li>
                                    </> :
                                    <>
                                        <li className="nav-item">
                                        <a className="nav-link" href="#/deposit/">Deposit</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#/withdraw/">Withdraw</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#/balance/">Balance</a>
                                        </li>

                                        { user.isAdmin &&
                                            <li className="nav-item">
                                                <a className="nav-link" href="#/alldata/">AllData</a>
                                            </li>
                                        }
                                        <button onClick={() => setUser(null)}>Logout</button>
                                    </>
                            }
        
        
                        </ul>
                    </div>
                </nav>
)}