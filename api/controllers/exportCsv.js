import db from "../dbConnect.js";

export const exportCsv = async (req, res) => {
  const { dataInicial, dataFinal } = req.body;

  const startDate = new Date(dataInicial);
  const endDate = new Date(dataFinal);

  const googleSheets = await db();
  const spreadsheetId = "1drKHdk7GW8R24Dv-SlvDbupRuk2nZ-OfxAJfQAWaR94";

  const response = await googleSheets.spreadsheets.values.get({
    spreadsheetId,
    range: `MTR!A:R`,
  });

  const data = response.data.values;

  if (data) {
    const filteredData = data.filter((row) => {
      if (row[0]) {
        const rowDate = new Date(row[0]);
        return rowDate >= startDate && rowDate <= endDate;
      }
      return false;
    });

    const resultData = [data[0], ...filteredData];
    res.status(200).json(resultData);
  } else {
    res.status(200).json([]);
  }
};



