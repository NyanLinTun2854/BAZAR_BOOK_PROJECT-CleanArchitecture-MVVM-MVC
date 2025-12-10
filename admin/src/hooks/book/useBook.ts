// // src/hooks/useBookForm.ts

// import { useState } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query"; // Import necessary tools
// import { apiSaveBook } from "@/lib/data/bookService";
// import { Book, BookInput } from "@/types/book";

// // Define props for the hook
// interface UseBookFormProps {
//   initialData: BookInput;
//   bookId?: string; // Optional ID if in Update mode
//   onSuccessCallback: (savedBook: Book) => void;
// }

// export const useBookForm = ({
//   initialData,
//   bookId,
//   onSuccessCallback,
// }: UseBookFormProps) => {
//   // 1. Local state for form fields
//   const [formData, setFormData] = useState<BookInput>(initialData);

//   const queryClient = useQueryClient();

//   // 2. Use useMutation for the submission logic (Create or Update)
//   const mutation = useMutation({
//     // The mutation function calls the service layer
//     mutationFn: (data: BookInput) => apiSaveBook(data, bookId),

//     // Invalidate queries to refresh lists after a successful mutation
//     onSuccess: (savedBook) => {
//       // 3. Invalidate the Book List Query to show the change immediately
//       queryClient.invalidateQueries({ queryKey: ["books"] });

//       // 4. Invalidate the specific Book Detail Query
//       if (bookId) {
//         queryClient.invalidateQueries({ queryKey: ["book", bookId] });
//       }

//       // Execute the callback for navigation/toast messages in the component
//       onSuccessCallback(savedBook);
//     },

//     // Optional: Global error handling is usually in the service layer, but you can add local logic here
//     onError: (error) => {
//       console.error("Book form submission failed:", error);
//       // You can return a user-friendly error string if needed
//     },
//   });

//   // The simplified submit handler
//   const handleSubmit = () => {
//     mutation.mutate(formData);
//   };

//   return {
//     // Form state
//     formData,
//     setFormData,

//     // Submission handler
//     handleSubmit,

//     // React Query status properties (replaces manual state)
//     isSubmitting: mutation.isPending, // Renamed from isLoading
//     error: mutation.error,
//     isSuccess: mutation.isSuccess,
//   };
// };
