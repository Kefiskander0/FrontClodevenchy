// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from "firebase/app";

export const environment = {
    production: false,
    firebase : {
        apiKey: "AIzaSyDeQ_t8cGV3V7n7TCqud43A7UTO8ite_RQ",
        authDomain: "frontclodevenchy.firebaseapp.com",
        projectId: "frontclodevenchy",
        storageBucket: "frontclodevenchy.appspot.com",
        messagingSenderId: "61612369916",
        appId: "1:61612369916:web:3c8a47ff86db7309a2f479"
    }
};

  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.