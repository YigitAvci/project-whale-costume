import { Link } from "react-router-dom";
import { Button, Navbar, NavbarBrand } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { updateAuthToken } from "../redux/actions/AuthActions";
import { updateSessionState } from "../redux/actions/SessionActions"

export default function NavigationBar() {
	const dispatch = useDispatch();

	const isLoggedIn = useSelector((state) => state.sessionReducer);
	const authToken = useSelector((state) => state.authReducer)

	console.log("is logged in: ", isLoggedIn);
	const logout = () => {
		dispatch(updateAuthToken(""));
		dispatch(updateSessionState(false))
	}

	useEffect(() => {
		
	})

	return (
		<div>
			<Navbar style={{ backgroundColor: "orange" }}>
				<Link to="/" style={{ textDecoration: "none", fontWeight: "bold" }}>
					<NavbarBrand style={{ fontWeight: "bold" }}>
						Movie Review App
					</NavbarBrand>
				</Link>
				{isLoggedIn === false ? (
					<Link
						to="/login"
						style={{ textDecoration: "none", fontWeight: "bold" }}
					>
						<Button style={{ backgroundColor: "green" }}>login</Button>
					</Link>
				) : (
					<Button style={{ backgroundColor: "red" }} onClick={logout}>logout</Button>
				)}
			</Navbar>
		</div>
	);
}
