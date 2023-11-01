import db from "../dbConnect.js";

export const getUserInfo = async (req, res) => {
 const filial = req.body.filial;
 var row1 = '';
 var row2 = '';

 if (!filial) {
  return res.status(404).json({ msg: "filial não encontrada" });
 }

 else if (filial === "PATEO ILHA DO RETIRO") {
  row1 = 2;
  row2 = 3;
 }
 else if (filial === "PATEO OLINDA") {
  row1 = 4;
  row2 = 5;
 }
 else if (filial === "PATEO JABOATÃO") {
  row1 = 6;
  row2 = 7;
 }
 else if (filial === "PATEO JOÃO PESSOA") {
  row1 = 8;
  row2 = 9;
 }
 else if (filial === "PATEO SÃO LUIZ") {
  row1 = 10;
  row2 = 11;
 }
 else if (filial === "PATEO BEQUIMÃO") {
  row1 = 12;
  row2 = 13;
 }
 else if (filial === "PATEO FEIRA DE SANTANA") {
  row1 = 14;
  row2 = 15;
 }
 else if (filial === "PATEO RETIRO") {
  row1 = 16;
  row2 = 17;
 }
 else if (filial === "PATEO MANAUS") {
  row1 = 18;
  row2 = 19;
 }
 else {
  return res.status(404).json({ msg: 'Filial não encontrada!!!' })
 }


 const googleSheets = await db();
 const spreadsheetId = "1drKHdk7GW8R24Dv-SlvDbupRuk2nZ-OfxAJfQAWaR94";

 const getFilialInfo = await googleSheets.spreadsheets.values.get({
  spreadsheetId,
  range: `INFO!A${row1}:J${row2}`,
 });

 if (!getFilialInfo.data.values) {

  return res.status(500).json({ msg: "Aconteceu algum erro no servidor getuser!" });
 }

 const keys = ['FILIAL', 'TRANSPORTADOR', 'CNPJ_TRANS', 'DESTINADOR_FINAL', 'CNPJ_FINAL', 'COD_IBAMA', 'TRATAMENTO', 'UNIDADE', 'UF', 'CNPJ_FILIAL']
 const data = getFilialInfo.data.values.slice();

 const result = data.map((row) => {
  const rowData = {};
  for (let i = 0; i < keys.length; i++) {
   rowData[keys[i]] = row[i];
  }
  return rowData;

 });

 res.status(200).json({ userInfo: result })


}
