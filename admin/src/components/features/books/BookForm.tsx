export default function BookForm() {
  return <div>BookForm</div>;
}

// // src/components/forms/BookForm.tsx (Client Component)

// import { useBookForm } from '@/hooks/useBookForm';
// import { useRouter } from 'next/navigation'; // For redirection

// interface BookFormProps {
//   book: Book; // Passed from the page.tsx Server Component
// }

// const BookForm = ({ book }: BookFormProps) => {
//   const router = useRouter();

//   const handleSuccess = (savedBook: Book) => {
//     // 1. Show Success Toast
//     console.log(`Successfully saved book: ${savedBook.title}`);

//     // 2. Redirect to the detail page (no ?mode=edit)
//     router.push(`/admin/books/${savedBook.id}`);
//   };

//   const { formData, setFormData, handleSubmit, isSubmitting, error } = useBookForm({
//     initialData: book,
//     bookId: book.id, // Pass ID for update mode
//     onSuccessCallback: handleSuccess,
//   });

//   return (
//     <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
//       {/* Input fields */}
//       <input
//         type="text"
//         value={formData.title}
//         onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
//         disabled={isSubmitting}
//       />

//       {/* Status messages */}
//       {error && <div className="error-message">{error.message}</div>}

//       <button type="submit" disabled={isSubmitting}>
//         {isSubmitting ? 'Saving...' : 'Save Changes'}
//       </button>
//     </form>
//   );
// };
