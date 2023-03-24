

function UserProfile({user}){
    return(
        <div>
        <h1> 
            <br></br>
            <br></br>
            <br></br>
            <br></br>
             </h1>
            <h4>hello {user?.first_name}</h4>
        </div>
    )
}

export default UserProfile;