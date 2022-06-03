/* import { UserContext } from './UserContext';
import Card from './Card'; */

function Withdraw(){
    const [show, setShow]   = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [withdraw, setWithdraw] = React.useState('');


    function validate(field, label){
        if (!field){
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''),3000);
            return false;
        }
            return true;
    }
    
    
    function handleWithdraw(){
        console.log(withdraw);
        if (!validate(withdraw, 'withdraw')) return;
        const url=`/account/deposit/${email}/${amount}`;
        (async ()=> {
            var res = await fetch(url);
            var data = await res.json();
        })();
        setShow(false);
    }


    function clearForm(){
        setWithdraw('');
        setShow('');
    }
    return(
        <Card
            bgcolor="danger"
            header="Withdraw"
            Status={status}
            body={show ? (
                    <>
                    Balance     <br/>
                    <input type="number" className="form-control" id="input"
                    placeholder="Withdraw" value={withdraw} onChange={e => setWithdraw(e.currentTarget.value)} /><br/>
                    <button type="submit" className="btn btn-light" onClick={handleWithdraw}>Withdraw</button>
                    </>
                ):(
                    <>
                    <h5>Success</h5>
                    <button type="submit" className="btn btn-light" onClick={clearForm}>Add another withdraw</button>
                    </>
                )
            }
        />
    )
}