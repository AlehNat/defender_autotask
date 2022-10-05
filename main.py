import requests
from pycognito import Cognito
from dotenv import dotenv_values

POOL_ID = 'us-west-2_94f3puJWv'
CLIENT_ID = '40e58hbc7pktmnp9i26hh5nsav'

AUTOTASKID = '66dc5209-e610-4046-ac32-d98f23017b91'
TASK_URL = f"https://defender-api.openzeppelin.com/autotask/autotasks/{AUTOTASKID}/runs/manual"

TOKEN_URI = 'ipfs://QmWx14c4atiitXAEZvMgCmiBLVFqE6PvBCuDeSSTLpyeUv'
RECIPIENT = ''  # add recipient address

if __name__ == '__main__':
    config = dotenv_values(".env")
    u = Cognito(POOL_ID, CLIENT_ID, username=config['API_KEY'])
    u.authenticate(password=config['API_SECRET'])

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "X-Api-Key": config['API_KEY'],
        "Authorization": f"Bearer {u.access_token}",
    }
    response = requests.post(TASK_URL, headers=headers, json={'tokenURI': TOKEN_URI, 'to': RECIPIENT})
    print("Status Code", response.status_code)
    print("JSON Response ", response.json())
