import {useNavigate} from 'react-router-dom';
import {MdOutlineGames} from 'react-icons/md';
import {SiYoutubegaming} from 'react-icons/si';
import {GiGameConsole} from 'react-icons/gi';
import {CgProfile} from 'react-icons/cg';


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

    function test(){
        navigate('/test')
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
            {/* <h3 onClick={test} className='banner-link'>Test</h3> */}
            <h3 onClick={goHome} className='banner-link'>Home<MdOutlineGames size={30} color='blue' /></h3>
            <h3 onClick={viewPlatforms} className='banner-link'>Platforms<GiGameConsole size={30} color='red' /></h3>
            <h3 onClick={viewGames} className='banner-link'>Games<SiYoutubegaming size={30} color='green'  /></h3>
            <h3 onClick={viewProfile} className='banner-link'>Profile<CgProfile size={30} color='purple'/> </h3>
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