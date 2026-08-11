from generate_keys import generate_keys


def show_keys():
    private_key, public_key = generate_keys()

    return f"""
    <div class="show-keys-container">
        <h3>You must save your keys somewhere safe!</h3> 
        <p><strong>Public key: </strong>{public_key}</p> 
        <p><strong>Private key: </strong>{private_key}</p>
        <p style="color:#FF0000;"><i>DO NOT share your private key with anyone.</i></p>
    </div>  
    """.encode("utf-8")
