import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import secrets
import string


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
			from_email='sudokers@gmx.com',
			to_emails=email,
			subject='Sudokers recovery',
			html_content=content)

		#sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
		#	'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'
		sg = SendGridAPIClient('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')
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
