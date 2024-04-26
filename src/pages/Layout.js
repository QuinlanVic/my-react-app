// imports
import { Outlet, Link } from "react-router-dom";

// Layout component as arrow function
const Layout = () => {
    return (
        <>
        {/* Navigation bar */}
            <nav>
                <ul>
                {/* Link is used to set the URL and keep track of browsing history */}
                {/* For all internal links we use <Link> instead of <a href=""> */}
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/blogs">Blogs</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/dummy">Dummy</Link>
                    </li>
                    <li>
                        <Link to="/car">Car</Link>
                    </li>
                </ul>
            </nav>
        {/* Outlet renders the current route selected */}
        {/* Component falls here like a base.html page hehe */}
            <Outlet />
        </>
    )
}

export default Layout;