import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import {
  Heading,
  Box,
  Center,
  UnorderedList,
  ListItem,
  Flex,
} from "@chakra-ui/react";

type Routes = {
  text: string;
  route: string;
};

const Home: NextPage = () => {
  const routesArr: Routes[] = [
    { text: "Bill Reminder", route: "bill-reminder" },
  ];

  return (
    <div>
      <Head>
        <title>NextJS and Chakra UI starter kit</title>
        <meta
          name="description"
          content="This is a starter kit for NextJS and Chakra UI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Center>
          <Heading
            role="heading"
            as="h1"
            color="white"
            borderRadius={4}
            mt={8}
            p={4}
            bg="black"
          >
            Hackathon ADHD Tax
          </Heading>
        </Center>
        <Center>
          <UnorderedList mt={8} listStyleType="none">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              {routesArr.map(({ route, text }) => (
                <ListItem
                  key={route}
                  fontSize="2xl"
                  textDecoration="underline"
                  color="black"
                >
                  <Link href={route}>{text}</Link>
                </ListItem>
              ))}
            </Flex>
          </UnorderedList>
        </Center>
      </Box>
    </div>
  );
};

export default Home;
