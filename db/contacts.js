import fs from "fs/promises";
import path from "path";
import { ObjectId } from 'bson';
// Шлях до тимчасової бази даних
const contactsPath = path.resolve("db", "contacts.json");

const allContacts = async () => {
    const buffer = await fs.readFile(contactsPath);
    return JSON.parse(buffer)
};

const getContactById = async (id) => {
    const contacts = await allContacts();
    const result = await contacts.find(contact => contact.id === id);
    return result || null;
};

const addNewContact = async (data) => {
    const contacts = await allContacts();
    const newContact = {
        id: new ObjectId(),
        ...data
    }
    contacts.push(newContact)
    return await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
};

const updateOneContact = async (id, data) => {
    const contacts = await allContacts();
    const result = await contacts.findIndex(contact => contact.id === id);
    if (result === -1) {
        return null
    };
    contacts[result] = { id, ...data }
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return contacts[result]
};

const removeContact = async (id) => {
    const contacts = await allContacts();
    const resultIndex = await contacts.findIndex(contact => contact.id === id);
    if (resultIndex === -1) {
        return null
    };
    const deleteContact = contacts.splice(resultIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deleteContact
};

export {
    allContacts,
    getContactById,
    addNewContact,
    updateOneContact,
    removeContact
}