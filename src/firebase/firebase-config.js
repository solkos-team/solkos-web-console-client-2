// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs, query, limit } from 'firebase/firestore';


// const firebaseConfig = {
//     apiKey: "AIzaSyBYTHbWcKL5Apx4_l9_eM-LcRZlMXWjl2w",
//     authDomain: "imberalink-238816.firebaseapp.com",
//     databaseURL: "https://imberalink-238816.firebaseio.com",
//     projectId: "imberalink-238816",
//     storageBucket: "imberalink-238816.appspot.com",
//     messagingSenderId: "545989770214",
//     appId: "1:545989770214:web:12d30eb08d463656943427",
//     measurementId: "G-G45N1HGSKP"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app)

// async function getCoolers(db) {
//     const coolers = query(collection(db, 'console-coolers'), limit(1));
//     const coolersSnapshot = await getDocs(coolers);
//     const coolerList = coolersSnapshot.docs.map(doc => doc.data());
//     console.log('Coolers data:', coolerList);
//     return coolerList;
// }
// export { getCoolers, db };


