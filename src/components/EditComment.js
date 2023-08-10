import { useState } from "react";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Input,
} from "reactstrap";
import { useSelector } from "react-redux";

export default function EditComment(args) {
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const authToken = useSelector((state) => state.authReducer);

	async function updateComment() {
		var editedComment = document.getElementById("commentField").value;
		if (editedComment !== args.comment) {
			var commentObject = {
				id: args.commentId,
				comment: editedComment,
			};
			await fetch("http://localhost:8080/comments", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: authToken,
				},
				body: JSON.stringify(commentObject),
			})
				.then((response) => response.json())
				.then((data) => {
					args.refreshMovieDetails(data.data.review.movie);
				});
		}
		toggle();
	}

	return (
		<div style={{ visibility: args.visibility }}>
			<Button color="primary" onClick={toggle} style={{ marginRight: "15px" }}>
				Edit
			</Button>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Edit Your Comment</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label>Comment</Label>
							<Input
								id="commentField"
								type="textarea"
								defaultValue={args.comment}
							></Input>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="success" onClick={() => updateComment()}>
						Confirm
					</Button>{" "}
					<Button color="secondary" onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
}
