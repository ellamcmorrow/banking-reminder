import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

const reminders = [
  {
    title: "Pay Netflix Subscription",
    date: "2024-12-05",
    isRecurring: true,
    frequency: "Monthly",
  },
  {
    title: "Pay Water Bill",
    date: "2024-12-10",
    isRecurring: false,
  },
];

export default function RemindersPage() {
  return (
    <Box bg="white" p={6} minH="100vh">
      <Heading size="md" mb={4}>
        Your Reminders
      </Heading>
      <SimpleGrid columns={1} spacing={4}>
        {reminders.map((r, index) => (
          <Box key={index} p={4} borderWidth={1} borderRadius="lg" bg="gray.50">
            <Text fontWeight="bold">{r.title}</Text>
            <Text>Date: {r.date}</Text>
            <Text>
              {r.isRecurring
                ? `Recurring: ${r.frequency}`
                : "One-time Reminder"}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      {/* ADHD-friendly Alerts */}
      {reminders.map((r, index) => (
        <Alert key={index} status="info" mt={4}>
          <AlertIcon />
          Reminder Alert: {r.title} on {r.date}.
        </Alert>
      ))}
    </Box>
  );
}
