import * as React from "react";
import Chirp from "./components/Chirp";
import Header from "./components/Header";

const Home: React.FunctionComponent = (props) => {
  const [chirps, setChirps] = React.useState<Array<any>>([]);
  const [name, setName] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  

  React.useEffect(() => {
    (async () => {
      getAndRenderChirps();
    })();
  }, []); // listening for chirps changes

  async function getAndRenderChirps() {
    try {
      let res = await fetch("http://localhost:3000/api/chirps");
      let chirpsJSON = await res.json();
      setChirps(chirpsJSON);
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePostClick() {
    try {
      let userid = await fetch(`http://localhost:3000/api/users/${newChirp.name}`);
      let newChirp = {  userid, content, location };
      if(userid) {
        $.ajax({
          type: "POST",
          url: "/api/chirps",
          data: JSON.stringify(newChirp),
          contentType: "application/json",
        }).then(() => {
          setName("");
          setContent("");
          setLocation("")
          getAndRenderChirps();
        });
      } else {
        $("#input-field").append("<h5>Please enter email and password to create a user</h5>")
      }

      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <Header />
      <div className="row custom-bg justify-content-center">
        <div id="input-field" className="col-6">
        <div className="input-group">
            <span className="input-group-text">Username</span>
            <input
              type="text"
              className="form-control"
              aria-label="Subject"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
        <div className="input-group create-user">
            <span className="input-group-text">Email</span>
            <input
              type="text"
              className="form-control"
              aria-label="Subject"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
        <div className="input-group create-user">
            <span className="input-group-text">Password</span>
            <input
              type="text"
              className="form-control"
              aria-label="Subject"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="input-group">
            <span className="input-group-text">Location</span>
            <input
              type="text"
              className="form-control"
              aria-label="Subject"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            ></input>
          </div>
          <div className="input-group">
            <span className="input-group-text">Chirp</span>
            <textarea
              className="form-control"
              aria-label="Message"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="container row justify-content-center">
        <button
          className="btn btn-success btn-md col-6 align-center"
          onClick={handlePostClick}
        >
          
          Post chirp fr
        </button>
        </div>
        <div className="container row justify-content-center custom-bg">
          {chirps
            .slice(0)
            .reverse()
            .map((chirp) => {
              /* Reverses array so chirps display from newest to oldest */
              return (
                <Chirp
                  id={chirp.id}
                  name={chirp.name}
                  content={chirp.content}
                  location={chirp.location}
                  mentions={chirp.mentionedUsersIDs}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
