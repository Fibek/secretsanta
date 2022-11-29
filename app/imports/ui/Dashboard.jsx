import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, {useState} from 'react'
import { Formik, Field, useFormik } from "formik";
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
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Text,
  Card, CardHeader, CardBody, CardFooter, Divider
} from "@chakra-ui/react";
import { MdOutlineLogout } from 'react-icons/md'

export default Dashboard = () => {
  Meteor.subscribe('userPickedPerson');
  Meteor.subscribe('userOwnNote');
  Meteor.subscribe('userReadNote');
  const user = useTracker(() => Meteor.user());
  const { isOpen, onOpen, onClose} = useDisclosure();
  const cancelRef = React.useRef()
  const pickedPersonNote = 'alalal';
  console.log(pickedPersonNote);

  return( 
    <Flex align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={800}>
	<Flex p={4}>
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
	<Tabs size='lg' isFitted variant='enclosed'>
	  <TabList mb='1em' size='sm'>
  	    <Tab>Wylosuj</Tab>
  	    <Tab>O sobie</Tab>
  	  </TabList>
  	  <TabPanels>
  	    <TabPanel>
	      <VStack>	
		{user.pickedPerson ? 
		<>
		  <Heading size='lg' p={6}>
		    Wylosowano: { user.pickedPerson }!
		  </Heading>
		  {!pickedPersonNote ?
		    <Heading size='md'>
		      List od tej osoby nie dotarł do Św. Mikołaja 🎅
		    </Heading>
		    :
		    <>
		      <Card>
			<CardHeader>
			  <Heading size='md'> List do Św. Mikołaja 🎅  </Heading>
			</CardHeader>
			<Divider/>
		        <CardBody>
		          <Text fontSize='2xl'>
		            {pickedPersonNote}
		          </Text>
		        </CardBody>
			<Divider/>
			<CardFooter>
			  <Heading size='md'> Od: {user.pickedPerson} </Heading>
			</CardFooter>
		      </Card>
		    </>
		  }
		</>
		  :
		<>
		<Heading size='md' p={6}>
		  Jeszcze nie wylosowałeś nikogo, kliknij przycisk poniżej!
		</Heading>
	      	<Button colorScheme='green' size='lg' 
		  onClick={()=>{Meteor.call('pickPerson'); console.log(user.pickedPerson)}}> 
		  Wylosuj! 
		</Button>
		</>
		}
	      </VStack>
  	    </TabPanel>
  	    <TabPanel>
	      <Formik
		initialValues={{
      	          note:	user.note,
      	        }}
      	        onSubmit={(values) => {
		  Meteor.call('saveNote', values.note);
      	        }}
	      >
      	      {({ handleSubmit, errors, touched }) => (
      	        <form onSubmit={handleSubmit}>
      	          <VStack>
      	            <FormControl>
      	              <Field
			as={Textarea}
      	                id="note"
      	                name="note"
      	                type="text"
			size='lg'
			placeholder="Jeśli chcesz, tutaj możesz zostawić list do Św. Mikołaja🎅"
      	                variant="filled"
      	              />
      	            </FormControl>
      	            <Button type="submit" colorScheme="green">
		      Wyślij
      	            </Button>
      	          </VStack>
      	        </form>
      	      )}
      	      </Formik>
  	    </TabPanel>
  	  </TabPanels>
	</Tabs>
      </Box>
    </Flex>
  );
};
