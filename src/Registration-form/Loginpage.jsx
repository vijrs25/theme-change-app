import { useEffect, useState } from "react";
import "../App.css";
function Login() {

    //This is a Form Object to work with form elements
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  //As there are Three form element to print separate error we created three error element
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
  });

  //This is to contrl the color of error Statement to guide the user
  const [success, setSuccess] = useState({
    name:false, email:false, password:false
  });

  //This is to control the verification method you want field wise validation or direct submit validation
  const [validationtbool, setValidationbool] = useState(false);
  const [submit, setSubmitted] = useState(false);
  const gmailRegex = /^[a-zA-Z0-9]+@[a-z]+\.com/i;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value,  });

    if(validationtbool){
     if (id === "name") {
      if (!value) {
        setError((prev) => ({ ...prev, name: "You dont have Name ? ...huh" }));
         setSuccess( prev => ({ ...prev, name:false }) )
      } else {
        setError((prev) => ({ ...prev, name: "Nice Name" }));
        setSuccess( prev => ({ ...prev, name:true}) )
      }
    }    
    if (id === "email") {
      if (!gmailRegex.test(value)) {
        setError((prev) => ({ ...prev, email: "Invalid email address! It should be like xyx123@abc.com" }));
        setSuccess( prev => ({ ...prev, email:false}) )
      } else {
        setError((prev) => ({ ...prev, email: "good job on the mail" }));
        setSuccess( prev => ({ ...prev, email:true}) )
      }
    }
     if (id === "password") {
      if (!value) {
        setError((prev) => ({ ...prev, password: "Empty password not allowed" }));
      } else {
            if (form.password.length<8) {
                setError((prev) => ({ ...prev, password: "Weak Password! Make it more than 8 letters :(" }));
                setSuccess( prev => ({ ...prev, password:false}) )
            } else {
                setError((prev) => ({ ...prev, password: "Nice Strength!" }));
                setSuccess( prev => ({ ...prev, password:true}) )
            }
            }  }}else{
                setSuccess( prev => ({ ...prev, name:false,email:false,password:false }) )
            }
        };

  const handleSubmit = (e) => {
    e.preventDefault();

   if (!form.name || !form.email || !form.password) {
  setError({
    name: !form.name ? "Name is required!" : "",
    email: !form.email ? "Email is required!" : "",
    password: !form.password ? "Password is required!" : ""
  });
  return;
}

    if (!gmailRegex.test(form.email)) {
      setError({email: "The Email pattern should be xyz123@abc.com no speacial characters like _, ., - etc."}  
      );
      return;
    }

    setSubmitted(true);
    setError("No Error");
  };

  if (submit) {
    return (
      <div>
        <h2>Form Successfully submitted :{form.name}.</h2>
      </div>
    );
  }
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="formContainer"
        style={{
          fontFamily: "Lucida",
          margin: "40px auto",
          maxWidth: 400,
          padding: 30,
        }}
      >
        <h1>Registration form</h1>
        <label>Name</label> <br />
        <input
          type="text"
          name="name"
          value={form.name}
          id="name"
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Email</label> <br />
        <input
          type="text"
          name="email"
          id="email"
          value={form.email}
          onChange={handleChange}
        />
       
        <br />
        <br />
        <label>Password</label> <br />
        <input
          type="password"
          name="password"
          value={form.password}
          id="password"
          onChange={handleChange}
        />
        <br />
        <br />
        <button className="submit-btn">Submit</button>
        <button  style={{
    color: validationtbool ? "#194" : "#FA2"
  }} className="submit-btn" onClick={() => setValidationbool(v=>!v)}>Individual field validation status: {validationtbool ? "ON" :"OFF"}</button>
        <div
          style={{
            margin: "20px",
            height: "40px",
          }}
        >
          { error.name  &&  (<div style={{color: success.name?'#181':'#f15', width:"100%"}}> {error.name}  </div>) }
          { error.email &&  (<div style={{color: success.email?'#181':'#f18', width:"110%", }}> {error.email} </div>) }
          { error.password &&  (<div style={{color: success.password?'#181':'#f1A'}}> {error.password} </div>) }
        </div>
      </div>
    </form>
  );
}

export default Login;
