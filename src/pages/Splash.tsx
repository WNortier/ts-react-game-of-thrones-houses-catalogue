import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ForwardRefExoticComponent, ForwardedRef, RefAttributes, useRef } from "react"

export default function Splash() {
  const navigate = useNavigate();

  const handleBeginJourney = () => {
    // props.setIsLoggedIn(true)
    const m = (document.getElementById("music") as HTMLAudioElement | null);
    if (m !== null) {
      m.play();
      m.volume = 0.1;
    }
    // HANDLE LOGIN DISABLED CASES
    if (localStorage.getItem("disableLogin") === "true") {
      // localStorage.setItem('loggedin', 'true')
      navigate("/houses");
      document.querySelector("#layout-basic-navbar")?.classList.remove("invis");
      document.querySelector("#layout-basic-navbar")?.classList.add("vis");
      document.querySelector("#layout-basic-navbar")?.classList.add("fadein");
      // HANDLE LOGIN ENABLED CASES
    } else if (
      localStorage.getItem("loggedin") === "false" &&
      localStorage.getItem("init") === "true"
    ) {
      navigate("/login");
    } else {
      document.querySelector("#layout-basic-navbar")?.classList.add("invis");
      localStorage.setItem("pause", "false");
      // (document.getElementById('video') as HTMLVideoElement).classList.add('vis');
      (document.getElementById("video") as HTMLVideoElement).style.zIndex =
        "10";
      (document.getElementById("video") as HTMLVideoElement).play();
      (document.getElementById("video") as HTMLVideoElement).classList.remove(
        "invis",
      );
      (document.getElementById("video") as HTMLVideoElement).classList.add(
        "vis",
      );
      navigate("/login");
    }
  };
  return (
    <div role="splash" id="splash">
      <h4 id="splash-message">Welcome to Game Of Thrones Houses Catalogue</h4>
      <Button
        onClick={() => handleBeginJourney()}
        variant="secondary"
        type="submit"
        size="sm"
      >
        Begin Journey
      </Button>
    </div>
  );
}
