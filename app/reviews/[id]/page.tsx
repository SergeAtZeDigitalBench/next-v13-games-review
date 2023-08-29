import React from 'react'

const toSentenceCase = (paramStringValue: string) => paramStringValue.split("-").map((current) => current.charAt(0).toUpperCase() + current.slice(1)
).join(" ")


interface IProps {
    [x: string]: unknown;
    params: { id: string }
}

const ReviewDetailsPage = ({ params }: IProps): JSX.Element => {
    const title = toSentenceCase(params.id)

    return (
        <div>
            <h1>{title}</h1>
            <p>About game ID: {params.id}</p>
        </div>
    )
}

export default ReviewDetailsPage