import "./App.css";
import { useEffect, useState } from "react";
import Bunner from "./components/Bunner/Bunner";
import Header from "./components/Header/Header";
import Rooms from "./components/Rooms/Rooms";
import { fetchRooms } from "./services/api.js";
import initializeLocalStorage from "./services/localStorage";

function App() {
  let [rooms, setRooms] = useState([]);

  {
    /*Salvo in memoria il valore originale delle stanze per non perdermi il valore delle stesse nel metodo showRooms,
       dove poi viene modificato di volta in volta col setRooms
          */
  }
  let [roomsBackup, setRoomsBackup] = useState([]);

  useEffect(() => {
    // Creo un metodo per gestire la promise che mi ritorna il metodo asincrono fetchRooms creato nella folder services
    const getRooms = async () => {
      const roomsFromServer = await fetchRooms();
      // Inserisco nel mio array iniziale vuoto gli oggetti ritornati dalla chiamata api
      setRooms(roomsFromServer);
      setRoomsBackup(roomsFromServer);
    };
    getRooms();
    initializeLocalStorage();
  }, []);

  const calculateAndReturnAvailableRooms = (localRooms) => {
    if (
      localStorage.getItem("fieldAvailableFlagKey") === "true" &&
      localRooms !== undefined
    ) {
      const roomsAvailable = localRooms.filter(({ available }) => available);
      return roomsAvailable;
    }
    return localRooms;
  };

  function showRooms(
    // Prendo i flag dall'evento e setto i rispettivi flag nel local storage
    fieldAvailableFlagValue,
    fieldPrivateRoomFlagValue,
    fieldEntirePropertyFlagValue,
    fieldSharedRoomFlagValue,
    fieldStudioFlagValue
  ) {
    if (fieldAvailableFlagValue !== "undefined") {
      localStorage.setItem("fieldAvailableFlagKey", fieldAvailableFlagValue);
    }
    if (fieldPrivateRoomFlagValue !== "undefined") {
      localStorage.setItem(
        "fieldPrivateRoomFlagKey",
        fieldPrivateRoomFlagValue
      );
    }
    if (fieldEntirePropertyFlagValue !== "undefined") {
      localStorage.setItem(
        "fieldEntirePropertyFlagKey",
        fieldEntirePropertyFlagValue
      );
    }
    if (fieldSharedRoomFlagValue !== "undefined") {
      localStorage.setItem("fieldSharedRoomFlagKey", fieldSharedRoomFlagValue);
    }
    if (fieldStudioFlagValue !== "undefined") {
      localStorage.setItem("fieldStudioFlagKey", fieldStudioFlagValue);
    }

    if (
      // Condizione in cui i flag sono spenti, se le sono mostro le stanze prese dal back-end, quindi setto le rooms con roomsBackup
      !localStorage.getItem("fieldAvailableFlagKey") === "true" &&
      !localStorage.getItem("fieldPrivateRoomFlagKey") === "true" &&
      !localStorage.getItem("fieldEntirePropertyFlagKey") === "true" &&
      !localStorage.getItem("fieldSharedRoomFlagKey") === "true" &&
      !localStorage.getItem("fieldStudioFlagKey") === "true"
    ) {
      setRooms(roomsBackup);
    } else {
      {
        /* Inizio logica dei filtri
           Alla fine di ogni filtro per ogni flag, prendo tutti i sottoinsiemi di stanze create e li aggrego concatenandoli
                */
      }
      rooms = roomsBackup;

      let possiblePrivateRooms = [];
      let possibleEntirePropertyRooms = [];
      let possibleSharedRooms = [];
      let possibleStudioRooms = [];

      let orFilterActivated = false;

      // filtro stanze private
      if (localStorage.getItem("fieldPrivateRoomFlagKey") === "true") {
        possiblePrivateRooms = rooms.filter(
          ({ type }) => type === "Private Room"
        );
        orFilterActivated = true;
      }

      // filtro intere proprietà
      if (localStorage.getItem("fieldEntirePropertyFlagKey") === "true") {
        possibleEntirePropertyRooms = rooms.filter(
          ({ type }) => type === "Entire Property"
        );
        orFilterActivated = true;
      }

      // filtro stanze condivise
      if (localStorage.getItem("fieldSharedRoomFlagKey") === "true") {
        possibleSharedRooms = rooms.filter(
          ({ type }) => type === "Shared Room"
        );
        orFilterActivated = true;
      }

      // filtro studio
      if (localStorage.getItem("fieldStudioFlagKey") === "true") {
        possibleStudioRooms = rooms.filter(({ type }) => type === "Studio");
        orFilterActivated = true;
      }

      // unisco tutti i risultati dei filtri
      let aggregatedRooms = possiblePrivateRooms
        .concat(possibleEntirePropertyRooms)
        .concat(possibleSharedRooms)
        .concat(possibleStudioRooms);

      {
        /*
          Filtro dei disponibili se il flag è acceso
          Se almeno uno dei flag del dropdown è acceso, faccio un ulteriore filtro sui disponibili sull'aggregazione,
          Altrimenti se nessuno dei filtri del menu a tendina è acceso filtro i disponibili sulla variabili che contiene le stanza prese dal back-end 
        */
      }
      if (orFilterActivated) {
        setRooms(calculateAndReturnAvailableRooms(aggregatedRooms));
      } else {
        setRooms(calculateAndReturnAvailableRooms(rooms));
      }
    }
  }

  return (
    <div className="container mt-5 ms-auto">
      <Header
        handleFlagAvailable={(e) => {
          showRooms(
            e.target.checked,
            "undefined",
            "undefined",
            "undefined",
            "undefined"
          );
        }}
        handleFlagPrivateRoom={(e) => {
          showRooms(
            "undefined",
            e.target.checked,
            "undefined",
            "undefined",
            "undefined"
          );
        }}
        handleFlagEntireProperty={(e) => {
          showRooms(
            "undefined",
            "undefined",
            e.target.checked,
            "undefined",
            "undefined"
          );
        }}
        handleFlagSharedRoom={(e) => {
          showRooms(
            "undefined",
            "undefined",
            "undefined",
            e.target.checked,
            "undefined"
          );
        }}
        handleFlagStudio={(e) => {
          showRooms(
            "undefined",
            "undefined",
            "undefined",
            "undefined",
            e.target.checked
          );
        }}
      />
      {rooms.length > 0 ? <Rooms rooms={rooms} /> : <Bunner />}
    </div>
  );
}

export default App;
