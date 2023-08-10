import { Card, CardBody, CardFooter } from "reactstrap";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import EditReview from "./EditReview";
import Answer from "./Answer";

export default function Review(args) {

    const currentUser = useSelector((state) => state.currentUserReducer);

    function isCurrentUserAuthor(author) {
        if(author === currentUser.user.username) {
            console.log("current user is the author")
            return "visible"
        }
        console.log("current user is NOT the author")
        return "hidden"
    }
    
    return(
        <div style={{marginTop: "5px"}}>
            {
                console.log("REVIEW ID: ", args.review.id)
            }
            <Card>
                <CardBody>
                    {args.review.review}
                </CardBody>
                <CardFooter style={{textAlign: "end", display: "flex", flexDirection: "row-reverse"}}>
                    {args.review.author.username + " / " + args.review.lastEditDate}
                    <Answer answerTo={args.review.author.username}/>
                    <EditReview visibility = {isCurrentUserAuthor(args.review.author.username)} review = {args.review.review} reviewId = {args.review.id} refreshMovieDetails = {args.refreshMovieDetails}/>
                </CardFooter>
            </Card>
            {
				args.review.comments.map((comment) => (
					<Comment comment={comment} refreshMovieDetails={args.refreshMovieDetails}></Comment>
				))
			}
        </div>
    )
};
