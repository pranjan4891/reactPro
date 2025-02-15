export const generateVoucherCode = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let voucherCode = '';
  for (let i = 0; i < 6; i++) {
    voucherCode += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return voucherCode;
};
