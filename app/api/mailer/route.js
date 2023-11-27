import nodemailer from 'nodemailer'

export async function POST(req) {
  const body = await req.json()

  if (
    !process.env.SENDER_EMAIL ||
    !process.env.SENDER_PASSWORD ||
    !process.env.MAIN_EMAIL
  ) {
    return new Response('500', {
      status: 500,
    })
  }

  const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  })

  const mailOptions = {
    from: `FindServices Mailer <` + process.env.SENDER_EMAIL + `>`,
    to: process.env.MAIN_EMAIL,
    subject: `[UniswapHooks] - New Hook Submission: ${body.title}`,
    text: `
      -- New Hook Submission > FindServices
  
      - Title: ${body.title}
      - Description: ${body.description}
  
      - Creator: ${body.creator}
  
      - Website: ${body.website}
      - Github Repository: ${body.github}
  
      - Status: Pending...
  
      This is an automated message. Please do not reply to this email.`,
    html: `
      <p>-- New Hook Submission &gt; FindServices</p>
  
      <ul>
        <li>Title: ${body.title}</li>
        <li>Description: ${body.description}</li>
        <li>Creator: ${body.creator}</li>
        <li>Website: <a href="${body.website}" target="_blank">${body.website}</a></li>
        <li>Github Repository: <a href="${body.github}" target="_blank">${body.github}</a></li>
        <li>Status: Pending...</li>
      </ul>
  
      <p>This is an automated message. Please do not reply to this email. Go to <a href="https://uniswaphooks-hffkt195g-findmalek.vercel.app/dashboard" target="_blank">Dashboard</a> to manage your hooks.</p>
    `,
  }

  try {
    await mailTransporter.sendMail(mailOptions)
    return new Response('200')
  } catch (error) {
    return new Response('500')
  }
}
