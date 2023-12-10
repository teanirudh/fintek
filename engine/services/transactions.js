const data = [];
const date = new Date();
for (let i = 1; i <= 25; i++) {
  data.push({
    key: i,
    reference:
      String(date.getFullYear()) +
      String(date.getMonth() + 1).padStart(2, "0") +
      String(date.getDate()).padStart(2, "0") +
      String(i).padStart(4, "0"),
    date:
      String(date.getDate()).padStart(2, "0") +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      date.getFullYear(),
    description: "Description " + i,
    amount: i * 100,
    debit: "Debit " + i,
    credit: "Credit " + i,
  });
}

export const getTransactions = () => {
  return data;
};
