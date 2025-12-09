// // features/Home/Home.hook.ts (ViewModel Layer)

// export const useHomeScreenViewModel = () => {
//   const {data, isLoading, isError, error} = useQuery<HomeData>({
//     // ...
//   });

//   // --- 💡 BEST PLACE FOR ERROR PRESENTATION ---
//   const errorMessage = isError
//     ? (error as any).message // Use the message from the rejected promise
//     : null;

//   return {
//     // ... data
//     isError,
//     errorMessage, // Pass to the View
//   };
// };
