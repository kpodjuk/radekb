# Studio Figura Warszawa Wola

A responsive, static landing page built with vanilla HTML5, CSS3, and JavaScript.
The project features a custom UI design, mobile-friendly navigation, and smooth scrolling for a modern user experience.


### 🚀 **[👉 SEE LIVE VERSION 👈](https://kpodjuk.github.io/radekb/)**

## Tech Stack
- **HTML5**: Semantic structure.
- **CSS3**: Custom styling, flexbox/grid layouts, and responsive media queries.
- **JavaScript (Vanilla)**: DOM manipulation, interactive mobile menu, and event handling.

## Contact Form Integration

The contact form is powered by **[Web3Forms](https://web3forms.com/)**, allowing the website to remain fully static (no backend required) while delivering submitted forms directly to the administrator's email.

### Setup Instructions

To enable the form, you must generate a free Access Key and update the HTML:

1. Visit [Web3Forms](https://web3forms.com/).
2. Enter your email address to receive a free Access Key.
3. Open the `index.html` file in this repository.
4. Locate the contact form section (around line 626).
5. Replace the placeholder value `"YOUR_WEB3FORMS_ACCESS_KEY_HERE"` with your actual Access Key:
   ```html
   <!-- Replace value with your own key -->
   <input type="hidden" name="access_key" value="YOUR_ACTUAL_ACCESS_KEY_HERE">
   ```
6. Commit and push the changes. The form is now active and submissions will be sent to your email. You can also view submissions in the Web3Forms dashboard.
