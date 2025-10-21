const nodemailer = require("nodemailer");

const enviarCorreo = async(para, asunto, msj, res) => {
  const transporter = nodemailer.createTransport({
    host: 'mail4.correopremium.com',
    port: '465',
    auth: {
      user: "ovargas@fuxiaaccesorios.com",
      pass: "A95l11e01@",
    },
  });

  const mailOptions = {
      from: "ovargas@fuxiaaccesorios.com",
      to: para,
      subject: asunto,
      html: msj,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    
    if (error) {
      res.json('Error al enviar el correo verifica tus datos y/o contactate con recursos humanos')
    } else {
      res.status(201).json('Correo enviado')
    }
  })
  

};

module.exports = { enviarCorreo };