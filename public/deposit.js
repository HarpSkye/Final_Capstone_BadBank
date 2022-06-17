function Deposit(){
    const [show, setShow]   = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [amount, setAmount] = React.useState(0);
    const [deposit, setDeposit] = React.useState(0);
    const [balance, setBalance] = React.useState(0);

    const {user, setUser} = React.useContext(UserContext);
    //const [deposit, setDeposit] = React.useState('');


    React.useEffect(() => {
        const getBalance = async (id) => {
            const url = `/accounts/${id}`;
            const resp = await fetch(url);
            const data = await resp.json();
            setBalance(data.balance);
        }

        getBalance(user._id);
    }, []);

    function validateDeposit(field, label){
        if (!field){
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''),3000);
            return false;
        }
        if (!(field > 0)){
            setStatus('Error: Deposit cannot be negative');
            setTimeout(() => setStatus(''),3000);
            return false;
        }
            return true;
    }
    
    
    const handleDeposit = async () => {
        console.log(amount);
        if (!validateDeposit(amount, 'amount')) return;
        const url = `/accounts/${user._id}/deposit`;
        const res = await fetch(`${url}?${new URLSearchParams({amount})}`
        , {
            method: 'POST',
        });
        var data = await res.json();
        setBalance(data.newBalance);
        setUser({...user, balance: data.newBalance});
        setShow(false);
    }


    function clearForm(){
        setAmount(0);
        setShow(true);
    }

    return(
        <Card
            bgcolor="success"
            header="Deposit"
            Status={status}
            body={show ? (
                    <>
                    Balance  {balance}<br/>
                    <input type="input" className="form-control" id="input"
                    placeholder="Deposit" value={amount} onChange={e => setAmount(e.currentTarget.value)} /><br/>
                    <button type="submit" className="btn btn-light" onClick={handleDeposit}>amount</button>
                    </>
                ):(
                    <>
                    <h5>Success</h5>
                    <dl><dt>New Balance:</dt><dd>{balance}</dd></dl>
                    <button type="submit" className="btn btn-light" onClick={clearForm}>Add another deposit</button>
                    </>
                )
            }
        />
    )
}