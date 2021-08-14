import React, {useState} from 'react';

export function RegistrationView(props){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email   , setEmail   ] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username , password);
        
    props.onRegister(username);
  };

  return(
    <form>
      <label>
        Username: <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <br/>
      <label>
        Password: <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <br/>
      <label>
        Email: <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <br/>
      <button type="button" onClick={handleSubmit}>Register</button>
    </form>
  );

}
