import db from "../dbConnect.js";

export const getOleoInfo = async (req, res) => {
 const { month, origem } = req.body;
 const residuo = 'Óleo';
 const googleSheets = await db();
 const spreadsheetId = "1drKHdk7GW8R24Dv-SlvDbupRuk2nZ-OfxAJfQAWaR94";
 const beforeMonth = month - 1;

 if (!month) {
  res.status(500).json({ msg: "ocorreu algum problema com o mês!" })
 }
 if (!origem) {
  res.status(500).json({ msg: "ocorreu algum problema com a Filial!" })
 }


 const getOleoInfo = await googleSheets.spreadsheets.values.get({
  spreadsheetId,
  range: "MTR!A2:E",
 });

 if (!getOleoInfo.data.values) {

  return res.status(500).json({ msg: "Aconteceu algum erro no servidor getuser!" });
 }

 const keys = ['DATA', 'RESIDUO', 'MTR', 'ORIGEM', 'VOLUME']
 const data = getOleoInfo.data.values.slice();

 const result = data.map((row) => {
  const rowData = {};
  for (let i = 0; i < keys.length; i++) {
   rowData[keys[i]] = row[i];
  }
  return rowData;

 });

 const filteredData = result.filter(item => {

  const dateParts = item.DATA.split('-');
  const year = parseInt(dateParts[0], 10);
  const month1 = parseInt(dateParts[1], 10) - 1;
  const day = parseInt(dateParts[2], 10);

  const itemDate = new Date(Date.UTC(year, month1, day));
  let itemMonth = itemDate.getUTCMonth() + 1;
  const itemDay = itemDate.getUTCDate();

  return (
   itemMonth === month &&
   item.ORIGEM === origem &&
   item.RESIDUO === residuo
  );
 });

 const filteredDataBefore = result.filter(item => {

  const dateParts = item.DATA.split('-');
  const year = parseInt(dateParts[0], 10);
  const month1 = parseInt(dateParts[1], 10) - 1;
  const day = parseInt(dateParts[2], 10);

  const itemDate = new Date(Date.UTC(year, month1, day));
  let itemMonth = itemDate.getUTCMonth() + 1;
  const itemDay = itemDate.getUTCDate();

  return (
   itemMonth === beforeMonth &&
   item.ORIGEM === origem &&
   item.RESIDUO === residuo
  );
 });

 let sumVolumeBefore = filteredDataBefore.reduce((total, item) => {
  const volume = parseFloat(item.VOLUME.replace(',', '.'));
  return total + volume;
 }, 0);


 let sumVolume = filteredData.reduce((total, item) => {
  const volume = parseFloat(item.VOLUME.replace(',', '.'));
  return total + volume;
 }, 0);

 //console.log(`Total volume for ${month}/${origem}/${residuo}: ${sumVolume}`);

 return res.status(200).json({
  volume: sumVolume, descartes: filteredData.length,
  volumeBefore: sumVolumeBefore, descartesBefore: filteredDataBefore.length
 })


}





export const getFiltroInfo = async (req, res) => {
 const { month, origem } = req.body;
 const residuo = 'Filtro';
 const googleSheets = await db();
 const spreadsheetId = "1drKHdk7GW8R24Dv-SlvDbupRuk2nZ-OfxAJfQAWaR94";
 const beforeMonth = month - 1;

 const getOleoInfo = await googleSheets.spreadsheets.values.get({
  spreadsheetId,
  range: "MTR!A2:E",
 });

 if (!getOleoInfo.data.values) {

  return res.status(500).json({ msg: "Aconteceu algum erro no servidor getuser!" });
 }

 const keys = ['DATA', 'RESIDUO', 'MTR', 'ORIGEM', 'VOLUME']
 const data = getOleoInfo.data.values.slice();

 const result = data.map((row) => {
  const rowData = {};
  for (let i = 0; i < keys.length; i++) {
   rowData[keys[i]] = row[i];
  }
  return rowData;

 });

 const filteredData = result.filter(item => {

  const dateParts = item.DATA.split('-');
  const year = parseInt(dateParts[0], 10);
  const month1 = parseInt(dateParts[1], 10) - 1;
  const day = parseInt(dateParts[2], 10);

  const itemDate = new Date(Date.UTC(year, month1, day));
  let itemMonth = itemDate.getUTCMonth() + 1;
  const itemDay = itemDate.getUTCDate();

  return (
   itemMonth === month &&
   item.ORIGEM === origem &&
   item.RESIDUO === residuo
  );
 });

 const filteredDataBefore = result.filter(item => {

  const dateParts = item.DATA.split('-');
  const year = parseInt(dateParts[0], 10);
  const month1 = parseInt(dateParts[1], 10) - 1;
  const day = parseInt(dateParts[2], 10);

  const itemDate = new Date(Date.UTC(year, month1, day));
  let itemMonth = itemDate.getUTCMonth() + 1;
  const itemDay = itemDate.getUTCDate();

  return (
   itemMonth === beforeMonth &&
   item.ORIGEM === origem &&
   item.RESIDUO === residuo
  );
 });

 let sumVolumeBefore = filteredDataBefore.reduce((total, item) => {
  const volume = parseFloat(item.VOLUME.replace(',', '.'));
  return total + volume;
 }, 0);


 let sumVolume = filteredData.reduce((total, item) => {
  const volume = parseFloat(item.VOLUME.replace(',', '.'));
  return total + volume;
 }, 0);

 console.log(`Total volume for ${month}/${origem}/${residuo}: ${sumVolume}`);

 return res.status(200).json({
  volume: sumVolume, descartes: filteredData.length,
  volumeBefore: sumVolumeBefore, descartesBefore: filteredDataBefore.length
 })

}