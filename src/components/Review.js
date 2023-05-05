import { Button, Card, CardBody, CardFooter } from "reactstrap";
import Comment from "./Comment";
import { useSelector } from "react-redux";

export default function Review(review) {

    const currentUser = useSelector((state) => state.currentUserReducer);

    function isCurrentUserAuthor(author) {
        console.log("author: ", author, " - current user: ", currentUser)
        if(author === currentUser) {
            console.log("current user is the author")
            return "visible"
        }
        console.log("current user is NOT the author")
        return "hidden"
    }
    
    return(
        <div>
            <Card>
                <CardBody>
                    {review.review.review}
                </CardBody>
                <CardFooter style={{textAlign: "end"}}>
                    <Button style={{visibility: isCurrentUserAuthor(review.review.author.username), marginRight: "15px"}}>Edit</Button>
                    <Button color="warning" style={{marginRight: "15px"}}>Answer</Button>
                    {review.review.author.username + " / " + review.review.lastEditDate}
                </CardFooter>
            </Card>
            {
				review.review.comments.map((comment) => (
					<Comment comment={comment}></Comment>
				))
			}
        </div>
    )
};
