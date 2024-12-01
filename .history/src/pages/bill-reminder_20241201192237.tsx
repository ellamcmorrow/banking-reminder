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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Checkbox,
} from "@chakra-ui/react";
import { useState, useRef } from "react";

type Reminder = {
  title: string;
  date: string;
  category: string;
  isRecurring: boolean;
  frequency?: string; // Daily, Weekly, Monthly, etc.
};

type Transaction = {
  id: number;
  name: string;
  amount: string;
  date: string;
  category: string; // E.g., Bills, Subscriptions, etc.
};

export default function ReminderPage() {
  const [reminder, setReminder] = useState<Reminder>({
    title: "",
    date: "",
    category: "",
    isRecurring: false,
    frequency: "",
  });
  const [remindersList, setRemindersList] = useState<Reminder[]>([]);
  const [transactions] = useState<Transaction[]>([
    { id: 1, name: "Netflix", amount: "-£9.99", date: "2024-12-01", category: "Subscription" },
    { id: 2, name: "Water Bill", amount: "-£20.50", date: "2024-12-01", category: "Bills" },
    { id: 3, name: "Spotify", amount: "-£7.99", date: "2024-12-01", category: "Subscription" },
    { id: 4, name: "Electricity Bill", amount: "-£50.00", date: "2024-12-01", category: "Bills" },
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setReminder({
      title: transaction.name,
      date: transaction.date,
      category: transaction.category,
      isRecurring: false,
      frequency: "",
    });
    onOpen();
  };

  const handleReminderChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLInputElement>
  ) => {
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
    onClose();

    toast({
      title: "Success",
      description: "Reminder added successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box bg="black" minH="100vh" p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={4} color="white">
        <Heading size="lg">Banking App</Heading>
        <Text fontSize="md" color="white">
          Balance: £4000
        </Text>
      </Flex>

      {/* Transactions List */}
      <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
        <Heading size="md" mb={4}>
          Transactions
        </Heading>
        <Divider />
        {transactions.map((transaction) => (
          <HStack
            key={transaction.id}
            justifyContent="space-between"
            py={3}
            cursor="pointer"
            onClick={() => handleTransactionClick(transaction)}
          >
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

      {/* Reminders List */}
      <Box bg="white" mt={6} p={6} borderRadius="lg" boxShadow="sm">
        <Heading size="md" mb={4}>
          Your Reminders
        </Heading>
        {remindersList.length > 0 ? (
          <SimpleGrid columns={1} spacing={4}>
            {remindersList.map((r, index) => (
              <Box key={index} p={4} borderWidth={1} borderRadius="lg" bg="gray.50">
                <Text fontWeight="bold">{r.title}</Text>
                <Text>Date: {r.date}</Text>
                <Text>Category: {r.category}</Text>
                <Text>
                  {r.isRecurring
                    ? `Recurring: ${r.frequency}`
                    : "One-time reminder"}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Text>No reminders added yet.</Text>
        )}
      </Box>

      {/* Reminder Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Set a Reminder
            </AlertDialogHeader>
            <AlertDialogBody>
              <FormControl mb={4}>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  value={reminder.title}
                  onChange={handleReminderChange}
                  placeholder="Reminder Title"
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Date</FormLabel>
                <Input
                  name="date"
                  type="date"
                  value={reminder.date}
                  onChange={handleReminderChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <Checkbox
                  name="isRecurring"
                  isChecked={reminder.isRecurring}
                  onChange={handleReminderChange}
                >
                  Recurring Reminder
                </Checkbox>
              </FormControl>
              {reminder.isRecurring && (
                <FormControl mb={4}>
                  <FormLabel>Frequency</FormLabel>
                  <Select
                    name="frequency"
                    value={reminder.frequency}
                    onChange={handleReminderChange}
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </Select>
                </FormControl>
              )}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={handleAddReminder} ml={3}>
                Save Reminder
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
