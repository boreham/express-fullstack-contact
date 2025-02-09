import { ContactData } from '../services/contactService';

interface StoredContactData extends ContactData {
  id: number;
}

let contacts: StoredContactData[] = [];
let idCounter = 1;

const save = async (contactData: Omit<StoredContactData, 'id'>): Promise<StoredContactData> => {
  const newContact: StoredContactData = {
    id: idCounter++,
    ...contactData,
  };
  contacts.push(newContact);
  return newContact;
};

export default {
  save,
};
