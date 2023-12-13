from revChatGPT.V3 import Chatbot

class CustomChatbot:
    def __init__(self, api_key):
        self.chatbot = Chatbot(api_key)

    def get_answer(self, question):
        answer = ""
        for data in self.chatbot.ask_stream(question):
            answer += data
        return answer


# Usage example
if __name__ == "__main__":
    api_key = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJkaWZmdWRsZUBvdXRsb29rLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlfSwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS9hdXRoIjp7InVzZXJfaWQiOiJ1c2VyLWhHdmRaNWJOWmFSQ1RXR0NadGQ4amx1aiJ9LCJpc3MiOiJodHRwczovL2F1dGgwLm9wZW5haS5jb20vIiwic3ViIjoiYXV0aDB8NjRlYjQyMDNmNGI4NmRlMjRlYjIzMjlhIiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY5MzE0MTE4OCwiZXhwIjoxNjk0MzUwNzg4LCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9yZ2FuaXphdGlvbi53cml0ZSBvZmZsaW5lX2FjY2VzcyJ9.tlJEIwKIp-WOmpBZYt_fv9GEr3xy3_JjW0b3C7HqktXfOb-zqrraZfkMy6yJXy-gwG5CqCuVbpgO09iUk9Rkidg-ASbp5K72_fB7xGMwMUAos_pI2_LuObgvO14rdjPe8tVo7KNPmGueEWNkDMXM5SyhxQHLL-OtwiNn_CzELxalNMrMf4TPNVIxaAgFkoyhTmI-8q4Y02As4JB3pq9jfmTmLKkU1FoYN5kd67qnmkZCCuNjjrCSa-hJaW4zy7h35Z2AkNiVpe0ArPXca155MQK3MwXg7zTTJmrKerK7SMwjMOPON2zAHNUlaDoT0ASTpIVG9AEdG_KIJECquCRLXA"
    chatbot_instance = CustomChatbot(api_key)
    question = "kya kar rahe ho?"
    print(chatbot_instance.get_answer(question))


## 27k-40k max chars