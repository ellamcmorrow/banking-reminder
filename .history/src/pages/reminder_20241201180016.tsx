import {
  Box,
  Heading,
  VStack,
  HStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Select,
  Text,
  useToast,
  Flex,
  Divider,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import { FiClock } from "react-icons/fi";
import { useState } from "react";

type Reminder = {
  title: string;
  date: string;
  category: string;
};

type Transaction = {
  id: number;
  name: string;
  amount: string;
  date: string;
};

export default function ReminderPage() {
  const [reminder, setReminder] = useState<Reminder>({
    title: "",
    date: "",
    category: "",
  });
  const [remindersList, setRemindersList] = useState<Reminder[]>([]);
  const [transactions] = useState<Transaction[]>([
    { id: 1, name: "Amazon UK", amount: "-£11.29", date: "2024-12-01" },
    { id: 2, name: "Sainsbury's Catford", amount: "-£2.10", date: "2024-12-01" },
    { id: 3, name: "Bake with Monia", amount: "-£3.50", date: "2024-12-01" },
    { id: 4, name: "Amazon Marketplace", amount: "-£9.98", date: "2024-12-01" },
  ]);

  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReminder((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddReminder = () => {
    if (!reminder.title || !reminder.date || !reminder.category) {
      toast({
        title: "Error",
        description: "All fields are required!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setRemindersList((prev) => [...prev, reminder]);
    setReminder({ title: "", date: "", category: "" });

    toast({
      title: "Success",
      description: "Reminder added successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box bg="gray.100" minH="100vh" p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="lg">Banking App</Heading>
        <Text fontSize="md" color="gray.600">
          Balance: £8,011.02
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
              <Icon as={FiClock} boxSize={5} color="gray.500" />
              <Text fontWeight="bold">{transaction.name}</Text>
            </HStack>
            <Text color="red.500" fontWeight="bold">
              {transaction.amount}
            </Text>
          </HStack>
        ))}
      </Box>

      <Box bg="white" mt={6} p={6} borderRadius="lg" boxShadow="sm">
        <Heading size="md" mb={4}>
          Set a Reminder
        </Heading>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Reminder Title</FormLabel>
            <Input
              name="title"
              value={reminder.title}
              onChange={handleChange}
              placeholder="e.g., Pay Electricity Bill"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Reminder Date</FormLabel>
            <Input
              name="date"
              type="date"
              value={reminder.date}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Select
              name="category"
              value={reminder.category}
              onChange={handleChange}
              placeholder="Select category"
            >
              <option value="Bills">Bills</option>
              <option value="Savings">Savings</option>
              <option value="Investments">Investments</option>
            </Select>
          </FormControl>
          <Button colorScheme="green" onClick={handleAddReminder} w="full">
            Add Reminder
          </Button>
        </VStack>
      </Box>

      <Box bg="white" mt={6} p={6} borderRadius="lg" boxShadow="sm">
        <Heading size="md" mb={4}>
          Your Reminders
        </Heading>
        {remindersList.length > 0 ? (
          <SimpleGrid columns={1} spacing={4}>
            {remindersList.map((r, index) => (
              <Box
                key={index}
                p={4}
                borderWidth={1}
                borderRadius="lg"
                bg="gray.50"
              >
                <Text fontWeight="bold">{r.title}</Text>
                <Text>Date: {r.date}</Text>
                <Text>Category: {r.category}</Text>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Text>No reminders added yet.</Text>
        )}
      </Box>
    </Box>
  );
}
