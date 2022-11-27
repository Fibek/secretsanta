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
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { MdOutlineLogout } from 'react-icons/md'

export default Dashboard = () => {
  const user = useTracker(() => Meteor.user());
  const { isOpen, onOpen, onClose} = useDisclosure();
  const cancelRef = React.useRef()

  return( 
    <Flex align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={800}>
	<Flex>
	  <Heading> Witaj, { user.profile.name }!  </Heading>
	  <Spacer />
	  <Button variant="ghost" onClick={onOpen}> 
	    <Icon as={MdOutlineLogout} w={12} h={12} />
	  </Button>
	  <AlertDialog
	    isOpen={isOpen}
      	    leastDestructiveRef={cancelRef}
      	    onClose={onClose}
	  >
      	  <AlertDialogOverlay>
      	    <AlertDialogContent>
      	      <AlertDialogHeader fontSize='lg' fontWeight='bold'>
      	        Wylogowanie
      	      </AlertDialogHeader>

      	      <AlertDialogBody>
      	        Czy napewno chcesz się wylogować?
      	      </AlertDialogBody>

      	      <AlertDialogFooter>
      	        <Button ref={cancelRef} onClick={onClose}>
      	          Nie
      	        </Button>
      	        <Button colorScheme='red' onClick={()=> Meteor.logout()} ml={3}>
		  Tak
      	        </Button>
      	      </AlertDialogFooter>
      	    </AlertDialogContent>
      	  </AlertDialogOverlay>
      	</AlertDialog>
        </Flex>

	<Textarea placeholder="Jesli chcesz, to wpisz tutaj wskazowki." />
	<Button> Zapisz </Button>
      </Box>
    </Flex>
  );
};
