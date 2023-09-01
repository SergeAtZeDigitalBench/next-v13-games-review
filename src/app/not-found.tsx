import React from "react";
import Image from "next/image";

import Heading from "@/components/Heading";

interface IProps {
  [x: string]: unknown;
}
//https://i.imgur.com/FOeYt4E.png
const NotFoundPage = ({}: IProps): JSX.Element => {
  return (
    <div className=" h-screen flex flex-col justify-center items-center">
      <Heading>Oups!...</Heading>
      <Image
        src="https://i.imgur.com/FOeYt4E.png"
        alt="oustrich"
        width={400}
        height={400}
        priority
      />
      <Heading>Not found</Heading>
      <p>We haven&rsquo;t found the page you have requested.</p>
    </div>
  );
};

export default NotFoundPage;
