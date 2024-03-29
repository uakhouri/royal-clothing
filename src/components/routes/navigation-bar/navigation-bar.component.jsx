import { Fragment, useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import { ReactComponent as RoyalLogo } from '../../../assets/crown.svg'


import { signOutUser } from '../../../utils/firebase/firebase.utils.js'

import CartIcon from "../../cart-icon/cart-icon.component.jsx"
import CartDropDown from "../../cart-dropdown/cart-dropdown.component.jsx"

import { UserContext } from "../../../context/users.context"
import { CartContext } from "../../../context/cart.context"

import './navigation.styles.scss'


const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    // console.log(currentUser)\
    const {isCartOpen} = useContext(CartContext)


    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <RoyalLogo className='logo' />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to={"/shop"}>
                        Shop
                    </Link>
                    {
                        currentUser ? (

                            <div>
                            <span className='nav-link' onClick={signOutUser}> Sign Out </span>
                            <h5>Hi {currentUser.displayName}</h5>
                            </div>
                            )

                            : (
                                <Link className="nav-link" to={"/authentication"}>
                                    Sign In
                                </Link>
                            )
                            

                    }
                    <CartIcon />


                </div>
                {isCartOpen && <CartDropDown />}
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation

// Fragment is useful when you dont want to render any HTML element