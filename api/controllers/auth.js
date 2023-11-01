import db from "../dbConnect.js";
import jwt from "jsonwebtoken";


export const edituser = async (req, res) => {
  const { nome, email, password, id, selectedOption } = req.body;
  const row = parseInt(id, 10) + 1;
  const googleSheets = await db();
  const spreadsheetId = "1drKHdk7GW8R24Dv-SlvDbupRuk2nZ-OfxAJfQAWaR94";
  if (!nome) {
    return res.status(422).json({ msg: "O nome é obrigatório!" })
  }
  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" })
  }
  if (!password) {
    return res.status(422).json({ msg: "O password é obrigatório!" })
  }
  if (!selectedOption) {
    return res.status(422).json({ msg: "A filial é obrigatório!" })
  }

  const values = [[nome, email, password, selectedOption]];

  await googleSheets.spreadsheets.values.update({
    spreadsheetId,
    range: `Users!B${row}:E`,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: values
    }
  });

  return res.status(200).json({ msg: "Usuário alterado com sucesso!" })



}


export const login = async (req, res) => {
  const { email, password } = req.body;
  const googleSheets = await db();
  const spreadsheetId = "1drKHdk7GW8R24Dv-SlvDbupRuk2nZ-OfxAJfQAWaR94";

  const users = await googleSheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Users!A:G",
  });

  if (!users.data.values) {

    return res.status(500).json({ msg: "Aconteceu algum erro no servidor getuser!" });
  }

  const keys = users.data.values[0];
  const data = users.data.values.slice(1);

  const result = data.map((row) => {
    const rowData = {};
    for (let i = 0; i < keys.length; i++) {
      rowData[keys[i]] = row[i];
    }
    return rowData;
  });

  function checkUser(email, senha, data) {
    const user = data.find((user) => user.EMAIL === email && user.SENHA === senha);
    return user;
  }

  const foundUser = checkUser(email, password, result)

  if (!foundUser) {
    return res.status(404).json({ msg: "Usuário ou senha incorretos!" })
  } else {

    try {
      const refreshToken = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        id: foundUser.SENHA
      },
        process.env.REFRESH_SECRET,
        { algorithm: "HS256" }
      )
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 3600,
        id: foundUser.SENHA
      },
        process.env.TOKEN_SECRET,
        { algorithm: "HS256" }
      )
      res.status(200).json({ msg: "Usuário logado com sucesso!", data: { foundUser, token: { token, refreshToken } } })
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!" })

    }
  }
}