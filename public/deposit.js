function Deposit(){
    const [show, setShow]   = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [deposit, setDeposit] = React.useState(0);

    //const [deposit, setDeposit] = React.useState('');

    function validate(field, label){
        if (!field){
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''),3000);
            return false;
        }
            return true;
    }
    
    
    function handleDeposit(amount){
        console.log(amount);
        if (!validate(deposit, 'amount')) return;
        const url = `http://localhost:3001/accounts/deposit`;
        (async ()=>{
            var res = await fetch(`${url}?${new URLSearchParams({amount})}`
            , {
                method: 'POST',
            });
            var data = await res.json();
            console.log(data);
        })();
        
        setShow(false);
    }


    function clearForm(){
        setAmount('');
        setShow('');
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
                    <button type="submit" className="btn btn-light" onClick={clearForm}>Add another deposit</button>
                    </>
                )
            }
        />
    )
}