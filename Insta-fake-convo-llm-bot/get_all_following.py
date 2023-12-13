from instagrapi import Client

# Your Instagram credentials
username = 'rip_ballball'
password = 'BLUES4life!!!'

# Loads the session dumped from dump_sessions.py so  that instagram doesn't get suspicious.
#session = client.load_settings("session.json")
#client.set_settings(session)
cl = Client()
cl.login(username, password)

following = cl.user_following(cl.user_id_from_username(username))
for user_id in following:
    print(cl.username_from_user_id(user_id))