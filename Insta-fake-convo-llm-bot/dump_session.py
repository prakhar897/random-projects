from instagrapi import Client

# Your Instagram credentials
client_username = 'rip_ballball'
client_password = 'BLUES4life!!!'

# Initialize the client
client = Client()
client.login(client_username, client_password)

client.dump_settings("session.json")