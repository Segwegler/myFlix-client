import React, {useState} from 'react';


export function LoginView(props) {

  const [username, setUsername ] = useState('');
  const [password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username , password);
    //send request to server for login
    //then call props.onLoggedIn(uername)

     props.onLoggedIn(username);
  };

  const goToReg = (e) => {
    props.goToReg();
  }

    return(
      <form>
        <label>
          Username: <input type="text" value={username} onChange={ e => setUsername(e.target.value)} />
        </label>
        <label>
          Password: <input type="password" value={password} onChange={ e => setPassword(e.target.value)} />
        </label>
        <button type="button" onClick={handleSubmit}>Log in!</button>
        <button type="button" onClick={goToReg}>Register</button>
      </form>
    );
}
