import configData from "../config/config";

// Salvataggio dell'url che prendo dalle properties del config,metodo per la chiamata api di esso e  return dei dati

const URL = configData.SERVER_URL;

export const fetchRooms = async () => {
  const response = await fetch(URL);
  const data = await response.json(URL);

  return data;
};
