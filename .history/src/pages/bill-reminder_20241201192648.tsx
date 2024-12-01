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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { FiClock } from "react-icons/fi";
import { useState } from "react";

type Reminder = {
  title: string;
  date: string;
  category: string;
};

type Payment = {
  id: number;
  name: string;
  amount: string;
  type: "Subscription" | "Bill";
  frequency: string;
};

export default function ReminderPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reminder, setReminder] = useState<Reminder>({
    title: "",
    date: "",
    category: "",
  });
  const [remindersList, setRemindersList] = useState<Reminder[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const [payments] = useState<Payment[]>([
    {
      id: 1,
      name: "Spotify",
      amount: "-£9.99",
      type: "Subscription",
      frequency: "Monthly",
    },
    {
      id: 2,
      name: "Netflix",
      amount: "-£15.99",
      type: "Subscription",
      frequency: "Monthly",
    },
    {
      id: 3,
      name: "Electricity Bill",
      amount: "-£50.00",
      type: "Bill",
      frequency: "Monthly",
    },
    {
      id: 4,
      name: "Water Bill",
      amount: "-£30.00",
      type: "Bill",
      frequency: "Quarterly",
    },
  ]);

  const toast = useToast();

  const handleSetReminder = () => {
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
    onClose();

    toast({
      title: "Success",
      description: "Reminder added successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleOpenDialog = (payment: Payment) => {
    setSelectedPayment(payment);
    setReminder({
      title: `Pay ${payment.name}`,
      date: "",
      category: payment.type,
    });
    onOpen();
  };

  return (
    <Box bg="grayLight" minH="100vh" p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="lg" color="black">
          Payments
        </Heading>
        <Text fontSize="md" color="black">
          Manage your subscriptions and bills
        </Text>
      </Flex>

      {/* Subscriptions and Bills */}
      <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
        <Heading size="md" mb={4} color="black">
          Subscriptions & Bills
        </Heading>
        <Divider borderColor="black" />
        {payments.map((payment) => (
          <HStack
            key={payment.id}
            justifyContent="space-between"
            py={3}
            borderBottom="1px solid"
            borderColor="black"
            cursor="pointer"
            onClick={() => handleOpenDialog(payment)}
            p={3}
          >
            <HStack>
              <Icon as={FiClock} boxSize={4} color="black" alignSelf={"flex-start"}/>
              <VStack align="start" spacing={0}>
                <Text fontWeight="bold" color="black">
                  {payment.name}
                </Text>
                <Text fontSize="sm" color="black">
                  {payment.type} ({payment.frequency})
                </Text>
              </VStack>
            </HStack>
            <Text color="black" fontWeight="bold">
              {payment.amount}
            </Text>
          </HStack>
        ))}
      </Box>

      {/* Reminder Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Set a Reminder</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={reminder.title}
                onChange={(e) =>
                  setReminder({ ...reminder, title: e.target.value })
                }
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                name="date"
                value={reminder.date}
                onChange={(e) =>
                  setReminder({ ...reminder, date: e.target.value })
                }
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Category</FormLabel>
              <Select
                name="category"
                value={reminder.category}
                onChange={(e) =>
                  setReminder({ ...reminder, category: e.target.value })
                }
              >
                <option value="Subscription">Subscription</option>
                <option value="Bill">Bill</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="greenDark"
              color="white"
              mr={3}
              onClick={handleSetReminder}
            >
              Set Reminder
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Reminders List */}
      <Box bg="white" mt={6} p={6} borderRadius="lg" boxShadow="sm">
        <Heading size="md" mb={4} color="black">
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
                bg="grayLight"
              >
                <Text fontWeight="bold" color="black">
                  {r.title}
                </Text>
                <Text color="black">Date: {r.date}</Text>
                <Text color="black">Category: {r.category}</Text>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Text color="black">No reminders added yet.</Text>
        )}
      </Box>
    </Box>
  );
}
