function Login(){
    const [show, setShow]   = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function validate(field, label){
        if (!field){
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''),3000);
            return false;
        }
            return true;
    }
    
    function handleLogin(){
        console.log(email, password);
        if(!validate(email, 'email')) return;
        if(!validate(password, 'password')) return;
        const url = `/account/login/${email}/${password}`;
        (async ()=>{
            var res = await fetch(url);
            var data = await res.json();
            console.log(data)
        })();
        setShow(false);
    }

    function clearForm(){
        setEmail('');
        setPassword('');
        setShow(true);
    }

    return(
        <Card 
            bgcolor="warning"
            header="Login"
            status={status}
            body={show ? (
                    <>
                    Email<br/>
                    <input type="input" className="form-control" id="email" placeholder="Enter email" 
                    value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                    Password<br/>
                    <input type="password" className="form-control" id="password"
                    placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                    <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>
                    </>
            ):(
                <>
                <h5>Success</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Login another account</button>
                </>
            )}
        />
    )
}