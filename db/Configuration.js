import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

function StartFirebase() {
  
    const firebaseConfig = {
      apiKey: "AIzaSyDKjci_JzvoNheaynlIXHOyZ6nOobOe_Y0",
      authDomain: "noble-vortex-351514.firebaseapp.com",
      databaseURL: "https://noble-vortex-351514-default-rtdb.firebaseio.com",
      projectId: "noble-vortex-351514",
      storageBucket: "noble-vortex-351514.appspot.com",
      messagingSenderId: "92911766918",
      appId: "1:92911766918:web:eff16d55d1435477623007"
    };
    
    const app = initializeApp(firebaseConfig);
    return getDatabase(app);
}

export default StartFirebase;