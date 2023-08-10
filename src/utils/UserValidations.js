function isCurrentUserAuthor(author, currentUser) {
    console.log("author: ", author, " - current user: ", currentUser)
    if(author === currentUser) {
        console.log("current user is the author")
        return "visible"
    }
    console.log("current user is NOT the author")
    return "hidden"
}

export default isCurrentUserAuthor;