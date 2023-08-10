import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import { useSelector } from "react-redux";

export default function EditReview(args) {

	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

  const authToken = useSelector((state) => state.authReducer);

  async function updateReview() {
    var editedReview = document.getElementById("reviewField").value
    if(editedReview !== args.review) {
      var reviewObject = {
        id: args.reviewId,
        review: editedReview
      }
      await fetch("http://localhost:8080/reviews", {
        method: "PUT",
        headers: { 'Content-Type': 'application/json', Authorization: authToken},
        body: JSON.stringify(reviewObject)
      })
      .then(response => response.json())
      .then(data => {
        args.refreshMovieDetails(data.data.movie)
      })
    }
    toggle()
  }

	return (
		<div style={{visibility: args.visibility}}>
			<Button color="primary" onClick={toggle} style={{marginRight: "15px"}}>
				Edit
			</Button>
			<Modal isOpen={modal} toggle={toggle} >
				<ModalHeader toggle={toggle}>Edit Your Review</ModalHeader>
				<ModalBody>
          <Form>
            <FormGroup>
              <Label>Review</Label>
              <Input id = "reviewField" type="textarea" defaultValue={args.review}></Input>
            </FormGroup>
          </Form>
				</ModalBody>
				<ModalFooter>
					<Button color="success" onClick={() => updateReview()}>
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
