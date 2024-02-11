import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Display from "./Display.jsx";

function App() {
  // let [count,setCount] = useState(0);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  return (
    <>
      {/* <Button onClick={()=>{
      setCount(++count);
    }}>Click me</Button>
    <h3>the count is {count}</h3> */}
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onInput={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onInput={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
      </Form>

      <Display
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    </>
  );
}

export default App;
