import {Card, CardBody, CardFooter, Button} from "reactstrap"

export default function Comment(comment) {

    function logComment() {
        console.log("hello guys, it works - ", comment.comment.lastEditDate)
    }
      
    return(
        <Card style={{marginLeft: "50px", marginTop: "5px"}}>
            {logComment()}
            <CardBody>
                {comment.comment.comment}
            </CardBody>
            <CardFooter style={{textAlign: "end"}}>
            <Button color="warning" style={{marginRight: "15px"}}>Answer</Button>
                {comment.comment.author.username + " / " + comment.comment.lastEditDate}
            </CardFooter>
        </Card>
    )
};
