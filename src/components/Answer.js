import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter } from "reactstrap";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Answer(args) {
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);
    const authToken = useSelector((state) => state.authReducer);
    const author = useSelector((state) => state.currentUserReducer);

    async function makeComment() {
        console.log("author: ", author.user.id);
        var comment = document.getElementById("commentField").value;
		if (comment.length > 0) {
			var commentObject = {
				comment: comment,
                author: {
                    id: author.user.id
                },
                review: {
                    id: args.reviewId
                }
                
			};
            console.log("comment object: ", commentObject);
			await fetch("http://localhost:8080/comments", {
				method: "POST",
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
		<div>
			<Button color="warning" style={{ marginRight: "15px" }} onClick={toggle}>
				Answer
			</Button>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Make a Comment To {args.answerTo}</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label>Comment</Label>
							<Input
								id="commentField"
								type="textarea"
							></Input>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="success" onClick={() => makeComment()}>
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
