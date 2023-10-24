import { Fragment } from "react"
import { Outlet, Link } from "react-router-dom"
import {ReactComponent as RoyalLogo}  from '../../../assets/crown.svg'
import './navigation.styles.scss'


const Navigation = () => {
    return (
        <Fragment>
            <div className="navigation">
            <Link className="logo-container" to='/'>
                <RoyalLogo className='logo'/>
            </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to={"/shop"}>
                        Shop
                    </Link>
                    <Link className="nav-link" to={"/authentication"}>
                        Sign In
                    </Link>
                    
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation

// Fragment is useful when you dont want to render any HTML element