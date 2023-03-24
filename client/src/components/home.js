import { useEffect } from "react";
import steve from "/Users/keegan/Development/code/gamereviews/client/src/favicon-32x32.png"


function Home({logo, user, setUser}) {




console.log("user:", user)


    return (
      <div className="App">
        <header className="App-header">
          <img src="https://upload.wikimedia.org/wikipedia/en/e/e7/Steve_%28Minecraft%29.png" className="App-logo" alt="whoops" />
          <p>
             Hail Steve
          </p>
        </header>
      </div>
    );
  }
  
  export default Home;