import { Card, CardBody, CardFooter, Button } from "reactstrap";
import EditComment from "./EditComment";
import isCurrentUserAuthor from "../utils/UserValidations";
import { useSelector } from "react-redux";
import Answer from "./Answer";

export default function Comment(comment) {
	const currentUser = useSelector((state) => state.currentUserReducer);

	function logComment() {
		console.log("hello guys, it works - ", comment.comment.lastEditDate);
	}

	return (
		<Card style={{ marginLeft: "50px", marginTop: "5px" }}>
			{logComment()}
			<CardBody>{comment.comment.comment}</CardBody>
			<CardFooter
				style={{
					textAlign: "end",
					display: "flex",
					flexDirection: "row-reverse",
				}}
			>
				{comment.comment.author.username + " / " + comment.comment.lastEditDate}
				{/* <Button color="warning" style={{ marginRight: "15px" }}>
					Answer
				</Button> */}
                <Answer answerTo={comment.comment.author.username}/>
				<EditComment
					visibility={isCurrentUserAuthor(
						comment.comment.author.username,
						currentUser.user.username
					)}
					comment={comment.comment.comment}
					commentId={comment.comment.id}
					refreshMovieDetails={comment.refreshMovieDetails}
				/>
			</CardFooter>
		</Card>
	);
}
