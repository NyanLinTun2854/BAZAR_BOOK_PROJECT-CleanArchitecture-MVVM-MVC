// // features/Home/Home.service.ts (Model Layer)

// export const fetchHomeData = async (): Promise<HomeData> => {
//   const response = await api.get('/home');

//   // --- 💡 BEST PLACE FOR DATA TRANSFORMATION ---
//   const rawData = response.data;

//   // Ensure data conforms to the expected HomeData interface:
//   const transformedData: HomeData = {
//     // Assume API sends 'top_sellers', but we want 'topSellers'
//     topSellers: rawData.top_sellers.map((item: any) => ({
//       id: item.id,
//       title: item.name, // Transform 'name' to 'title'
//       author: item.author_name,
//       rating: item.rating,
//     })),
//     recommended: rawData.recommended,
//     newReleases: rawData.new_releases,
//   };

//   return transformedData;
// };

// // ... error handling remains within the try/catch or promise chain (handled by React Query)
