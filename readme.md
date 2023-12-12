## correr

node index.js

## Modulos necesarios

npm i soap

## Como obtener la clave y el certificado del pfx
(lo que me costó esto)

El algoritmo de cifrado del archivo pfx (RC2-40-CBC) no es compatible con la biblioteca criptográfica del openssl, ya que es un algoritmo inseguro discontinuado. Para poder obtener la clave y el certificado, hace falta poner -legacy en el comando.

### Contraseña

La contraseña del archivo pfx, para desencriptarlo es Yak2023. Cada vez que se hagan las operaciones para obtener la clave.key y el certificado.pem se te pedirá esta contraseña

### Clave.key

openssl pkcs12 -in YAK_SA.pfx -legacy -nocerts -out clave.key

Cuando haces esto te pide que asigenes una nueva PEM pass phrase, que sería una nueva contraseña para usar despues. Y asigne "nuevacontra"
(nueva contraseña = nuevacontra)

### Certificado.pem

openssl pkcs12 -in YAK_SA.pfx -legacy -clcerts -nokeys -out certificado.pem

