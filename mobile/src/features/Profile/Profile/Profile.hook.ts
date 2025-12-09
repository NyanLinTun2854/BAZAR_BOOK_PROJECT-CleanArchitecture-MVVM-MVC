// // features/Profile/Profile.hook.ts (ViewModel Layer)

// import {useMutation} from '@tanstack/react-query';
// import {updateProfile} from './Profile.service';
// import {ValidationError} from '@types/errors';

// export const useProfileUpdateViewModel = () => {
//   // State to hold field-specific validation errors
//   const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

//   const mutation = useMutation({
//     mutationFn: updateProfile,

//     onSuccess: () => {
//       setFieldErrors({}); // Clear errors on success
//       // ... invalidate profile query, show success toast
//     },

//     onError: (error: Error) => {
//       // 💡 1. Check if the error is our custom ValidationError
//       if (error instanceof ValidationError) {
//         // Set the field-specific errors for UI display
//         setFieldErrors(error.errors);
//       } else {
//         // 💡 2. Handle generic errors (network, 500)
//         setFieldErrors({
//           global: 'An unexpected error occurred. Please try again.',
//         });
//       }
//     },
//   });

//   return {
//     updateProfile: mutation.mutate,
//     isUpdating: mutation.isPending,
//     fieldErrors, // Pass errors to View
//   };
// };
