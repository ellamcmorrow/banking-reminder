import {
  Box,
  Heading,
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Select,
  Checkbox,
  Text,
  useToast,
  Flex,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";

type Reminder = {
  title: string;
  date: string;
  category: string;
  type: string; // Bill or Subscription
  recurring: boolean; // Monthly Recurring
};

export default function ReminderPage() {
  const [reminder, setReminder] = useState<Reminder>({
    title: "",
    date: "",
    category: "",
    type: "Bill", // Default to Bill
    recurring: false,
  });

  const [remindersList, setRemindersList] = useState<Reminder[]>([]);
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setReminder((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
    setReminder({ title: "", date: "", category: "", type: "Bill", recurring: false });

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

      <Box bg="white" mt={6} p={6} border="1px solid black" borderRadius="none" boxShadow="sm">
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
              borderRadius="none"
              _hover={{
                borderColor: "black",
              }}
              _focus={{
                borderColor: "black",
                bg: "black",
                color: "white",
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Reminder Date</FormLabel>
            <Input
              name="date"
              type="date"
              value={reminder.date}
              onChange={handleChange}
              borderRadius="none"
              _hover={{
                borderColor: "black",
              }}
              _focus={{
                borderColor: "black",
                bg: "black",
                color: "white",
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Category</FormLabel>
            <Select
              name="category"
              value={reminder.category}
              onChange={handleChange}
              placeholder="Select category"
              borderRadius="none"
              _hover={{
                borderColor: "black",
              }}
              _focus={{
                borderColor: "black",
                bg: "black",
                color: "white",
              }}
            >
              <option value="Bills">Bills</option>
              <option value="Savings">Savings</option>
              <option value="Investments">Investments</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Type</FormLabel>
            <Select
              name="type"
              value={reminder.type}
              onChange={handleChange}
              borderRadius="none"
              _hover={{
                borderColor: "black",
              }}
              _focus={{
                borderColor: "black",
                bg: "black",
                color: "white",
              }}
            >
              <option value="Bill">Bill</option>
              <option value="Subscription">Subscription</option>
            </Select>
          </FormControl>

          <FormControl>
            <Checkbox
              name="recurring"
              isChecked={reminder.recurring}
              onChange={handleChange}
              colorScheme="blackAlpha"
            >
              Set as recurring monthly
            </Checkbox>
          </FormControl>

          <Button
            colorScheme="green"
            onClick={handleAddReminder}
            w="full"
            bg="black"
            color="white"
            borderRadius="none"
            _hover={{
              bg: "white",
              color: "black",
              border: "1px solid black",
            }}
            _active={{
              bg: "gray.800",
              color: "white",
            }}
          >
            Add Reminder
          </Button>
        </VStack>
      </Box>

      <Box bg="white" mt={6} p={6} border="1px solid black" borderRadius="none" boxShadow="sm">
        <Heading size="md" mb={4}>
          Your Reminders
        </Heading>
        {remindersList.length > 0 ? (
          <SimpleGrid columns={1} spacing={4}>
            {remindersList.map((r, index) => (
              <Box
                key={index}
                p={4}
                border="1px solid black"
                bg="gray.50"
                borderRadius="none"
                _hover={{
                  bg: "black",
                  color: "white",
                }}
              >
                <Text fontWeight="bold">Title: {r.title}</Text>
                <Text>Date: {r.date}</Text>
                <Text>Category: {r.category}</Text>
                <Text>Type: {r.type === "Bill" ? "Bill" : "Subscription"}</Text>
                <Text>Recurring: {r.recurring ? "Yes" : "No"}</Text>
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
