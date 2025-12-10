// // src/lib/data/bookService.ts

// import httpClient from "../api/httpClient";
// import { Book, BookInput } from "@/types/book"; // Assuming you defined these types

// /**
//  * Service function to handle book creation/update logic.
//  * This is where you put your normalization and business validation.
//  */
// export const saveBook = async (
//   data: BookInput,
//   bookId?: string
// ): Promise<Book> => {
//   // 1. Normalization/Pre-processing (e.g., ensuring ISBN is uppercase)
//   const processedData = {
//     ...data,
//     isbn: data.isbn.toUpperCase(),
//   };

//   // 2. Simple Client-side Validation (Complex validation might be in a separate lib)
//   if (!processedData.title || !processedData.isbn) {
//     throw new Error("Title and ISBN are required.");
//   }

//   // 3. API Call
//   if (bookId) {
//     // Update (PUT/PATCH)
//     const response = await httpClient.patch<Book>(
//       `/books/${bookId}`,
//       processedData
//     );
//     return response.data;
//   } else {
//     // Create (POST)
//     const response = await httpClient.post<Book>("/books", processedData);
//     return response.data;
//   }
// };
