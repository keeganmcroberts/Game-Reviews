

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
            <div className="games-banner">
                <ul className="page-navbar">
                    <li class="dropdown">
                        <a href="javascript:void(0)" class="dropbtn">Platform &#9660;</a>
                        <div class="dropdown-content">
                            <a href="#">Playstation</a> 
                            <a href="#">Xbox</a> 
                            <a href="#">PC</a> 
                            <a href="#">Nintendo</a> 
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="javascript:void(0)" class="dropbtn">Genre &#9660;</a>
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
                    <li class="dropdown">
                        <a href="javascript:void(0)" class="dropbtn">Rating &#9660;</a>
                        <div class="dropdown-content">
                            <a href="#">High to Low</a> 
                            <a href="#">Low to High</a> 
                            <a href="#">Popular</a> 
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="javascript:void(0)" class="dropbtn">Year &#9660;</a>
                        <div class="dropdown-content">
                            <a href="#">2023</a> 
                            <a href="#">2022</a> 
                            <a href="#">2021</a> 
                            <a href="#">2020</a> 
                            <a href="#">2019</a> 
                            <a href="#">2018</a> 
                            <a href="#">2017</a> 
                            <a href="#">2016</a> 
                            <a href="#">2016</a> 
                            <a href="#">2016</a> 
                            <a href="#">2015</a> 
                            <a href="#">2014</a> 
                            <a href="#">2013</a> 
                            <a href="#">2012</a> 
                            <a href="#">2011</a> 
                            <a href="#">2010</a> 
                        </div>
                    </li>
                   
            </ul>
                    <div className="search-right"><input type="text" className="search" placeholder="Search Games..."
                    /></div>
    
            </div>
        </div>
    )
}

export default UserProfile;