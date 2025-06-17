This my expo base app.
Here given some screenshots on how its look in mobile screen.
I also use fakestoreapi.com for this project.
this is the project demo:
(only use the given
{
  "username": "johnd",
  "password": "m38rmF$"
} because it uses fakestoreapi.com as api.
)


https://expojit-app.netlify.app/

It has 4 Assignments:

1)Assignment 1:User Authentication Screens 
Total Marks: 20 
Objective: 
• Create Sign Up and Login screens. 
• Implement basic validation (email, password). 
• Design using React Native components. 
• Use dummyjson or fakestoreapi for authentication. 
Requirements: 
• Two separate screens: Sign Up and Login 
• Stack Navigation between them 
• Show error messages for invalid input 
• Successful login should navigate to the home screen 
Authentication and Session Management Guidance: 
• Use access token and refresh token pattern to manage user sessions securely. 
• Store tokens securely in AsyncStorage. 
• Use access token for authenticated API requests. 
• Implement refresh token logic to obtain a new access token when the old one 
expires. 
• Prompt user to re-login only when the refresh token has expired or is invalid. 
Navigation Guard and Security Practices: 
• Once logged in, users should not be able to navigate back to the login or sign-up 
screens using the back button. 
• After logout, users should not be able to return to any authenticated screen using 
the back button. 
• Use navigation reset or conditional stack rendering to protect access to sensitive 
routes. 
• Implement protected routes/screens based on login status. 
Bonus: Store token (if returned by API) in AsyncStorage.

 2)Assignment 2: Stack and Tab Navigation Setup 
Total Marks: 20 
Objective: 
• Set up navigation using React Navigation. 
• Implement nested navigators (Stack inside Tab or vice versa). 
Requirements: 
• Home tab (with products list) 
• Profile tab 
• Cart tab 
• Product detail screen (navigated from Home) 
Bonus: Add a splash screen and onboarding screen.

3)Assignment 3: Product Listing and Detail View 
Total Marks: 20 
Objective: 
• Fetch products from the API. 
• Display them in a scrollable list. 
• Show product details when a product is tapped. 
Requirements: 
• Use FlatList to display products 
• Show image, name, price 
• Detail view includes description, category, etc. 
Bonus: Implement pull-to-refresh and loading indicator.

4)Assignment 4: Cart Management with Context + Reducer 
Total Marks: 20 
Objective: 
• Use React Context and useReducer to manage cart. 
• Add/Remove items from cart 
• Display cart items in a dedicated tab 
Requirements: 
• Global context setup 
• Reducer for add, remove, update quantity 
• Cart screen with total price and list of items 
Bonus: Persist cart in AsyncStorage.

5)Assignment 5: Profile, Wishlist, and Recommendation Section 
Total Marks: 20 
Objective: 
• Design profile screen with static/dynamic user info. 
• Create wishlist feature (add to favorites). 
• Show product recommendations. 
Requirements: 
• Profile screen with editable user details and profile image 
• Wishlist functionality: tap heart icon to add/remove from favorites 
• Favorite items stored in global state 
• Recommendation section with suggested products (based on category or 
popularity) 
Profile Image Upload: 
• Use Expo Image Picker (expo-image-picker) 
• Install: npx expo install expo-image-picker 
• Steps: 
1. Ask for media library permission 
2. Use ImagePicker.launchImageLibraryAsync() to select image 
3. Store selected image URI in state or Context 
import * as ImagePicker from 'expo-image-picker'; 
const pickImage = async () => { 
const permissionResult = await 
ImagePicker.requestMediaLibraryPermissionsAsync(); 
if (!permissionResult.granted) { 
alert('Permission to access camera roll is required!'); 
return; 
} 
const result = await ImagePicker.launchImageLibraryAsync(); 
if (!result.cancelled) { 
setImageUri(result.uri); 
} 
}; 
Bonus: Add logout and dark mode toggle.

![WhatsApp Image 2025-06-14 at 4 30 09 PM](https://github.com/user-attachments/assets/73bfdfdd-5e11-4daf-b895-c4026e0ae47f)
![WhatsApp Image 2025-06-14 at 4 30 10 PM](https://github.com/user-attachments/assets/b9bf8bf9-5f58-485b-917a-65727db1fea2)
