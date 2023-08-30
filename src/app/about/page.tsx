import React from "react";
import { Metadata } from "next";

import Heading from "@/components/Heading";

export const metadata: Metadata = {
  title: "About",
  description: "This application getting you the best indie games reviews",
};

const AboutPage = (): JSX.Element => {
  return (
    <>
      <Heading>About Page</Heading>
      <p>This is about us and this app page</p>
    </>
  );
};

export default AboutPage;
