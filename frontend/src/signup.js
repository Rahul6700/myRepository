import { useState } from 'react';

export default function SignUp() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userData = {
      username,
      password,
    };
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then((response) => {
      return response.json(); // Return the JSON parsing promise
    })
    .then((data) => {
      if(data.error){
        console.log("Response Data:", data);
        alert(JSON.stringify(data.error));
      } else if (data.success) {
        alert(JSON.stringify(data.success));
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
          <h1 className='card-title mb-4'>Sign Up</h1>

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
