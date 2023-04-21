import { google } from 'googleapis'

async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, walletAddress, hasNft, date } = req.body

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
        private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY.replace(
          /\\n/g,
          '\n'
        ),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    })

    const sheets = google.sheets({
      auth,
      version: 'v4',
    })

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID,
      range: 'Feuille 1!A2:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[username, walletAddress, hasNft, date]],
      },
    })

    res.status(201).json({ message: 'It works!', response })
  }
  // res.status(200).json({ message: 'Hey!' })
}

export default handler
