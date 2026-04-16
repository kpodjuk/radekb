import sys
from playwright.sync_api import sync_playwright
import os

def test_navbar_scroll():
    """
    Verifies that the navbar toggles the 'scrolled' class correctly.
    This test uses Playwright to simulate a browser environment,
    injecting script.js into the DOM to test the scroll behavior.
    """
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        try:
            # Read index.html and script.js
            with open("index.html", "r") as f:
                html_content = f.read()
            with open("script.js", "r") as f:
                js_content = f.read()

            # Inject script.js directly into the HTML to avoid loading external files
            # which can be problematic in some CI environments or when using set_content.
            injected_html = html_content.replace(
                '<script src="script.js"></script>',
                f'<script>{js_content}</script>'
            )

            # Use set_content to load the page with the injected script
            page.set_content(injected_html)

            navbar = page.locator("#navbar")

            # 1. Initial state (scrolled 0px)
            print("Checking initial state...")
            classes = navbar.get_attribute("class") or ""
            assert "scrolled" not in classes.split(), "Navbar should not have 'scrolled' class initially"

            # 2. Scroll down past the 60px threshold
            print("Scrolling down to 100px...")
            page.evaluate("window.scrollTo(0, 100)")
            # Trigger scroll event manually just in case, though scrollTo should trigger it
            page.evaluate("window.dispatchEvent(new Event('scroll'))")
            # Small wait for the handler to execute
            page.wait_for_timeout(200)

            classes = navbar.get_attribute("class") or ""
            assert "scrolled" in classes.split(), f"Navbar should have 'scrolled' class at 100px scroll. Classes: {classes}"

            # 3. Scroll back up below the threshold
            print("Scrolling back up to 0px...")
            page.evaluate("window.scrollTo(0, 0)")
            page.evaluate("window.dispatchEvent(new Event('scroll'))")
            page.wait_for_timeout(200)

            classes = navbar.get_attribute("class") or ""
            assert "scrolled" not in classes.split(), "Navbar should not have 'scrolled' class after scrolling back to top"

            print("Successfully verified navbar scroll behavior!")

        except AssertionError as e:
            print(f"Test failed: {e}")
            sys.exit(1)
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
            sys.exit(1)
        finally:
            browser.close()

if __name__ == "__main__":
    test_navbar_scroll()
