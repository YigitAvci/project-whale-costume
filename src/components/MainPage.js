import { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	Button,
	Container,
	Navbar,
	NavbarBrand,
	Row,
	Col,
	ListGroup,
	ListGroupItem,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
} from "reactstrap";
import Comment from "./Comment";
import { FcViewDetails } from "react-icons/fc";
import Review from "./Review";

export default function MainPage() {
	const [movies, setMovies] = useState([]);
	const authToken = useSelector((state) => state.authReducer);
	const [movie, setMovie] = useState({});
	const [reviews, setReviews] = useState([]);
	const [comments, setComments] = useState([]);

	async function getMovies() {
		console.log("token: ", authToken);
		await fetch("http://localhost:8080/movies/findAllMovies", {
			method: "GET",
			headers: { "Content-Type": "application/json", Authorization: authToken },
		})
			.then((response) => response.json())
			.then((data) => {
				setMovies(data.data);
				console.log(data.data);
			});
	}

	async function getMovieDetails(movie) {
		console.log("getting movie details...");
		console.log("movie: ", movie);
		setMovie(movie);

		await fetch(
			"http://localhost:8080/reviews/reviewsByMovieId?movieId=" + movie.id,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: authToken,
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log("*reviews: ", data.data);
				setReviews(data.data);
			});
	}

	/*async function getCommentsByReview(review) {
		console.log("review is: ", review)
		await fetch("http://localhost:8080/reviews/by-review-id?reviewId=" + review.id, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: authToken,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("comments: ", data.data);
				setComments(data.data)
			});
	}*/

	return (
		<div>
			<Row>
				<Col xs="3">
					<Button onClick={getMovies}>get movies</Button>
				</Col>
				<Col xs="9">
					<ListGroup>
						{movies.map((movie) => (
							<ListGroupItem
								style={{ display: "flex", justifyContent: "space-between" }}
								key={movie.id}
							>
								{movie.name}
								<Button
									onClick={() => {
										getMovieDetails(movie);
									}}
								>
									view
								</Button>
							</ListGroupItem>
						))}
					</ListGroup>
				</Col>
			</Row>
			<br></br>
			<Row>
				{movie != null && reviews.length > 0 && (
					<Card>
						<CardHeader style={{ fontWeight: "bold" }}>{movie.name}</CardHeader>
						{reviews.map((review) => (
							<Review review={review}></Review>
						))}
						{console.log("first review: ", reviews[0])}
					</Card>
				)}
			</Row>
		</div>
	);
}
