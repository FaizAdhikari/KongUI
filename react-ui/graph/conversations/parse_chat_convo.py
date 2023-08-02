import json

LLMChat = "openai"

# Load the JSON file
with open(f'{LLMChat}_convo_nodes.json') as file:
    data = json.load(file)

# Extract user/assistant messages
messages = []
for node_id, node_data in data['mapping'].items():
    if 'message' in node_data:
        message = node_data['message']
        if 'author' in message and 'content' in message:
            author = message['author']['role']
            content = message['content']['parts'][0].strip()
            if author in ['user', 'assistant'] and content:
                messages.append({'author': author, 'content': content})

# Save the extracted messages to a new JSON file
output_data = {'messages': messages}
for messages in output_data['messages']:
    print(messages)

with open(f'{LLMChat}_extracted_messages.js', 'w') as outfile:
    outfile.write("const convo_messages = " + json.dumps(output_data, indent=4))
