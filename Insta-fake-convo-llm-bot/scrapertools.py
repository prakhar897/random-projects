from instagrapi import Client
import re

# Your Instagram credentials
client_username = 'rip_ballball'
client_password = 'BLUES4life!!!'

# Initialize the client
client = Client()
client.login(client_username, client_password)

# Regular expression pattern to match emails
pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

# Get the list of users you follow
following = client.user_following(client.user_id)

# Iterate over the list of users and retrieve their bio
#count = 0
for user_id in following:
    try:
        user_info = client.user_info(user_id)
        bio = user_info.biography
        print(user_info.username)
        #print(bio)
        
        emails = re.findall(pattern, bio)
        # Print the extracted emails
        for email in emails:
            print(email)
        #count += 1
        #if count > 10:
            #break
        print("--------------------------------")
    except:
        print("Could not extract")