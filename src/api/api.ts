import axios from "axios";
import { generateUsers } from '../data/users';

export const GOTService = () => {

  const getUsers = async (page?: string, rows?: string) => {
    const response = new Promise((resolve, reject) => resolve(generateUsers())
    );
    return response;
  };

  const getBooks = async (page?: string, rows?: string) => {
    const response = await axios.get(
      `https://anapioficeandfire.com/api/books?page=${page}&pageSize=${rows}`,
    );
    return response.data;
  };

  const getHouses = async (page?: string, rows?: string) => {
    const response = await axios.get(
      `https://anapioficeandfire.com/api/houses?page=${page}&pageSize=${rows}`,
    );
    return response.data;
  };

  const getCharacters = async (page?: string, rows?: string) => {
    const response = await axios.get(
      `https://anapioficeandfire.com/api/characters?page=${page}&pageSize=${rows}`,
    );
    return response.data;
  };

  const getCharacterPictures = async (page?: string, rows?: string) => {
    const response = await axios.get(
      `https://thronesapi.com/api/v2/characters`,
    );
    return response.data;
  };

  return {
    getUsers,
    getBooks,
    getHouses,
    getCharacters,
    getCharacterPictures,
  };
};
