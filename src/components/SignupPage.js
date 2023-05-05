import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Input, Label, Button, Container, FormFeedback } from "reactstrap";
import alertify from "alertifyjs";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
    // user attributes
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("USER")

    const [verifiedPassword, setVerifiedPassword] = useState("")
	const [isVerifiedPassword, setIsVerifiedPassword] = useState(false);

	const navigate = useNavigate();

    const passwordRegex = new RegExp("(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{8,})")
    // (?=.*[0-9]) (?=.*[A-Z]) (?=.*[a-z]) (?=.{8,}) (?=.*[!@#$%^&*.]) --> there should not be spaces between regex expressions like "(?=.*[A-Z])_SPACE_(?=.*[0-9])"
    const [isMatchedPassword, setIsMatchedPassword] = useState(false)

    const emailRegex = new RegExp("^[a-z0-9]+([.-]?[a-z0-9]+)*@[a-z0-9]+([-]?[a-z0-9]+)*(.[a-z0-9]{2,3})+$") // [a-z0-9]@[a-z0-9].[a-z0-9] -- ^(?=.*[a-z0-9.*!#&]+@+[a-z0-9*!#&]+[.]+[a-z])
    const [isMatchedEmail, setIsMatchedEmail] = useState(false)


	const handleUsername = (event) => { // handle changes on attributes
		setUsername(event.target.value);
	};

    const handlePassword = (event) => { // handle changes on password
        setPassword(event.target.value);
    }
    
    const handleRole = (event) => { // handle changes on role
		setRole(event.target.value);
	};

    const handleVerifyPassword = (event) => {
        setVerifiedPassword(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const checkEmailMatchedWithPattern = () => {
        if(emailRegex.test(email)) {
            setIsMatchedEmail(true)
        } else {
            setIsMatchedEmail(false)
        }
    }

	const checkPasswordMatchedWithPattern = () => { // check whether the password is matching with the pattern
        if (passwordRegex.test(password)) {
			setIsMatchedPassword(true)
		} else {
		    setIsMatchedPassword(false)
        }
	};

    const checkPasswordVerified = () => { // check whether the password is verified 
        if(isMatchedPassword && password === verifiedPassword) {
            setIsVerifiedPassword(true)
        } else {
            setIsVerifiedPassword(false)
        }
    }

    useEffect(() => {
        checkPasswordMatchedWithPattern()
        checkPasswordVerified()
    }, [password, verifiedPassword, isMatchedPassword])

    useEffect(() => {
        console.log(email)
        checkEmailMatchedWithPattern()
        console.log("email validation result: ", isMatchedEmail)
    }, [email, isMatchedEmail])

    const areUserCredentialsReady = () => {
        return isMatchedEmail && isMatchedPassword && isVerifiedPassword && username != null && username.trim() !== ""
    }

	async function signup() {
		if (areUserCredentialsReady()) {
			await fetch("http://localhost:8080/users/addUser", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({email: email, username: username, password: password, role: role}),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.success === true) {
						alertify.success(
							"Congrats! The user whose username is [" +
								data.data.username +
								"] is created, successfully."
						);
						navigate("/login");
					}
				});
		} else {
			alertify.warning("something you have entered is missing or wrong!");
		}
	}



	return (
		<div>
			<Row>
				<Col>
					<Label for="email">email:</Label>
					<Input
                        valid={isMatchedEmail}
                        invalid={!isMatchedEmail}
						id="email"
						type="email"
						onChange={handleEmail}
					></Input>
                    <FormFeedback invalid="true">
						* Email address should be proper to email pattern
					</FormFeedback>
				</Col>
                <Col>
					<Label for="username">username:</Label>
					<Input
						id="username"
						type="text"
						onChange={handleUsername}
					></Input>
				</Col>
			</Row>
			<br></br>
			<Row>
				<Col>
					<Label for="password">password:</Label>
					<Input
                        valid={isMatchedPassword}
                        invalid={!isMatchedPassword}
						id="password"
						type="password"
						onChange={handlePassword}
					></Input>
					<FormFeedback invalid="true">
						* Password should contain at least 1 uppercase letter, 1 lowercase letter, 1 one-digit number, 1 special character and no any space. 
					</FormFeedback>
				</Col>
				<Col>
					<Label for="verifiedPassword">verify password:</Label>
					<Input
                        valid={isVerifiedPassword}
                        invalid={!isVerifiedPassword}
						id="verifiedPassword"
						type="password"
						onChange={handleVerifyPassword}
					></Input>
                    <FormFeedback invalid="true">
						* Password should be verified!
					</FormFeedback>
				</Col>
			</Row>
			<br></br>
			<Row>
				<Col>
					<Label for="role">role:</Label>
					<Input
						id="role"
						type="select"
						onChange={handleRole}
					>
						<option>USER</option>
						<option>ADMIN</option>
					</Input>
				</Col>
			</Row>
			<br></br>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<Link to="/login">
					<Button color="warning">back to login</Button>
				</Link>
				<Button color="success" onClick={signup}>
					signup
				</Button>
			</div>
		</div>
	);
}
