from instagrapi import Client
import time
from datetime import datetime, timedelta
from flask_sqlalchemy import SQLAlchemy
import time
from db import PaymentsManager
from gpt import CustomChatbot



# Your Instagram credentials
client_username = 'rip_ballball'
client_password = 'BLUES4life!!!'

# Initialize the client
client = Client()

# Loads the session dumped from dump_sessions.py so  that instagram doesn't get suspicious.
#session = client.load_settings("session.json")
#client.set_settings(session)
client.login(client_username, client_password)

DATABASE_URL = "postgresql://atuclbul:8DQaxv8fGAJ_gmY2a4QmKSfBpHN45KoC@rajje.db.elephantsql.com/atuclbul"
payments_manager = PaymentsManager(DATABASE_URL)

gpt_api_key = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJkaWZmdWRsZUBvdXRsb29rLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlfSwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS9hdXRoIjp7InVzZXJfaWQiOiJ1c2VyLWhHdmRaNWJOWmFSQ1RXR0NadGQ4amx1aiJ9LCJpc3MiOiJodHRwczovL2F1dGgwLm9wZW5haS5jb20vIiwic3ViIjoiYXV0aDB8NjRlYjQyMDNmNGI4NmRlMjRlYjIzMjlhIiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY5MzE0MTE4OCwiZXhwIjoxNjk0MzUwNzg4LCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9yZ2FuaXphdGlvbi53cml0ZSBvZmZsaW5lX2FjY2VzcyJ9.tlJEIwKIp-WOmpBZYt_fv9GEr3xy3_JjW0b3C7HqktXfOb-zqrraZfkMy6yJXy-gwG5CqCuVbpgO09iUk9Rkidg-ASbp5K72_fB7xGMwMUAos_pI2_LuObgvO14rdjPe8tVo7KNPmGueEWNkDMXM5SyhxQHLL-OtwiNn_CzELxalNMrMf4TPNVIxaAgFkoyhTmI-8q4Y02As4JB3pq9jfmTmLKkU1FoYN5kd67qnmkZCCuNjjrCSa-hJaW4zy7h35Z2AkNiVpe0ArPXca155MQK3MwXg7zTTJmrKerK7SMwjMOPON2zAHNUlaDoT0ASTpIVG9AEdG_KIJECquCRLXA"
chatbot_instance = CustomChatbot(gpt_api_key)






def thread_waiting_for_reply(thread):
    # Get the latest message from the thread
    print("Checking if thread is valid...")
    print(thread.users[0].username)
    latest_message = thread.messages[0]

    # Check if the latest message is not sent by the viewer and is within the last 30 minutes
    if (
        latest_message
        and latest_message.is_sent_by_viewer ==  False
    ):
        print("Thread_Is_valid: true")
        return True  # Mark the thread as valid

    print("Thread_Is_valid: false")
    return False  # Latest message is not valid

def user_eligible_for_gpt_session(client_username, sender_username, latest_message_time):
    '''
     User is eligible for GPT session if : 
     - They paid
       - hasn't started a session yet.
          - Change session_start to true and session_start_time to now.
       - or session isn't upto 30 minute mark. 
    '''
    latest_payment = payments_manager.get_latest_payment(client_username, sender_username)
    if latest_payment:
        latest_payment_dict = latest_payment.to_dict() 
        print("This user has made a payment:",latest_payment_dict) 
        if latest_payment_dict["session_start"] == False:
            print("Starting Session for this User") 

            #Update payment start to true and payment start time to now
            current_time = datetime.utcnow()   
            payments_manager.start_session(latest_payment_dict["id"], current_time)
            return True

              
        session_start_time = datetime.fromisoformat(str(latest_payment_dict["session_start_timestamp"]))
        message_time = datetime.fromisoformat(str(latest_message_time))
        time_window = timedelta(minutes=30)

        # Assuming both datetimes are in the same timezone (UTC), make them aware
        session_start_time = session_start_time.replace(tzinfo=None)
        message_time = message_time.replace(tzinfo=None)
        print(session_start_time)
        print(message_time)

        if message_time - session_start_time <= time_window:
            return True
        
    return False
    



def send_solicitation_message(client, recipient_username):
    message_text = '''
Hey, I can talk to you for the next 30 minutes but you gotta pay up first! Send me 10$ here: LINK. 
'''
    recipient_user_id = client.user_id_from_username(str(recipient_username))
    client.direct_send(user_ids=[recipient_user_id],text=message_text)
    return


def create_gpt_bio_prompt():
    return '''
    Respond like you are this person. Make sure your response are max 2-3 lines. I have given the history of conversation below, just try to complete the conversation. Try to make them feel like you are their friend. 
    Reply in English only. Also, don't say "how can I help you" or something similar in any message. 
    Name: Ana De Armas
    Age: 22
    Occupation: Making TikTok
    Hobbies: Dancing, Travelling, Having Fun.
    Description: Just a cute girl trying to live my best life. My favourite places to visit are Aspen and Vienna. 
'''

def create_thread_to_gpt_conversation(thread):
    count = 0
    conversation = ""
    for message in thread.messages:
        if message.text:
            if message.is_sent_by_viewer == False:
                temp = "THEM:" + message.text + "\n"
            else:
                temp = "YOU:" + message.text + "\n"
            conversation = temp + conversation
        count += 1
        if count >= 5:
            break
    return conversation
            


def send_gpt_message(client, thread, recipient_username):
    prompt = create_gpt_bio_prompt()
    prompt += create_thread_to_gpt_conversation(thread)
    print("Final Prompt: /n", prompt)
    response = chatbot_instance.get_answer(prompt)
    print("Received response From GPT:" , response)
    recipient_user_id = client.user_id_from_username(str(recipient_username))
    client.direct_send(user_ids=[recipient_user_id],text=response)


if __name__ == "__main__":
    while True:
        threads = client.direct_threads()  # get all DM threads
        for thread in threads:  
            if thread_waiting_for_reply(thread):
                print("User Waiting for Reply")
                if user_eligible_for_gpt_session(client_username, thread.users[0].username, thread.messages[0].timestamp):
                    print("Inside GPT Message Creation")
                    send_gpt_message(client,thread, thread.users[0].username)
                    
                else:
                    print("Sending Solicitation Message ")
                    send_gpt_message(client,thread, thread.users[0].username)
                    #send_solicitation_message(client,thread.users[0].username)
                    
                
        time.sleep(60)  # wait for a minute before checking again