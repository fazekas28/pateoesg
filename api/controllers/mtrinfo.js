import db from "../dbConnect.js";

export const storeMtrInfo = async (req, res) => {
  const {
    origem, uf, sistemaMtr, cnpj_loja, volume, unidade,
    cod_ibama, mtr, tipo_tratamento, data, destinador, selectedOption,
    cnpj_destinador, nNF, cNf, cdf, transportador, cnpj_transportador
  } = req.body;

  let volumeFixed = volume;
  volumeFixed = Math.floor(volumeFixed * 100) / 100;


  const googleSheets = await db();
  const spreadsheetId = "1drKHdk7GW8R24Dv-SlvDbupRuk2nZ-OfxAJfQAWaR94";

  if (!data) {
    return res.status(500).json({ msg: "A data é obrigatória!!" })
  }
  if (!mtr) {
    return res.status(500).json({ msg: "O número da MTR é obrigatória!!" })
  }
  if (!cdf) {
    return res.status(500).json({ msg: "O número do CDF é obrigatória!!" })
  }
  if (!volume) {
    return res.status(500).json({ msg: "O volume coletado é obrigatória!!" })
  }
  if (volume > 2) {
    return res.status(500).json({ msg: "Volume coletado maior que o valor máximo!!" })
  }
  if (!nNF) {
    return res.status(500).json({ msg: "O número da NF é obrigatória!!" })
  }
  if (!cNf) {
    return res.status(500).json({ msg: "A chave da NF é obrigatória!!" })
  }
  if (!selectedOption) {
    return res.status(500).json({ msg: "O tipo de resíduo é obrigatória!!" })
  }

  try {

    await googleSheets.spreadsheets.values.append({
      spreadsheetId,
      range: "MTR!A:R",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[data, selectedOption, mtr, origem, volumeFixed, uf, sistemaMtr, cnpj_loja, unidade, cod_ibama, tipo_tratamento,
          destinador, cnpj_destinador, nNF, cNf, cdf, transportador, cnpj_transportador]],
      },
    });
    return res.status(200).json({ msg: 'Informações enviadas com sucesso!!' })

  } catch (error) {
    return res.status(500).json({ msg: "ocorreu algum erro ao enviar as informações!!" })
  }

}