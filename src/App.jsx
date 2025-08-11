import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import Display from "./Display.jsx";
import Dashboard from "./Dashboard.jsx";
import { ThemeContext } from "./components/ThemeContext.jsx";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState("dashboard");
  const { themeName, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant={view === "dashboard" ? "primary" : "outline-primary"} onClick={() => setView("dashboard")}>Dashboard</Button>
          <Button variant={view === "form" ? "primary" : "outline-primary"} onClick={() => setView("form")}>Form</Button>
        </div>
        <Button variant="outline-secondary" onClick={toggleTheme}>{themeName === "dark" ? "Light" : "Dark"} theme</Button>
      </div>

      {view === "dashboard" ? (
        <Dashboard />
      ) : (
        <div style={{ padding: 16 }}>
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
              <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
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

          <Display email={email} password={password} setEmail={setEmail} setPassword={setPassword} />
        </div>
      )}
    </>
  );
}

export default App;
