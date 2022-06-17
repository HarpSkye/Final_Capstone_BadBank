function Balance() {
  const { user } = React.useContext(UserContext);
  return (
    <Card
      bgcolor="primary"
      header="Balance"
      body={
        <>
          <h5>Balance: ${JSON.stringify(user.balance)}</h5>
        </>
      }
    />
  );
}
