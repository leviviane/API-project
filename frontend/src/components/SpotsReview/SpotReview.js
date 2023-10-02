import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReviewsThunk } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import PostReview from './PostReview';
import DeleteReview from './DeleteReview';
import './SpotReview.css';

export const SpotReview = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.singleSpot);
  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews.spot.Reviews);
  const [isLoaded, setIsLoaded] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    dispatch(getReviewsThunk(spotId)).then(() => setIsLoaded(true));
  }, [dispatch, spotId]);

  const createDate = (date) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const newDate = new Date(date);
    const month = months[newDate.getMonth()];
    const year = newDate.getFullYear();

    return `${month} ${year}`;
  };


  const sortedReviews = Array.isArray(reviews)
    ? [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  const handleReviewSubmitted = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return isLoaded && (
    <div key={key}>
      <div>
        {console.log(sortedReviews, 'reviews!!!!')}
        {sortedReviews.length ? (
          <div>
            <div className="star-review-container">
              <i className="fa-solid fa-star"></i>
              {Number(spot.avgStarRating).toFixed(1)} · {spot.numReviews}{" "}
              {spot.numReviews > 1 ? 'Reviews' : 'Review'}
              <div className="post-button">
                {user && !sortedReviews.find((review) => review.userId === user.id) && spot.ownerId !== user?.id && (
                  <OpenModalButton
                    buttonText="Post Your Review"
                    modalComponent={<PostReview spot={spot} user={user} onReviewSubmitted={handleReviewSubmitted} />}
                  />
                )}
              </div>
            </div>
            {sortedReviews.map((review) => (
              <div key={review.id}>
                <div className="review-container">
                  <h3 className="user-name">{review?.User?.firstName}</h3>
                  <h4 className="review-date">{createDate(review.createdAt)}</h4>
                  <p className="review-description">{review.review}</p>

                  <div className="delete-button">
                    {review.userId === user?.id && (
                      <OpenModalButton
                        buttonText="Delete"
                        modalComponent={
                          <DeleteReview reviewId={review.id} spotId={spot.id} />
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="new-container">
              <i className="fa-solid fa-star"></i>
              New
              <div className="post-review-button">
                {user && !sortedReviews.find((review) => review.userId === user.id) && spot.ownerId !== user?.id && (
                  <OpenModalButton
                    buttonText="Post Your Review"
                    modalComponent={<PostReview spot={spot} user={user} onReviewSubmitted={handleReviewSubmitted} />}
                  />
                )}
              </div>
            </div>
            {user && !sortedReviews.find((review) => review.userId === user.id) && spot.ownerId !== user?.id && (
              <h3 className="be-the-first-text">
                Be the first to post a review!
              </h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotReview;



// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getReviewsThunk } from '../../store/reviews';
// import OpenModalButton from "../OpenModalButton";
// import PostReview from './PostReview';
// import DeleteReview from './DeleteReview';
// import './SpotReview.css';

// export const SpotReview = () => {
//     const dispatch = useDispatch();
//     const { spotId } = useParams();
//     const spot = useSelector((state) => state.spots.singleSpot);
//     //getting single spot from spot store
//     const user = useSelector((state) => state.session.user);
//     //getting user from session store
//     const reviews = useSelector((state) => state.reviews.spot.Reviews);
//     // console.log(reviews)
//     const [isLoaded, setIsLoaded] = useState(false);
// ;
//     useEffect(() => {
//         dispatch(getReviewsThunk(spotId)).then(() => setIsLoaded(true))
//     }, [dispatch, spotId, reviews]);

//     // if (!reviews[spots]) {
//     //     return null;
//     // };

//     // const listOfReviews = Object.values(reviews.Reviews).reverse()
//     const listOfReviews = reviews
//     if (!listOfReviews) {
//       return null;
//     }
//     //organizing reviews in descending order

//     const listOfReviewsArray = Object.values(listOfReviews);
//     const previousReviews = user && listOfReviewsArray.find((review) => review.userId === user.id);


//     const { avgStarRating, numReviews } = spot;

//     const createDate = (date) => {
//         const months = [
//           'January',
//           'February',
//           'March',
//           'April',
//           'May',
//           'June',
//           'July',
//           'August',
//           'September',
//           'October',
//           'November',
//           'December'
//         ];

//         const newDate = new Date(date);
//         const month = months[newDate.getMonth()];
//         const year = newDate.getFullYear();

//         return `${month} ${year}`;
//       };

//       return isLoaded && (
//         <div>
//           <div>
//             {console.log(listOfReviews, 'reviews!!!!')}
//              {listOfReviews.length ? (
//               <div>
//                 <div className="star-review-container">
//                   <i className="fa-solid fa-star"></i>
//                   {Number(avgStarRating).toFixed(1)} · {numReviews}{" "}
//                   {numReviews > 1 ? "Reviews" : "Review"}
//                   <div className="post-button">
//                     {user && !previousReviews && spot.ownerId !== user?.id && (
//                       <OpenModalButton
//                         buttonText="Post Your Review"
//                         modalComponent={
//                           <PostReview spot={spot} user={user} />
//                         }
//                       />
//                     )}
//                   </div>
//                 </div>

//                 {listOfReviews.map((review) => (
//                   <div key={review.id}>
//                     <div className="review-container">
//                       <h3 className="user-name">{review?.User?.firstName}</h3>
//                       <h4 className="review-date">
//                         {createDate(review.createdAt)}
//                       </h4>
//                       <p className="review-description">{review.review}</p>

//                       <div className="delete-button">
//                         {review.userId === user?.id && (
//                           <OpenModalButton
//                             buttonText="Delete"
//                             modalComponent={
//                               <DeleteReview
//                                 reviewId={review.id}
//                                 spotId={spot.id}
//                               />
//                             }
//                           />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div>
//                 <div className="new-container">
//                   <i className="fa-solid fa-star"></i>
//                   New
//                   <div className="post-review-button">
//                     {user && !previousReviews && spot.ownerId !== user?.id && (
//                       <OpenModalButton
//                         buttonText="Post Your Review"
//                         modalComponent={
//                           <PostReview spot={spot} user={user} />
//                         }
//                       />
//                     )}
//                   </div>
//                 </div>

//                 {user && !previousReviews && spot.ownerId !== user?.id && (
//                   <h3 className="be-the-first-text">
//                     Be the first to post a review!
//                   </h3>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       );
//     };

// export default SpotReview;


// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getReviewsThunk } from '../../store/reviews';
// import OpenModalButton from '../OpenModalButton';
// import PostReview from './PostReview';
// import DeleteReview from './DeleteReview';
// import './SpotReview.css';

// export const SpotReview = () => {
//   const dispatch = useDispatch();
//   const { spotId } = useParams();
//   const spot = useSelector((state) => state.spots.singleSpot);
//   const user = useSelector((state) => state.session.user);
//   const reviews = useSelector((state) => state.reviews.spot.Reviews);
//   const [isLoaded, setIsLoaded] = useState(false);

//   // State to force component re-render
//   const [key, setKey] = useState(0);

//   useEffect(() => {
//     dispatch(getReviewsThunk(spotId)).then(() => setIsLoaded(true));
//   }, [dispatch, spotId]);

//   const createDate = (date) => {
//     const months = [
//       'January',
//       'February',
//       'March',
//       'April',
//       'May',
//       'June',
//       'July',
//       'August',
//       'September',
//       'October',
//       'November',
//       'December',
//     ];

//     const newDate = new Date(date);
//     const month = months[newDate.getMonth()];
//     const year = newDate.getFullYear();

//     return `${month} ${year}`;
//   };

//   // Sort the reviews by createdAt in descending order
//   const sortedReviews = Array.isArray(reviews)
//     ? [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     : [];

//   // Function to handle review submission and trigger re-render
//   const handleReviewSubmitted = () => {
//     // Your logic to submit the review here

//     // Increment the key to trigger a re-render
//     setKey((prevKey) => prevKey + 1);
//   };

//   return isLoaded && (
//     <div key={key}>
//       <div>
//         {console.log(sortedReviews, 'reviews!!!!')}
//         {sortedReviews.length ? (
//           <div>
//             <div className="star-review-container">
//               <i className="fa-solid fa-star"></i>
//               {Number(spot.avgStarRating).toFixed(1)} · {spot.numReviews}{" "}
//               {spot.numReviews > 1 ? 'Reviews' : 'Review'}
//               <div className="post-button">
//                 {user && !sortedReviews.find((review) => review.userId === user.id) && spot.ownerId !== user?.id && (
//                   <OpenModalButton
//                     buttonText="Post Your Review"
//                     modalComponent={<PostReview spot={spot} user={user} onReviewSubmitted={handleReviewSubmitted} />}
//                   />
//                 )}
//               </div>
//             </div>
//             {sortedReviews.map((review) => (
//               <div key={review.id}>
//                 <div className="review-container">
//                   <h3 className="user-name">{review?.User?.firstName}</h3>
//                   <h4 className="review-date">{createDate(review.createdAt)}</h4>
//                   <p className="review-description">{review.review}</p>

//                   <div className="delete-button">
//                     {review.userId === user?.id && (
//                       <OpenModalButton
//                         buttonText="Delete"
//                         modalComponent={
//                           <DeleteReview reviewId={review.id} spotId={spot.id} />
//                         }
//                       />
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div>
//             <div className="new-container">
//               <i className="fa-solid fa-star"></i>
//               New
//               <div className="post-review-button">
//                 {user && !sortedReviews.find((review) => review.userId === user.id) && spot.ownerId !== user?.id && (
//                   <OpenModalButton
//                     buttonText="Post Your Review"
//                     modalComponent={<PostReview spot={spot} user={user} onReviewSubmitted={handleReviewSubmitted} />}
//                   />
//                 )}
//               </div>
//             </div>
//             {user && !sortedReviews.find((review) => review.userId === user.id) && spot.ownerId !== user?.id && (
//               <h3 className="be-the-first-text">
//                 Be the first to post a review!
//               </h3>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SpotReview;
