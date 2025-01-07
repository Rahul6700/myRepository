import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie'

export default function Home() {

  const cookies = new Cookies()
  const navigate = useNavigate();
  const [color, setcolor] = useState('#181818')

  const handleClick = () => {
    //send req to backend to change color
  };

  const handleLogout = () =>{
    cookies.remove("jwt_authorization")
    navigate('/signin')
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card text-center shadow" style={{ width: '300px', height: '200px' }}>
        <div className="card-body d-flex flex-column justify-content-center">
          <div
            className="mb-3"
            id="color-box"
            style={{
              width: '100px',
              height: '100px',
              margin: '0 auto',
              backgroundColor: `${color}`,
            }}
          ></div>
          <button className="btn btn-primary mt-3">Change Color</button>
          <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
