import { useEffect, useState } from "react";

// reusable custom hook used to fetch data from a url, parse it into json and return it in a list
const useFetch = (url) => {
    const [data, setData] = useState(null);
  
    useEffect(() => {
      fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
    }, [url]);

    return [data];
}
export default useFetch;