from flask_mail import Mail, Message
import secrets
import string


def passWord():
  alphabet = '90+5*1{}3-2&7@4$86'.format(string.ascii_letters)
  password = ''.join(secrets.choice(alphabet) for i in range(16))
  return password


def sendMail(app, name, email):
  
  app.config['MAIL_SERVER']='mail.gmx.es'
  app.config['MAIL_USERNAME'] = 'sudokers@gmx.com'
  app.config['MAIL_PORT'] = 587
  app.config['MAIL_USE_TLS'] = True
  app.config['MAIL_PASSWORD'] = '+45oper@'

  mail= Mail(app)
  
  try:
    
    password = passWord()
    
    msg = Message('Sudokers recovery', sender = 'sudokers@gmx.com', recipients = [email])
    msg.html = '''
    <div>
      <h1>Recuperación de contraseña</h1>
      <hr/>
      <p>Hola {}.</p>
      <p>Esta es tu nueva contraseña: <b>'{}'</b> , puedes modificarla en tu perfil de ajustes.</p>
      <p>Un saludo<br/>El equipo de Sudokers</p>
    </div>  '''.format(name, password)
    mail.send(msg)
    
    return password
  
  except:
    
    return 'failed'
  