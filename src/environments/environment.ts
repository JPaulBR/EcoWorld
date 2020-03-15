// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig:{
    apiKey: "AIzaSyAtnG1LwnKkiEEIkCcUb_rtTtxpMXPQq1c",
    authDomain: "ecoworld-5502f.firebaseapp.com",
    databaseURL: "https://ecoworld-5502f.firebaseio.com",
    projectId: "ecoworld-5502f",
    storageBucket: "ecoworld-5502f.appspot.com",
    messagingSenderId: "973130310159",
    appId: "1:973130310159:web:9177df8921f7f92b94b97a",
    measurementId: "G-PG4ZWWDNVE"
  }
};

export const snapshotToArray = snapshot =>{
  let returnArray = [];
  snapshot.forEach(element => {
    let item = element.val();
    //item.key = element.key;
    returnArray.push(item);
  });
  return returnArray;
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
