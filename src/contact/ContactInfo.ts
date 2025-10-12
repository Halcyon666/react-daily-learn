export default interface ContactInfo {
  id: string;
  img: string;
  imgAlt: string;
  name: string;
  phoneNumber: string;
  email: string;
}

import mrWhiskerson from "./images/mr-whiskerson.png";
import fluffykins from "./images/fluffykins.png";
import felix from "./images/felix.png";
import pumpkin from "./images/pumpkin.png";

export const contacts: ContactInfo[] = [
  {
    id: "mr-whiskerson",
    img: mrWhiskerson,
    imgAlt: "Photo of Mr. Whiskerson",
    name: "Mr. Whiskerson",
    phoneNumber: "(212) 555-1234",
    email: "mr.whiskaz@catnap.meow",
  },
  {
    id: "fluffykins",
    img: fluffykins,
    imgAlt: "Photo of Fluffykins",
    name: "Fluffykins",
    phoneNumber: "(212) 555-2345",
    email: "fluff@me.com",
  },
  {
    id: "felix",
    img: felix,
    imgAlt: "Photo of Felix",
    name: "Felix",
    phoneNumber: "(212) 555-4567",
    email: "thecat@hotmail.com",
  },
  {
    id: "pumpkin",
    img: pumpkin,
    imgAlt: "Photo of Pumpkin",
    name: "Pumpkin",
    phoneNumber: "(0800) CAT KING",
    email: "pumpkin@scrimba.com",
  },
];
