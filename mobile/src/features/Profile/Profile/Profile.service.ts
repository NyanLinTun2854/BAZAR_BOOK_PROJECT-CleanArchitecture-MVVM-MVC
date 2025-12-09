// // features/Profile/Profile.service.ts (Model Layer)

// import api from '@services/ApiService';
// import {ValidationError} from '@types/errors'; // Import the custom error

// interface ProfileUpdatePayload {
//   name: string;
//   email: string;
//   // ... other fields
// }

// export const updateProfile = async (
//   payload: ProfileUpdatePayload,
// ): Promise<void> => {
//   try {
//     // 💡 1. Simple client-side validation (Optional, but good practice)
//     if (!payload.name) {
//       // Throw the custom error for immediate client-side validation failure
//       throw new ValidationError('Name is required.', 400, {
//         name: 'Name cannot be empty.',
//       });
//     }

//     // 💡 2. API Call
//     await api.put('/profile', payload);
//   } catch (error: any) {
//     // 💡 3. Handle specific API validation response (e.g., HTTP 422)
//     if (
//       error.response &&
//       (error.response.status === 400 || error.response.status === 422)
//     ) {
//       const apiErrors = error.response.data.errors || error.response.data; // Adjust based on your API

//       // Transform the raw API error into our custom ValidationError
//       throw new ValidationError(
//         'Validation failed. Please check the form.',
//         error.response.status,
//         apiErrors, // The actual field errors from the API
//       );
//     }

//     // 💡 4. Re-throw all other errors (500, Network, etc.)
//     throw error;
//   }
// };
