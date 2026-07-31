export function generateRandomMobileNumber(): string {
  // Indian mobile numbers start with 6, 7, 8, or 9
  const firstDigit = ['6', '7', '8', '9'][Math.floor(Math.random() * 4)];

  let remainingDigits = '';
  for (let i = 0; i < 9; i++) {
    remainingDigits += Math.floor(Math.random() * 10);
  }

  return firstDigit + remainingDigits;
}