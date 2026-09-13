Birhan Cash — Complete V4

This version consolidates the existing Sign Up, Log In, and Email Verification flow and fixes the verification screen without overlaying old UI artwork.

- Sign Up email is carried into Verification and shown dynamically.
- Log In identifier is carried into Verification.
- The verification screen uses a cleaned, uniquely named artwork file to prevent stale browser-cache artwork from reappearing.
- Email Address label and the current email are rendered as real HTML text inside the email box.
- Verification timer starts at exactly 05:00 and counts down once per second.
- The timer is rendered as live HTML text at the intended position and uses a smaller font.
- OTP boxes are real empty inputs. No 1,2,3,4,5,6 are baked into the boxes.
- Typed digits appear in the boxes and automatically advance to the next box.
- Backspace and arrow navigation work between OTP boxes.
- A pasted 6-digit code fills the six boxes.
- Resend Code is clickable and resets the timer to 05:00.
- Verify Email is clickable and requires exactly six digits.
- Back is a transparent clickable zone over the artwork's visible Back button, so it is not duplicated.
- Sign Up, Log In, and Verification all use one-step browser-history Back navigation.
- Google/Apple and real authentication remain front-end demo actions; real OAuth/authentication requires a backend.
