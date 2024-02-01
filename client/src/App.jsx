import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [blogs, setBlogs] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/blogs")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.log("error");
      });
  }, []);

  return (
    <>
      <div>
        {blogs.map(() => {

        })}
        <p>hi</p>
      </div>
    </>
  );
}

export default App;
