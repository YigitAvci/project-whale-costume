import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
	Container,
	Input,
	Row,
	Col,
	Label,
	Button,
	ListGroup,
	ListGroupItem,
} from "reactstrap";
import { updateAuthToken } from "../redux/actions/AuthActions";
import { updateSessionState } from "../redux/actions/SessionActions"
import { updateUser } from "../redux/actions/CurrentUserActions"

function LoginPage() {
	const [user, setUser] = useState({ username: "", password: "" });
	const USERNAME_FIELD = "username";
	const PASSWORD_FIELD = "password";

    
	const authToken = useSelector((state) => state.authReducer);
	const currentUser = useSelector((state) => state.currentUserReducer);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		updateAuthToken(authToken);
		updateUser(currentUser);
	}, [authToken, currentUser]);

	async function login() {
		await fetch("http://localhost:8080/authentication/authenticate", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user),
		})
			.then((response) => response.json())
			.then((data) => {
				const token = data.data.token;
				dispatch(updateAuthToken("Bearer " + token));
                dispatch(updateSessionState(true))
				dispatch(updateUser(data.data.username))
				console.log("username: ", data.data.username)
				navigate("/");
			});
	}

	const handleUserAttributeChange = (event) => {
		const attribute = event.target.id;
		const value = event.target.value;
		setUser(Object.assign(user, { [attribute]: value }));
	};

	return (
		<div>
			<Row>
				<Col>
					<Label for={USERNAME_FIELD}>username:</Label>
					<Input
						id={USERNAME_FIELD}
						type="text"
						onChange={handleUserAttributeChange}
					></Input>
				</Col>
				<Col>
					<Label for={PASSWORD_FIELD}>password:</Label>
					<Input
						id={PASSWORD_FIELD}
						type="password"
						onChange={handleUserAttributeChange}
					></Input>
				</Col>
				<Col style={{ display: "flex", alignItems: "flex-end" }}>
					<Button color="success" onClick={login}>
						login
					</Button>
				</Col>
			</Row>
			<br></br>
			<Row>
				<Link to="/signup">don't you have an account?</Link>
			</Row>
		</div>
	);
}

export default LoginPage;
