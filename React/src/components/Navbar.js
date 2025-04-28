import logo from '../assets/RaspberryPi.png';
//import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

  return (
    <div className='navbar'>
      <img src={logo} alt='Raspberry Pi' />
      <ul>
        <li><NavLink to='/home'>Home</NavLink></li>
        <li><NavLink to='/controller'>Controller</NavLink></li>
        <li><NavLink to='/about'>About</NavLink></li>
        <li><NavLink to='/contact'>Contact</NavLink></li>
      </ul>
      <div className='link-btns'>
     <NavLink to='/login'>  <button className='btn login'>Login</button></NavLink>
      <NavLink to='/register'> <button className='btn register-btn-1'>Register</button></NavLink>
      </div>
      
    </div>
  );
}

export default Navbar;
