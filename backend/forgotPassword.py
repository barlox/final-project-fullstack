import os
from send import SendAPIClient
from send.helpers.mail import Mail
import secrets
import string


# Send a password generated with the passWord function 
# to the recovery email provided through SendAPIClient

def passWord():
	alphabet = '90+5*1{}3-2&7@4$86'.format(string.ascii_letters)
	password = ''.join(secrets.choice(alphabet) for i in range(16))
	return password


def sendMail(name, email):

	try:

		password = passWord()

		content = '''
		<div>
			<h1>Password recovery</h1>
			<hr/>
			<p>Hello {}.</p>
			<p>This is your new password: <b>'{}'</b> , you can change it in your profile settings.</p>
			<p>Greetings<br/>The Sudokers team</p>
		</div>  '''.format(name, password)

		message = Mail(
			from_email='sudokus@gmx.com',
			to_emails=email,
			subject='Sudokers recovery',
			html_content=content)

		sg = SendAPIClient(os.environ.get('SEND_API_KEY'))
		
		sg.send(message)

		return {
      'password': password,
      'result': 'ok'
    }

	except Exception as e:

		return {
      'password': 'failed',
      'result': e
    }
