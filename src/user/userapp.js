const UserApp = () =>{
    return(
        <div className="text-center mt-5">
            <h1> This is User Application </h1>
            <button onClick={logout}> Logout </button>
        </div>
    )
}

export default UserApp;

const logout = () =>{
    localStorage.clear();
    window.location.href="http://localhost:3000/";
    window.location.reload();
}