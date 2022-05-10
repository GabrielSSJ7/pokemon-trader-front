import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import "./style.scss";
import Auth from "../../lib/authentication";

function Login() {
  const [isLoginComponent, setIsLoginComponent] = useState(true);
  return (
    <div id="login-root-container">
      <div className="wallpaper-container">
      </div>
      <div className="form-container">
      	{isLoginComponent ? <FormLogin /> : <FormRegister />}
	<button 
	    id="btn-change-form" 
	    type="button" 
	    onClick={() => setIsLoginComponent(!isLoginComponent)}>
	      {!isLoginComponent ? "Acesse sua conta" : "Registrar-se"}
	</button>
      </div>
    </div>
  );
}

function FormLogin() {
  const auth = Auth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.login(username, password).then(() => {
      toast.success("Autenticado com sucesso!");
      navigate("/");
    }).catch((e) => {
      console.log(e);
      toast.error("Usuário ou senha incorretos!");
    });
  }
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-header">
	<h1>Cryptomons</h1>
      </div>
      <div className="form-body">
	<div className="form-input-container">
	  <input type="text" onChange={e => setUsername(e.target.value)} placeholder="Apelido" />
	  <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Senha" />


	  <button type="submit">Entrar</button>
	</div>
      </div>
    </form>
  );
}


function FormRegister() {
  const auth = Auth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("As senhas não conferem!");
      return;
    }
    auth.register(username, password, name).then(() => {
      toast.success("Usuário criado com sucesso!");
      setTimeout(() => {
	window.location.reload();
      }, 2500);
    }).catch((e) => {
      console.log(e);
      toast.error("Algo de errado não está certo!");
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Registrar-se</h1>
      <div className="form-input-container">
	<input type="text" onChange={e => setName(e.target.value)} placeholder="Nome" />
	<input type="text" onChange={e => setUsername(e.target.value)} placeholder="Apelido" />
	<input type="password" onChange={e => setPassword(e.target.value)} placeholder="Senha" />
	<input type="password" onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirmar senha" />
	<button type="submit">Registrar-se</button>
      </div>
    </form>
  );
}

export default Login;
