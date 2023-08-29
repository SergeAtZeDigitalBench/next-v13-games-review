import React from 'react'

interface IProps {
    [x: string]: unknown;
}

const ReviewsPage = ({ }: IProps): JSX.Element => {
    return (
        <>
            <h1>Reviews Page</h1>
            <p>Here is the list of all reviews.</p>
        </>
    )
}

export default ReviewsPage