import React from 'react'; // use, useState are not used in the provided code, so removed.
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// Assuming Container, Logo, LogoutBtn are correctly imported from '../index'
import { Container as Ayaz , Logo as Logoo, LogoutBtn as Lb } from '../index';

function Header() {
  const authStatus = useSelector( (state) => state.auth.status);
  const navigate = useNavigate();


  const navItems =[
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
]

  return (
    // Use the new header background and text color from your config
    // Added subtle shadow for depth and vertical padding for spacing
    <header className='bg-bg-header text-text-header py-3 shadow-md'>
      {/* Assuming Ayaz is a Container component that provides horizontal padding */}
      <Ayaz>
        <nav className='flex items-center justify-between'> {/* Added justify-between for better spacing */}
          <div className='mr-4'>
            <Link to='/'>
            {/* Ensure your Logo component looks good on a white background.
                It might need color adjustments if it has hardcoded colors. */}
            <Logoo />
            </Link>
          </div>
          {/* Use ml-auto instead of mx-auto if using justify-between
              to push the nav items to the right while the logo is left */}
          <ul className='flex items-center ml-auto'>
            {navItems.map((item) =>
            item.active ?(
              // Added margin between nav items (mr-4)
              <li key={item.name} className='mr-4'>
                <button
                  onClick={() => navigate(item.slug)}
                  // Inherit text color from parent header (text-text-header - dark gray)
                  // Keep the light blue hover background - it works well with dark text on white
                  // Adjusted padding and text size slightly for a common header style
                  className='inline-block font-semibold text-base px-4 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >
                  {item.name}
                </button>
              </li>
            ) : null
            )}
            {/* Position the Logout button */}
            {
              authStatus && (
                // Ensure the LogoutBtn component has appropriate styling,
                // e.g., using bg-accent-primary text-white for its button.
                <li className=' '> {/* Keep the container li simple */}
                  <Lb />
                </li>
              )
            }
          </ul>
        </nav>
      </Ayaz>
    </header>
    )
}

export default Header;