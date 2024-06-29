const AgentApp = () =>{
    return(
        <div className="text-center mt-5">
            <h1> This is Agent Application </h1>
            <button onClick={logout}> Logout </button>
        </div>
    )
}

export default AgentApp;

const logout = () =>{
    localStorage.clear();
    window.location.href="http://localhost:3000/";
    window.location.reload();
}