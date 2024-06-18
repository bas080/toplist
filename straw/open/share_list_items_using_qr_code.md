# Share List Items Using QR Code

## As a user

I want to generate a QR code for my top list
So that I can easily share it with others without using a URL.

## Acceptance Criteria

1. **Generate QR Code**
   - When a user clicks the "Share via QR Code" button, a QR code representing the current top list URL is generated and displayed.
   - The QR code accurately encodes the URL containing the data of the current top list.

2. **Display QR Code**
   - The generated QR code is displayed prominently on the screen.
   - There is an option to download the QR code image for offline sharing.

3. **Scan QR Code**
   - When another user scans the QR code with a QR code reader, they are redirected to the URL encoded in the QR code.
   - Upon opening the URL, the user is prompted with a preview mode showing the shared list items.

4. **Preview Mode**
   - In preview mode, the user can view the list items from the shared top list.
   - The user is given options to select specific items or add all items to their own top list.

5. **Add Items from Preview Mode**
   - The user can choose to add selected items to their top list directly from the preview mode.
   - The items are added to the user's top list and persisted in their browser's `localStorage`.

## Tasks

1. **Backend/Functionality**
   - Implement a function to generate a QR code from the top list URL.
   - Ensure the generated QR code accurately represents the top list URL and data.

2. **Frontend/UI**
   - Add a "Share via QR Code" button in the user interface.
   - Create a modal or section to display the generated QR code.
   - Add a download button for the QR code image.
   - Use the preview mode for viewing shared list items.

3. **Testing**
   - Verify the QR code generation and ensure it encodes the correct URL.
   - Test scanning the QR code with different devices and QR code readers.
   - Ensure that scanning the QR code leads to the correct list preview mode.
   - Test the selection and addition of items from the preview mode to the user's top list and verify that they are persisted in `localStorage`.
