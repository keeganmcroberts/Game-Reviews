import {useNavigate} from 'react-router-dom';


function Banner({user, setUser}){


    let navigate = useNavigate();

    function goHome(){
        navigate('/')
    }


    function viewLogin(){
        navigate('/login')
    }

    function viewProfile(){
        navigate('/profile')
    }

    function viewPlatforms(){
        navigate('/platforms')
    }

    function viewGames(){
        navigate('/games')
    }

    function logout(){
        fetch ("/logout",{
            method: "DELETE"
        })
        .then( res => {
            if (res.ok){
                setUser(false)
        }})
        alert("You've been Logged out")
    }



    
    return(
        <div className="banner-div">
        <div className="banner">
            <h3 onClick={goHome} className='banner-link'>Home</h3>
            <h3 onClick={viewPlatforms} className='banner-link'>Platforms</h3>
            <h3 onClick={viewGames} className='banner-link'>Games</h3>
            <h3 onClick={viewProfile} className='banner-link'>Profile</h3>
            {user.id ?  
            <h3 onClick={logout} className='banner-link'>Logout</h3>
            :
            <h3 onClick={viewLogin} className='banner-link'>Login</h3>
            }   


        </div>
        </div>
    )
}

export default Banner;