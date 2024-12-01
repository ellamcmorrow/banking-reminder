import {
  Box,
  Flex,
  Heading,
  Text,
  Divider,
  HStack,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const transactions = [
  { id: 1, name: "Netflix", amount: "-£9.99", date: "2024-12-01" },
  { id: 2, name: "Water Bill", amount: "-£20.50", date: "2024-12-01" },
];

export default function BankAccount() {
  const navigate = useNavigate();

  return (
    <Box bg="black" minH="100vh" p={6}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        color="white"
      >
        <Heading size="lg">Bank Account</Heading>
        <Text fontSize="md" color="white">
          Balance: £4000
        </Text>
      </Flex>
      <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
        <Heading size="md" mb={4}>
          Transactions
        </Heading>
        <Divider />
        {transactions.map((transaction) => (
          <HStack key={transaction.id} justifyContent="space-between" py={3}>
            <HStack>
              <Icon boxSize={5} color="black" />
              <Text fontWeight="bold">{transaction.name}</Text>
            </HStack>
            <Text color="black" fontWeight="bold">
              {transaction.amount}
            </Text>
          </HStack>
        ))}
      </Box>
      <Button colorScheme="teal" mt={6} onClick={() => navigate("/bills")}>
        Manage Bills
      </Button>
    </Box>
  );
}
