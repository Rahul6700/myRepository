export default function SignUp() {
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
          ></textarea>

          <h3 className='mb-2'>Password</h3>
          <textarea
            className='form-control mb-3'
            style={{ width: '267px', height: '40px' }}
            placeholder='Enter password'
          ></textarea>

          <button className='btn btn-primary'>Submit</button>
        </div>
      </div>
    </div>
  );
}
