import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const [msg, setMsg] = useState("");

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      if (mode === "signup") {
        const res = await api.post("/user/signup", {
          username: form.username,
          email: form.email,
          password: form.password,
          phone: form.phone,
        });
        setMsg(res.data?.msg || "Signup success");
        navigate("/");
      } else {
        const res = await api.post("/user/login", {
          email: form.email,
          password: form.password,
        });
        setMsg(res.data?.msg || "Login success");
        navigate("/");
      }
    } catch (error) {
      setMsg(error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg">
      <div className="flex gap-2 mb-4">
        <button
          className={`px-3 py-2 rounded ${mode === "login" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("login")}
          type="button"
        >
          Login
        </button>
        <button
          className={`px-3 py-2 rounded ${mode === "signup" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("signup")}
          type="button"
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {mode === "signup" && (
          <>
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={onChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={onChange}
              className="w-full border p-2 rounded"
            />
          </>
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          className="w-full border p-2 rounded"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded" type="submit">
          {mode === "signup" ? "Create Account" : "Login"}
        </button>
      </form>

      {msg ? <p className="mt-3 text-sm">{msg}</p> : null}
    </div>
  );
};

export default Login;
