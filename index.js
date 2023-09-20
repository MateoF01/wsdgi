const fs = require('fs');
const soap = require('soap');


const crearCliente = (url, options) => {
  return new Promise((resolve, reject) => {
    soap.createClient(url, options, (err, client) => {
      if (err) reject(err)
      resolve(client)
    })
  })
}

const guardarResultado = (resultado) =>{
  
  fs.writeFile("resultado.xml", resultado, (err) => {
    if (err) {
      console.error('Error al escribir el archivo XML:', err);
    } else {
      console.log('Archivo XML escrito exitosamente.');
    }
  });
}


const getInfoByRUT = async (ruc) => {

    const url = 'https://serviciosdp.dgi.gub.uy:6491/RUTWSPGetEntidad/servlet/arutpersonagetentidad?wsdl'

    const cliente = await crearCliente(url, {})

    var privateKey = fs.readFileSync("clave.key");
    var publicKey = fs.readFileSync("certificado.pem");
    var password = 'nuevacontra'; 

    var wsSecurity = new soap.WSSecurityCert(privateKey, publicKey, password);
    cliente.setSecurity(wsSecurity);

    console.log(cliente)

    cliente.Execute({Ruc: ruc}, (err, result) => {
      if (err) {
        console.error('Error al llamar a la operación del servicio SOAP', err);
      
        guardarResultado(err.body)
        return 

      }
      console.log('Respuesta del servicio SOAP:', result);
      guardarResultado(result)
    });
      
} 

getInfoByRUT(211208980014)
