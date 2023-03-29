function Test(){
    return(
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h3>Test:</h3>
            <ul className="page-navbar">
                <li className="links"><a href="/">Home</a></li>
                <li class="dropdown">
                    <a href="javascript:void(0)" class="dropbtn">Genre</a>
                    <div class="dropdown-content">
                        <a href="#">Action</a> 
                        <a href="#">Adventure</a> 
                        <a href="#">Indie</a> 
                        <a href="#">MMO</a> 
                        <a href="#">RPG</a> 
                        <a href="#">Shooter</a> 
                        <a href="#">Puzzle</a> 
                    </div>
                </li>
                <li className="links"> <a href='/games'>Games</a></li>
            </ul>


        </div>
    )
}

export default Test;