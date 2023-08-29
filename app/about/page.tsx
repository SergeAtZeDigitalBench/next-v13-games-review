import React from 'react'

interface IProps {
    [x: string]: unknown;
}

const AboutPage = ({ }: IProps): JSX.Element => {
    return (
        <>
            <h1>About Page</h1>
            <p>This is about us and this app page</p>
        </>
    )
}

export default AboutPage