import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const [counter, setCounter] = useState(5)
  const decrementor = (i: number) => {
    setTimeout(() => {
      setCounter(counter - i)
    }, i * 1000)
  }
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 5000)
    for (let i = 1; i <= 5; i++) {
      decrementor(i)
    }
  }, [])
  return <div style={{ marginTop: "5rem" }}>
    <h4>
      Error 404 Page not found
    </h4>
    <br />
    <h4>You will be redirected in {counter} second{counter === 1 ? null : 's'}</h4>
  </div>
}
