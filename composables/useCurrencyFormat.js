


export const useCurrencyFormat = (number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(number);
  };
  