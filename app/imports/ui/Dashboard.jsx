import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, {useState} from 'react'
import { useFormik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Link,
  Heading,
  Spacer,
  Icon,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { BiUserCircle } from 'react-icons/bi'
import { MdOutlineLogout } from 'react-icons/md'

export default Dashboard = () => {
  const user = useTracker(() => Meteor.user());
  const { isOpen, onOpen, onClose} = useDisclosure();

  return( 
    <Flex align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={800}>
	<Flex>
	  <Heading> Witaj, { user.username }!  </Heading>
	  <Spacer />
	  <Button variant="ghost" onClick={onOpen}> 
	    <Icon as={BiUserCircle} w={12} h={12} />
	  </Button>
	  <Button variant="ghost" onClick={onOpen}> 
	    <Icon as={MdOutlineLogout} w={12} h={12} />
	  </Button>
	  <Modal isOpen={isOpen} onClose={onClose} isCentered>
	    <ModalOverlay />
	    <ModalContent>
	      <ModalHeader>Czy napewno chcesz się wylogować?</ModalHeader>
	      <ModalCloseButton />
	      <ModalFooter>
		<Button colorScheme='blue' mr={3} onClick={onClose}>
		  Nie
            	</Button>
		<Button colorScheme='blue' mr={3} onClick={()=>Meteor.logout()}>
		  Tak
            	</Button>
	      </ModalFooter>
	    </ModalContent>
	  </Modal>
        </Flex>

	<Textarea placeholder="Jesli chcesz, to wpisz tutaj wskazowki." />
	<Button> Zapisz </Button>
      </Box>
    </Flex>
  );
};
