import { useState, useRef } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [jwt, setjwt] = useState('');
  const jwtRef = useRef(null);
  const cookies = new Cookies();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let userData = {
      username,
      password,
    };
    fetch('http://localhost:8080/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          console.log('Response Data:', data);
          alert(JSON.stringify(data.error));
        } else if (data.success) {
          setjwt(data.success);
          jwtRef.current = data.success;
          cookies.set('jwt_authorization', data.success);
          navigate('/home');
        }
      })
      .catch((error) => {
        alert('error submitting form');
        console.log(error);
      });
  };

  return (
    <div className='d-flex align-items-center justify-content-center vh-100 bg-light'>
      <div
        className='card text-center shadow'
        style={{ width: '300px', height: '400px' }}
      >
        <div className='card-body d-flex flex-column justify-content-center'>
          <h1 className='card-title mb-4'>Sign In</h1>

          <h3 className='mb-2'>Username</h3>
          <textarea
            className='form-control mb-3'
            style={{ width: '267px', height: '40px' }}
            placeholder='Enter username'
            value={username}
            onChange={(e) => setusername(e.target.value)}
          ></textarea>

          <h3 className='mb-2'>Password</h3>
          <textarea
            className='form-control mb-3'
            style={{ width: '267px', height: '40px' }}
            placeholder='Enter password'
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          ></textarea>

          <button className='btn btn-primary' onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
