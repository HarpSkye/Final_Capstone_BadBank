/* import { UserContext } from './UserContext';
import Card from './Card'; */

function Withdraw(){
    const [show, setShow]   = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [amount, setAmount] = React.useState(0);
    const [balance, setBalance] = React.useState(0);

    const {user, setUser} = React.useContext(UserContext);

    React.useEffect(() => {
        const getBalance = async (id) => {
            const url = `/accounts/${id}`;
            const resp = await fetch(url);
            const data = await resp.json();
            setBalance(data.balance);
        }

        getBalance(user._id);
    }, []);

    function validateWithdraw(field, label){
        if (!field){
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''),3000);
            return false;
        }

        if (!(field >0)){
            setStatus('Error: Withdraw cannot be negative');
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
            return true;
    }
    
    
    const handleWithdraw = async () =>{
        console.log(amount);
        if (!validateWithdraw(amount, 'withdraw')) return;
        const url = `/accounts/${user._id}/withdraw`;
        const res = await fetch(`${url}?${new URLSearchParams({amount})}`,{ 
            method: 'POST',
        });
        const data = await res.json();
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
            bgcolor="danger"
            header="Withdraw"
            Status={status}
            body={show ? (
                    <>
                    Balance    {balance}<br/>
                    <input type="number" className="form-control" id="input"
                    placeholder="Withdraw" value={amount} onChange={e => setAmount(e.currentTarget.value)} /><br/>
                    <button type="submit" className="btn btn-light" onClick={handleWithdraw}>Withdraw</button>
                    </>
                ):(
                    <>
                    <h5>Success</h5>
                    <dl><dt>New Balance:</dt><dd>{balance}</dd></dl>
                    <button type="submit" className="btn btn-light" onClick={clearForm}>Add another withdraw</button>
                    </>
                )
            }
        />
    )
}