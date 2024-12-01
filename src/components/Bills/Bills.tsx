import {
    Box,
    Heading,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Select,
    Button,
    useToast,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { useRouter } from "next/router";
  
  export default function Bills() {
    const [reminder, setReminder] = useState({
      title: "",
      date: "",
      isRecurring: false,
      frequency: "",
    });
    const toast = useToast();
    const router = useRouter();
  
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setReminder((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    };
  
    const handleAddReminder = () => {
      if (!reminder.title || !reminder.date) {
        toast({
          title: "Error",
          description: "All fields are required!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
  
      toast({
        title: "Reminder Added!",
        description: "Your reminder has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
  
      router.push("/reminders"); // Navigate to the reminders page
    };
  
    return (
      <Box bg="white" p={6} minH="100vh">
        <Heading size="md" mb={4}>
          Set a Reminder
        </Heading>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Reminder Title</FormLabel>
            <Input
              name="title"
              placeholder="e.g., Pay Electricity Bill"
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input name="date" type="date" onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <Checkbox
              name="isRecurring"
              onChange={handleInputChange}
              isChecked={reminder.isRecurring}
            >
              Recurring
            </Checkbox>
          </FormControl>
          {reminder.isRecurring && (
            <FormControl>
              <FormLabel>Frequency</FormLabel>
              <Select name="frequency" onChange={handleInputChange}>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </Select>
            </FormControl>
          )}
          <Button colorScheme="teal" onClick={handleAddReminder}>
            Save Reminder
          </Button>
        </VStack>
      </Box>
    );
  }
  